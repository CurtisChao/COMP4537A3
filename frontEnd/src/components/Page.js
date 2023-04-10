import React from "react";
import { useState } from "react";
import Popup from "./Popup";

import styles from "./Page.module.css";

function Page({ currentPokemons, selectedTypes, currentPage }) {
  const [popupInfo, setPopupInfo] = useState({ visible: false, content: {} });

  const getUrl = (id) => {
    if (id < 10)
      return `https://github.com/fanzeyi/pokemon.json/raw/master/images/00${id}.png`;
    if (id < 100)
      return `https://github.com/fanzeyi/pokemon.json/raw/master/images/0${id}.png`;
    return `https://github.com/fanzeyi/pokemon.json/raw/master/images/${id}.png`;
  };

  const handleImageClick = (imageInfo) => {
    setPopupInfo({ visible: true, content: imageInfo });
  };

  return (
    <>
      {popupInfo.visible && (
        <Popup
          info={popupInfo.content}
          onClose={() => setPopupInfo({ visible: false, content: {} })}
        />
      )}
      <div className="pokemon-list">
        <h1 style={{paddingLeft:550, color: "black", fontSize:60}}>{`Page Number ${currentPage}`}</h1>
        <div className={styles.pokemonList}>
          {currentPokemons.map((item) => {
            if (selectedTypes.every((type) => item.type.includes(type)))
              item.url = getUrl(item.id);
            return (
              <img
                src={getUrl(item.id)}
                alt={item.name.english}
                onClick={() => handleImageClick(item)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;