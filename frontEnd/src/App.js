import React, { useEffect, useState } from 'react'
import Page from './Page'
import Pagination from './Pagination';
import axios from 'axios'
import SearchPage from "./pages/SearchPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [pokemons, setPokemons] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(res => res.data)
      .then(res => {
        setPokemons(res)
      })
      .catch(err => console.log("err", err))
  }, [])

  const indexOfLastRecord = currentPage * pokemonsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstRecord, indexOfLastRecord)
  const numberOfPages = Math.ceil(pokemons.length / pokemonsPerPage);

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
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App