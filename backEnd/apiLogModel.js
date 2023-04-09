const mongoose = require("mongoose");

const apiLogSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "user",
  },
  endpoint: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ApiLog", apiLogSchema);