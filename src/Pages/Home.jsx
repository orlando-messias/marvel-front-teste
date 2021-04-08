// react
import React, { useEffect, useState } from 'react';
// components
import Topbar from '../Components/Topbar/Topbar';
import CharacterCard from '../Components/CharacterCard/CharacterCard';
// services
import api from '../services/marvelApi';
// styles
import './HomeStyles.css';
import SearchBar from '../Components/SearchBar/SearchBar';


export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState('');

  useEffect(() => {
    api.get('/')
      .then(response => setCharacters(response.data.data.results));
  }, []);

  return (
    <div>
      <Topbar />
      <SearchBar setCharacter={setCharacter} />
      <div className="pageContainer">
        <h2>Marvel Characters</h2>
        {!character &&
          <div className="cardContainer">
            {characters.map((character, index) => (
              <CharacterCard
                key={index}
                name={character.name}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              />
            ))}
          </div>
        }
        {character && character.name}
      </div>
    </div>
  )
};