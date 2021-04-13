// react
import React from 'react';
import { useHistory } from 'react-router';
// styles
import './ComicCardStyles.css';


export default function ComicCard({ title, description, image, id }) {
  
  const history = useHistory();

  const handleComicClick = (id) => {
    history.push(`/comicdetails/${id}`);
  };
  
  return (
    <div className="comicCard" onClick={() => handleComicClick(id)}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};