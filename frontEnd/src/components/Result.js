import React from "react";
import Pagination from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";
import Page from "./Page";


function Result({ selectedTypes, searchName, allPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      let data = allPokemon;
      if (selectedTypes.length !== 0) {
        data = data.filter((pokemon) =>
          selectedTypes.every((type) => pokemon.type.includes(type))
        );
        setPokemons(data);
      }

      if (selectedTypes.length === 0 && searchName === "") {
        setPokemons(data);
      }

      setCurrentPage(1);
    }
    fetchData();
  }, [selectedTypes, searchName]);

  const lastPokeIndex = currentPage * pokemonsPerPage;
  const firstPokeIndex = lastPokeIndex - pokemonsPerPage;
  const currentPokemons = pokemons.slice(firstPokeIndex, lastPokeIndex);
  const numberOfPages = Math.ceil(pokemons.length / pokemonsPerPage);

  return (
    <>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Result;