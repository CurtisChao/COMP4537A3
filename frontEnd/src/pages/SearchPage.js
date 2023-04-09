import React from "react";
import axios from "axios";
import Search from "../components/Search";
import Result from "../components/Result";

import { useState, useEffect, useContext } from "react";

function SearchPage() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:6001/api/v1/pokemons",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAllPokemon(response.data);
      } catch (error) {
        console.error("Error fetching all Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  return (
      <>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
              <Search
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  setSearchName={setSearchName}
              />
              <Result
                  selectedTypes={selectedTypes}
                  searchName={searchName}
                  allPokemon={allPokemon}
                  loading={loading}
              />
            </div>
        )}
      </>
  );
}

export default SearchPage;