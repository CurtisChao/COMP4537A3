import React from "react";
import styles from "./Popup.module.css";

function Popup({ info, onClose }) {

  const typeColors = {
    Normal: "#A8A77A",
    Fire: "#EE8130",
    Water: "#6390F0",
    Electric: "#F7D02C",
    Grass: "#7AC74C",
    Ice: "#96D9D6",
    Fighting: "#C22E28",
    Poison: "#A33EA1",
    Ground: "#E2BF65",
    Flying: "#A98FF3",
    Psychic: "#F95587",
    Bug: "#A6B91A",
    Rock: "#B6A136",
    Ghost: "#735797",
    Dragon: "#6F35FC",
    Dark: "#705746",
    Steel: "#B7B7CE",
    Fairy: "#D685AD",
  };
  const getBackgroundColor = (types) => {
    if (types.length === 1) {
      return typeColors[types[0]];
    } else {
      return `linear-gradient(to right, ${typeColors[types[0]]} 0%, ${typeColors[types[1]]} 100%)`;
    }
  };

  const handleClickOutside = (event) => {
    onClose();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  return (
      <div className={styles.popup} onClick={handleClickOutside}>
        <div
            className={styles.popup_content}
            onClick={handleClickInside}
            style={{ background: getBackgroundColor(info.type) }}
        >
          <h2>Pokédex Entry: {info.id}</h2>
          <img src={info.url} alt={info.name.english} />
          <p>{`Name: ${info.name.english}`}</p>
          <p>{`Type: ${info.type.join(", ")}`}</p>
          <p>{`HP: ${info.base.HP}`}</p>
          <p>{`Attack: ${info.base.Attack}`}</p>
          <p>{`Defense: ${info.base.Defense}`}</p>
          <p>{`Special Attack: ${info.base["Sp. Attack"]}`}</p>
          <p>{`Special Defense: ${info.base["Sp. Defense"]}`}</p>
          <p>{`Speed: ${info.base.Speed}`}</p>

          <button onClick={onClose}>X</button>
        </div>
      </div>
  );
}

export default Popup;
