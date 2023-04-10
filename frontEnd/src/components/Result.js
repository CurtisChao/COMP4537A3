import React from "react";
import Pagination from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";
import Page from "./Page";
import styles from "./Result.module.css";

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
  
        if (searchName !== "") {
          let regex_name = "\\w*";
          for (let c of searchName) {
            if (c === "_") regex_name = regex_name.concat("\\w");
            else regex_name = regex_name.concat(c);
            console.log(regex_name);
            regex_name = regex_name.concat("\\w*");
          }
          const regex = new RegExp(regex_name, "i");
          const possibilities = data.filter(({ name }) =>
            regex.test(name.english)
          );
          setPokemons(possibilities);
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
      <Page
        selectedTypes={selectedTypes}
        currentPokemons={currentPokemons}
        currentPage={currentPage}
      />
      <div    
        style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
        width: "94%",
        boxSizing: "border-box",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "40px",
        backgroundColor: "coral"
        }}>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className={styles.pagination}
      />
      </div>
    </>
  );
}

export default Result;