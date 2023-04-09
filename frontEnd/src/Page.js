import React from 'react'
import styles from "./Page.module.css";

function Page({ currentPokemons, currentPage }) {

const getUrl = (id) => {
    if (id < 10)
        return `https://github.com/fanzeyi/pokemon.json/raw/master/images/00${id}.png`;
    if (id < 100)
        return `https://github.com/fanzeyi/pokemon.json/raw/master/images/0${id}.png`;
    return `https://github.com/fanzeyi/pokemon.json/raw/master/images/${id}.png`;
    };

  return (
    <div>
      {
        // currentPokemons.map(item => {
        //   return <div>  {item.name.english} id is {item.id}               
        //   <img
        //   src={getUrl(item.id)}
        //   alt={item.name.english}/>
        //   </div>
        // })
        <div className="pokemon-list" style={{paddingLeft:20, paddingRight:20}}>
        <h1>{`Page Number ${currentPage}`}</h1>
        <div className={styles.pokemonList}>
          {currentPokemons.map((item) => {
            // if (selectedTypes.every((type) => item.type.includes(type)))
            //   item.url = getUrl(item.id);
            return (
              <img
                src={getUrl(item.id)}
                alt={item.name.english}
              />
            );
          })}
        </div>
      </div>
      }
    </div>
  )
}

export default Page