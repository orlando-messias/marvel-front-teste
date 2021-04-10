// react
import React from 'react';
// styles
import './CharacterCardStyles.css';


export default function CharacterCard({ name, id, image }) {
  return (
    <div className="card">
      <h3>{name}</h3> <span>{id}</span>
      <img src={image} alt={name} />
    </div>
  )
};