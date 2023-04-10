import React, { useEffect, useState } from 'react'
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import UserContext from "./context/UserContext";
import Report from "./pages/Report";

function App() {
  const auth = useAuth();
  const [loggedIn, setLoggedIn] = useState(Boolean(auth.token));

  useEffect(() => {
    setLoggedIn(Boolean(auth.token));
  }, [auth.token]);

  return (

    <UserContext.Provider value={auth}>
      <BrowserRouter>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <SearchPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App