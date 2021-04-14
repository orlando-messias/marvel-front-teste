// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Login/Login.action';
// react-icons
import FoundCharacterCard from '../Components/FoundCharacterCard/FoundCharacterCard';
// components
import Topbar from '../Components/Topbar/Topbar';
import Navbar from '../Components/Navbar/Navbar';
import ComicCard from '../Components/ComicCard/ComicCard';
// services
import characterApi from '../services/characterApi';
import userApi from '../services/userApi';
import { isLogin } from '../services/loginServices';
// styles
import './CharacterDetailsStyles.css';


export default function CharacterDetails({ match }) {
  const [characterDetail, setCharacterDetail] = useState('');
  const [comics, setComics] = useState([]);
  const [isFetchingComics, setIsFetchingComics] = useState(false);
  const [isFavoriteCharacter, setIsFavoriteCharacter] = useState(false);

  const name = match.params.name;
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.loginReducer.user);
  const { id: userId } = user;

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    !isLogin()
      ? history.push('/')
      : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));
  }, []);

  // get character by name
  useEffect(() => {
    characterApi().get(`&name=${name}`)
      .then(response => setCharacterDetail(response.data.data.results[0]));
  }, [name]);

  // get comics by character id
  useEffect(() => {
    if (characterDetail) {
      setIsFetchingComics(true);
      characterApi(characterDetail.id).get(`/`)
        .then(response => {
          setComics(response.data.data.results)
          setIsFetchingComics(false)
        })
    }
  }, [name, characterDetail]);

  // checks if character is a favorite one
  useEffect(() => {
    const headers = { Authorization: `Bearer ${user.token}` };
    userApi.get(`/favorites/characters/${userId}`, { headers })
      .then(response => {
        const isFavorite = response.data.some(ch => Number(ch.characterId) === characterDetail.id);
        setIsFavoriteCharacter(isFavorite);
      });
  }, [characterDetail]);


  return (
    <div className="container">

      <Topbar />

      <Navbar />

      <div className="pageContainer">
        <h2>{characterDetail.title}</h2>

        {characterDetail.thumbnail &&
          <FoundCharacterCard
            id={characterDetail.id}
            name={characterDetail.name}
            description={characterDetail.description}
            imagePath={characterDetail.thumbnail.path}
            imageExt={characterDetail.thumbnail.extension}
            comics={characterDetail.comics.available}
            series={characterDetail.series.available}
            stories={characterDetail.stories.available}
            events={characterDetail.events.available}
            isFavoriteCharacter={isFavoriteCharacter}
            setIsFavoriteCharacter={setIsFavoriteCharacter}
          />
        }

        {/* renders div loading everytime is fetching comics */}
        {isFetchingComics && <div className="loading">Loading...</div>}

        {/*  renders when comics are found  */}
        {comics.length > 0 &&
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
        }

        {/*  renders when is not fetchin comics, a character is found and no comics  */}
        {!isFetchingComics && characterDetail && comics.length === 0 &&
          <p>No Comics Available</p>
        }

      </div>

    </div>
  );
};