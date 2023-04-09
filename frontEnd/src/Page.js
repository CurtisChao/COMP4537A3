import React from 'react'

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
      <h1>
        Page number {currentPage}
      </h1>
      {
        currentPokemons.map(item => {
          return <div>  {item.name.english} id is {item.id}               
          <img
          src={getUrl(item.id)}
          alt={item.name.english}/>
          </div>
        })
      }
    </div>
  )
}

export default Page