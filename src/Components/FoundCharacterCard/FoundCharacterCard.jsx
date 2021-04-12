// react
import React, { useEffect } from 'react';
// redux
import { useSelector } from 'react-redux';
// react-icons
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
// services
import userApi from '../../services/userApi';
// styles
import './FoundCharacterCardStyles.css';


export default function FoundCharacterCard({
  id,
  name,
  description,
  imagePath,
  imageExt,
  comics,
  series,
  stories,
  events,
  isFavoriteCharacter,
  setIsFavoriteCharacter }) {

  useEffect(() => {
    isFavoriteCharacter ? setIsFavoriteCharacter(true) : setIsFavoriteCharacter(false);
  }, []);

  const userId = useSelector(state => state.loginReducer.user.id);
  const characterId = id;
  const thumbPath = imagePath;
  const thumbExt = imageExt;

  const handleFavoriteClick = () => {
    userApi.post('favorites/characters', { userId, characterId, name, thumbPath, thumbExt })
      .then(() => {
        setIsFavoriteCharacter(!isFavoriteCharacter);
      })
  };

  return (
    <div className="foundCharacterCard">

      <img src={`${imagePath}.${imageExt}`} alt={name} />

      <div className="foundCharacterInfo">
        <div className="headerCard">
          <h3>{name}</h3>
          <span className="heart" onClick={handleFavoriteClick}>
            {isFavoriteCharacter ? <AiFillHeart style={{ color: 'red' }} /> : < AiOutlineHeart />}
          </span>
        </div>
        <p>{description}</p>
        <p>
          <span>Comics: {comics}</span> |
          <span> Series: {series}</span> |
          <span> Stories: {stories}</span> |
          <span> Events: {events}</span>
        </p>
      </div>

    </div>
  );
};