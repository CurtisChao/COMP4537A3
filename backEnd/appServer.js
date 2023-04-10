const mongoose = require("mongoose")
const express = require("express")
const { connectDB } = require("./connectDB.js")
const { populatePokemons } = require("./populatePokemons.js")
const { getTypes } = require("./getTypes.js")
const { handleErr } = require("./errorHandler.js")
const morgan = require("morgan")
const cors = require("cors")
const apiLogModel = require("./apiLogModel.js");

const {
  PokemonBadRequest,
  PokemonBadRequestMissingID,
  PokemonBadRequestMissingAfter,
  PokemonDbError,
  PokemonNotFoundError,
  PokemonDuplicateError,
  PokemonNoSuchRouteError,
  PokemonAuthError
} = require("./errors.js")

const { asyncWrapper } = require("./asyncWrapper.js")

const dotenv = require("dotenv")
dotenv.config();



const app = express()
// const port = 5000
var pokeModel = null;

const start = asyncWrapper(async () => {
  await connectDB({ drop: false });
  const pokeSchema = await getTypes();
  // pokeModel = await populatePokemons(pokeSchema);
  pokeModel = mongoose.model("pokemons", pokeSchema);

  app.listen(process.env.pokeServerPORT, (err) => {
    if (err) throw new PokemonDbError(err);
    else
      console.log(
        `Phew! Server is running on port: ${process.env.pokeServerPORT}`
      );
  });

  const doc = await userModel.findOne({ username: "admin" });
  if (!doc)
    userModel.create({
      username: "admin",
      password: bcrypt.hashSync("admin", 10),
      role: "admin",
      email: "admin@admin.ca",
    });
});
start();
app.use(express.json());
app.use(cors());

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
// const { findOne } = require("./userModel.js")
const userModel = require("./userModel.js");

// app.use(morgan("tiny"))
app.use(morgan(":method"));

const authUser = asyncWrapper(async (req, res, next) => {
  // const token = req.body.appid
  if (!req.header("authorization")) {
    throw new PokemonAuthError("No Token: Please provide a token.");
  }
  const [prefix, token] = req.header("authorization").split(" ");

  if (!token || (prefix != "Bearer" && prefix != "Refresh")) {
    // throw new PokemonAuthError("No Token: Please provide an appid query parameter.")
    throw new PokemonAuthError(
      "No Token: Please provide the token using the headers."
    );
  }
  try {
    let verified;
    if (prefix == "Bearer") {
      verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } else {
      verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }

    //check if the token is marked as invalid in database
    const authedUser = await userModel.findOne({
      username: verified.user.username,
    });

    const isInvalid = authedUser.token_invalid;

    if (isInvalid || !authedUser.token_invalid == undefined) {
      throw new PokemonAuthError("Invalid Token Verification. Log in again.");
    }

    next();
  } catch (err) {
    throw new PokemonAuthError("Invalid Token Verification. Log in again.");
  }
});

const authAdmin = asyncWrapper(async (req, res, next) => {
  const [prefix, token] = req.header("authorization").split(" ");
  let payload;
  if (prefix == "Bearer") {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } else {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  }

  if (payload?.user?.role === "admin") {
    return next();
  }
  throw new PokemonAuthError("Access denied");
});

const logApiUsage = asyncWrapper(async (req, res, next) => {
  const [prefix, token] = req.header("authorization").split(" ");
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await userModel.findOne({ username: payload.user.username });

  const apiLog = new apiLogModel({
    user: user.username,
    endpoint: req.path,
    status: res.statusCode,
  });

  await apiLog.save();

  next();
});

app.post(
  "/register",
  asyncWrapper(async (req, res) => {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userWithHashedPassword = { ...req.body, password: hashedPassword };

    const user = await userModel.create(userWithHashedPassword);
    res.send(user);
  })
);


app.post(
  "/requestNewAccessToken",
  asyncWrapper(async (req, res) => {
    // console.log(req.headers);
    if (!req.header("authorization"))
      throw new PokemonAuthError("No Token: Please provide a token.");
    const [prefix, refreshToken] = req.header("authorization").split(" ");
    if (!refreshToken || prefix != "Refresh") {
      throw new PokemonAuthError("No Token: Please provide a token.");
    }

    //Get all refresh tokens from the database
    const users = await userModel.find({});
    const refreshTokens = users.map((user) => {
      if (!user.token_invalid) {
        return user.token;
      }
    });

    if (!refreshTokens.includes(refreshToken)) {
      // replaced a db access
      console.log("auth", req.header("authorization"));
      console.log("token: ", refreshToken);
      console.log("refreshTokens", refreshTokens);
      throw new PokemonAuthError(
        "Invalid Token: Please provide a valid token."
      );
    }
    try {
      const payload = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const accessToken = jwt.sign(
        { user: payload.user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      res.header(
        "authorization",
        `Bearer ${accessToken} Refresh ${refreshToken}`
      );
      res.send("All good!");
    } catch (error) {
      throw new PokemonAuthError(
        "Invalid Token: Please provide a valid token."
      );
    }
  })
);

// app.use(morgan("tiny"))
app.use(morgan(":method"))

app.use(cors())

app.post(
  "/login",
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    console.log("username: ", username);
    const user = await userModel.findOne({ username });
    console.log("user: ", user);
    if (!user) throw new PokemonAuthError("User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new PokemonAuthError("Password is incorrect");

    const userWithoutToken = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(
      { user: userWithoutToken },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { user: userWithoutToken },
      process.env.REFRESH_TOKEN_SECRET
    );

    await userModel.updateOne(
      { username: user.username },
      { token: refreshToken, token_invalid: false }
    );

    res.header(
      "authorization",
      `Bearer ${accessToken} Refresh ${refreshToken}`
    );

    // res.send("All good!")
    res.send(user);
  })
);

app.use(authUser);
app.use(logApiUsage);

app.use(authUser) // Boom! All routes below this line are protected

app.post(
  "/logout",
  asyncWrapper(async (req, res) => {
    const tokens = req.header("authorization").split(" ");
    const refreshToken = tokens[1];
    const user = await userModel.findOne({ token: refreshToken });
    if (!user) {
      throw new PokemonAuthError("User not found");
    }
    await userModel.updateOne({ token: user.token, token_invalid: true });

    const user1 = await userModel.findOne({ token: refreshToken });
    res.send("Logged out");
  })
);

app.get(
  "/api/v1/pokemons",
  asyncWrapper(async (req, res) => {
    // try {
    const docs = await pokeModel.find({}).sort({ id: 1 });
    res.json(docs);
    // } catch (err) { res.json(handleErr(err)) }
  })
);

app.get("*", (req, res) => {
  res.json({
    msg: "Improper route. Check API docs plz."
  })
  throw new PokemonNoSuchRouteError("");
})

app.use(authAdmin);

app.use(handleErr);


app.get(
  "/api/v1/admin/uniqueUsers",
  asyncWrapper(async (req, res) => {
    // const { start, end } = req.query;
    const allLogs = await apiLogModel.find({});
    const uniqueUsers = [...new Set(allLogs.map((log) => log.user))];
    res.json(uniqueUsers);
  })
);

app.get(
  "/api/v1/admin/topUsers",
  asyncWrapper(async (req, res) => {
    // const { start, end } = req.query;
    const topUsers = await apiLogModel
      .aggregate([
        // {
        //   $match: { timestamp: { $gte: new Date(start), $lte: new Date(end) } },
        // },
        { $group: { _id: "$user", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .limit(5);
    res.json(topUsers);
  })
);

app.get(
  "/api/v1/admin/topUsersPerEndpoint",
  asyncWrapper(async (req, res) => {
    const topUsersPerEndpoint = await apiLogModel.aggregate([
      {
        $group: {
          _id: { user: "$user", endpoint: "$endpoint" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(topUsersPerEndpoint);
  })
);


app.get(
  "/api/v1/admin/errorsByEndpoint",
  asyncWrapper(async (req, res) => {
    const errorsByEndpoint = await apiLogModel.aggregate([
      { $match: { status: { $gte: 400, $lt: 500 } } },
      { $group: { _id: "$endpoint", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(errorsByEndpoint);
  })
);


app.get(
  "/api/v1/admin/recentErrors",
  asyncWrapper(async (req, res) => {
    const recentErrors = await apiLogModel
      .find({
        status: { $gte: 400 },
      })
      // .populate("user", "username")
      .sort({ timestamp: -1 })
      .limit(10);
    console.log("recentErrors: ", recentErrors);
    res.json(recentErrors);
  })
);

app.use(handleErr)
module.exports = app;