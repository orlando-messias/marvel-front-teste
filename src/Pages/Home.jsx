// react
import React, { useEffect, useState } from 'react';
// components
import Topbar from '../Components/Topbar/Topbar';
import CharacterCard from '../Components/CharacterCard/CharacterCard';
import ComicCard from '../Components/ComicCard/ComicCard';
import FoundCharacterCard from '../Components/FoundCharacterCard/FoundCharacterCard';
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
    <div className="container">

      <Topbar />

      <SearchBar setCharacter={setCharacter} setSearch={setSearch} />

      <div className="pageContainer">
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

        {character && (
          <>
            <h2>Character</h2>
            <div className="foundCharacterCardContainer">
              <FoundCharacterCard
                name={character.name}
                description={character.description}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                comics={character.comics.available}
                series={character.series.available}
                stories={character.stories.available}
                events={character.events.available}
              />
            </div>
            <h2>Comics</h2>
            <div className="comicCardContainer">
              {comics.map((comic, index) => (
                <ComicCard
                  key={index}
                  id={comic.id}
                  title={comic.title}
                  description={comic.description}
                  image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
              ))}
              {comics.length === 0 && <p>No Comics Available</p>}
            </div>

          </>
        )}

        {(!character && search) &&
          <p>Not Found</p>
        }

      </div>

    </div>
  );
};