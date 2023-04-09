import React from "react";
import { useState } from "react";

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
  };

  return (
    <>
      <div className="pokemon-list">
        <h1>{`Page Number ${currentPage}`}</h1>
        <div>
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