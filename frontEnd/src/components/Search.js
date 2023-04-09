import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./Search.module.css";

function Search({ selectedTypes, setSelectedTypes, setSearchName }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json"
      );
      setTypes(res.data.map((type) => type.english));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };

  return (
    <>
    <div className={styles.checkbox}>
        {types.map((type) => (
          <div>
            <input
              type="checkbox"
              value={type}
              id={type}
              onChange={handleChange}
            />
            <label htmlFor={type}>{type} </label>
          </div>
        ))}
    </div>
      <input
        type="text"
        placeHolder="Filter Pokemon by name"
        className={styles.searchBar}
      />
    </>
  );
}

export default Search;