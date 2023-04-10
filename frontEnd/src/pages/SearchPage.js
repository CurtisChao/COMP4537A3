import React from "react";
import axios from "axios";
import Search from "../components/Search";
import Result from "../components/Result";
import styles from "./SearchPage.module.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function SearchPage() {
  const { token } = React.useContext(UserContext);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:6001/api/v1/pokemons",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Refresh ${token}`,
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

  const handleLogout = () => {
    axios.post("http://localhost:6001/logout");
    logout();
  };

  return (
    <>
      {loading ? (
          <p>Loading...</p>
      ) : (
          <div className={styles.container}>
            {localStorage.getItem("role") === "admin" && (
                <button onClick={() => navigate("/report")}>Report</button>
            )}
            <Search
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                setSearchName={setSearchName}
            />
            <div className={styles.pokemonGrid}>
              <Result
                  selectedTypes={selectedTypes}
                  searchName={searchName}
                  allPokemon={allPokemon}
                  loading={loading}
              />
            </div>
            <div className={styles.pagination}>
              {/* Your existing page number and navigation elements */}
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
      )}
    </>
);
}

export default SearchPage;