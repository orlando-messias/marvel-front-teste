// react
import React from 'react';
// styles
import './ComicCardStyles.css';


export default function ComicCard({ title, description, image }) {
  return (
    <div className="comicCard">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
};