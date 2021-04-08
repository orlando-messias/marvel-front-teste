// react
import React, { useEffect, useState } from 'react';
// components
import Topbar from '../Components/Topbar/Topbar';
import CharacterCard from '../Components/CharacterCard/CharacterCard';
// services
import api from '../services/marvelApi';
// styles
import './HomeStyles.css';


export default function Home() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    api.get('/')
      .then(response => setCharacters(response.data.data.results));
  }, []);

  return (
    <div>
      <Topbar />
      <div className="pageContainer">
        <h2>Hello World</h2>
        <div className="cardContainer">
          {characters.map((character, index) => (
            <CharacterCard
              key={index}
              name={character.name}
              image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
};