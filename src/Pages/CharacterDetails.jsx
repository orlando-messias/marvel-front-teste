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
// services
import characterApi from '../services/characterApi';
import userApi from '../services/userApi';
import { isLogin } from '../services/loginServices';
// styles
import './CharacterDetailsStyles.css';
import Navbar from '../Components/Navbar/Navbar';


export default function CharacterDetails({ match }) {
  const [characterDetail, setCharacterDetail] = useState('');
  const [isFavoriteCharacter, setIsFavoriteCharacter] = useState(false);

  const name = match.params.name;
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginReducer.user.id);

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

  // checks if character is favorite by the user
  useEffect(() => {
    userApi.get(`/favorites/characters/${userId}`)
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

      </div>
    </div>
  );
};