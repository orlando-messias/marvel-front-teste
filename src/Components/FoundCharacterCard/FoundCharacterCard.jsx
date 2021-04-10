// react
import React from 'react';
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

  return (
    <div className="foundCharacterCard">

      <img src={image} alt={name} />

      <div>
        <h3>{name}</h3>
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