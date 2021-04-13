// react
import React from 'react';
import { useHistory } from 'react-router';
// styles
import './CharacterCardStyles.css';


export default function CharacterCard({ name, id, image }) {

  const history = useHistory();

  const handleCharacterClick = (name) => {
    history.push(`/characterdetails/${name}`);
  };

  return (
    <div className="characterCard" onClick={() => handleCharacterClick(name)}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
    </div>
  )
};