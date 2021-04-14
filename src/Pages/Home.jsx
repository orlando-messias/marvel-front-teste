// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IoMdAlert } from 'react-icons/io';
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
import api from '../services/characterApi';
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
  const [isFetchingCharacter, setIsFetchingCharacter] = useState(false);
  const [isFetchingComics, setIsFetchingComics] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.loginReducer.user);
  const { id: userId } = user;

  useEffect(() => {
    // checks if user is logged in, if not, redirects to login page
    !isLogin()
      ? history.push('/')
      : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));

    // fetch some characters from marvel api to render on home page 
    setIsFetchingCharacter(true);
    api().get('/')
      .then(response => {
        setCharacters(response.data.data.results);
        setIsFetchingCharacter(false);
      });
  }, []);

  // if a character is found, then search for all their comics
  // plus verifies if it's favorite or not
  useEffect(() => {
    const headers = { Authorization: `Bearer ${user.token}` };
    if (character) {
      setIsFetchingComics(true);
      api(character.id).get(`/`)
        .then(response => {
          setComics(response.data.data.results)
          setIsFetchingComics(false)
        })

      userApi.get(`/favorites/characters/${userId}`, { headers })
        .then(response => {
          const isFavorite = response.data.some(ch => Number(ch.characterId) === character.id);
          setIsFavoriteCharacter(isFavorite);
        });
    } else {
      setComics([]);
    }
  }, [character]);


  return (
    <div className="container">

      <Topbar />

      <SearchBar
        setCharacter={setCharacter}
        setSearch={setSearch}
        setIsFetchingCharacter={setIsFetchingCharacter}
        setComics={setComics}
        setIsFetchingComics={setIsFetchingComics}
      />

      <div className="pageContainer">
        {(!character && !search) &&
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

        {/* renders div loading everytime is fetching characters */}
        {isFetchingCharacter && <div className="loading">LOADING...</div>}

        {/* renders both characters and comics cards when a character is found and it's not loading */}
        {!isFetchingCharacter && character && (
          <>
            <h2>Character</h2>
            <div className="foundCharacterCardContainer">
              <FoundCharacterCard
                id={character.id}
                name={character.name}
                description={character.description}
                imagePath={character.thumbnail.path}
                imageExt={character.thumbnail.extension}
                comics={character.comics.available}
                series={character.series.available}
                stories={character.stories.available}
                events={character.events.available}
                isFavoriteCharacter={isFavoriteCharacter}
                setIsFavoriteCharacter={setIsFavoriteCharacter}
              />
            </div>

            {isFetchingComics && <div className="loading">Loading...</div>}
            {!isFetchingComics &&
              <>
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
            }
          </>
        )}

        {/*  renders div loading everytime is fetching comics  */}
        {isFetchingComics && <div className="loading">LOADING...</div>}

        {/*  renders when it's not fetching comics nor characters, plus comics is found and
        a character is not found  */}
        {!isFetchingComics && !isFetchingCharacter && comics.length > 0 && !character && (
          <>
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
            </div>
          </>
        )}

        {/*  renders when a character and comics are not found after searching  */}
        {(!character && comics.length === 0 && !isFetchingCharacter && !isFetchingComics && search) &&
          <p className="notFound">
            <IoMdAlert style={{ color: 'red', fontSize: '23px' }} />
            Not Found
          </p>
        }

      </div>

    </div>
  );
};