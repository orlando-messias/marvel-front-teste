// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Login/Login.action';
// react-icons
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
// components
import Topbar from '../Components/Topbar/Topbar';
// services
import api from '../services/comicApi';
import userApi from '../services/userApi';
import { isLogin } from '../services/loginServices';
// styles
import './ComicDetailsStyles.css';


export default function ComicDetails({ match }) {
  const [comicDetail, setComicDetail] = useState('');
  const [isFavoriteComic, setIsFavoriteComic] = useState(false);

  const comicId = match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginReducer.user.id);

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    !isLogin()
      ? history.push('/')
      : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));
  }, []);

  // get comic details by comic id, plus verifies if comic is favorite or not
  useEffect(() => {
    api(comicId).get('/')
      .then(response => setComicDetail(response.data.data.results[0]));

    userApi.get(`/favorites/comics/${userId}`)
      .then(response => {
        const isFavorite = response.data.some(comic => comic.comicId === comicId);
        setIsFavoriteComic(isFavorite);
      });
  }, [comicId]);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleCharacterClick = (name) => {
    history.push(`/characterdetails/${name}`);
  };

  const handleFavoriteClick = () => {
    const name = comicDetail.title;
    const thumbPath = comicDetail.thumbnail.path;
    const thumbExt = comicDetail.thumbnail.extension
    userApi.post('favorites/comics', { userId, comicId, name, thumbPath, thumbExt })
      .then(() => {
        setIsFavoriteComic(!isFavoriteComic);
      });
  };

  return (
    <div className="container">

      <Topbar />

      <div className="backContainer">
        <div onClick={handleBackClick} className="backArrow">
          <IoChevronBackCircleSharp />
          <span>back</span>
        </div>
      </div>

      <div className="pageContainer">
        <h2>{comicDetail.title}</h2>

        <div className="comicDetailsCard">
          {comicDetail.thumbnail &&
            <img
              src={`${comicDetail.thumbnail.path}.${comicDetail.thumbnail.extension}`}
              alt={comicDetail.title}
            />
          }

          <div className="comicDetailsInfo">
            <div className="headerCard">
              <h3>{comicDetail.title}</h3>
              <span className="heart" onClick={handleFavoriteClick}>
                {isFavoriteComic ? <AiFillHeart style={{ color: 'red' }} /> : < AiOutlineHeart />}
              </span>
            </div>
            <p>{comicDetail.description}</p>
            <div>
              Characters:
              {comicDetail.characters &&
                comicDetail.characters.items.map((character, index) => (
                  <span
                    key={index}
                    className="characterNameSpan"
                    onClick={() => handleCharacterClick(character.name)}
                  >
                    {character.name}
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};