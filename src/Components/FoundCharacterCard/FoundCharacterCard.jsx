// react
import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
// styles
import './FoundCharacterCardStyles.css';


export default function FoundCharacterCard({
  name,
  description,
  image,
  comics,
  series,
  stories,
  events }) {
  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  return (
    <div className="foundCharacterCard">

      <img src={image} alt={name} />

      <div className="foundCharacterInfo">
        <div className="headerCard">
          <h3>{name}</h3>
          <span className="heart" onClick={handleFavoriteClick}>
            {favorite ? <AiFillHeart style={{color: 'red'}} /> : < AiOutlineHeart />}
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