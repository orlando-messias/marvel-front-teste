// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Login/Login.action';
// components
import Topbar from '../Components/Topbar/Topbar';
import SearchBar from '../Components/SearchBar/SearchBar';
import CharacterCard from '../Components/CharacterCard/CharacterCard';
import ComicCard from '../Components/ComicCard/ComicCard';
import FoundCharacterCard from '../Components/FoundCharacterCard/FoundCharacterCard';
// services
import api from '../services/marvelApi';
import userApi from '../services/userApi';
import { isLogin } from '../services/loginServices';
// styles
import './HomeStyles.css';


export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState('');
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState(false);
  const [isFavoriteCharacter, setIsFavoriteCharacter] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginReducer.user.id);

  useEffect(() => {
    // checks if user is logged in, if not, redirects to login page
    !isLogin()
      ? history.push('/')
      : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));

    api().get('/')
      .then(response => setCharacters(response.data.data.results));
  }, []);

  // get comics everytime a character is found, plus verifies if character is favorite or not
  useEffect(() => {
    if (character) {
      api(character.id).get(`/`)
        .then(response => setComics(response.data.data.results))

      userApi.get(`/favorites/characters/${userId}`)
        .then(response => {
          const isFavorite = response.data.some(ch => Number(ch.characterId) === character.id);
          setIsFavoriteCharacter(isFavorite);
        });
    } else {
      setComics([]);
    }
  }, [character, isFavoriteCharacter]);


  return (
    <div className="container">

      <Topbar />

      <SearchBar setCharacter={setCharacter} setSearch={setSearch} />
      {console.log(character && character.id)}
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
                id={character.id}
                name={character.name}
                description={character.description}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                comics={character.comics.available}
                series={character.series.available}
                stories={character.stories.available}
                events={character.events.available}
                isFavoriteCharacter={isFavoriteCharacter}
                setIsFavoriteCharacter={setIsFavoriteCharacter}
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