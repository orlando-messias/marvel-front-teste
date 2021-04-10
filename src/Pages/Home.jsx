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
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    api().get('/')
      .then(response => setCharacters(response.data.data.results));
  }, []);

  // get comics everytime a character is found
  useEffect(() => {
    if (character) {
      api(character.id).get(`/`)
        .then(response => setComics(response.data.data.results))
    } else {
      setComics([]);
    }
  }, [character]);


  return (
    <div>

      <Topbar />

      <SearchBar setCharacter={setCharacter} setSearch={setSearch} />

      <div className="pageContainer">
        <h2>Marvel Characters</h2>
        {(!character && !search) &&
          <div className="cardContainer">
            {characters.map((character, index) => (
              <CharacterCard
                key={index}
                name={character.name}
                id={character.id}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              />
            ))}
          </div>
        }
        {character && character.id}
        {console.log(comics)}
      </div>

    </div>
  );
};