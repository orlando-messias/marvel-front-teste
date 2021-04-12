// react
import React, { useEffect, useState } from 'react';
// react-icons
import { AiFillHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
// components
import Topbar from '../Components/Topbar/Topbar';
// services
import api from '../services/comicApi';
// styles
import './ComicDetailsStyles.css';


export default function ComicDetails({ match }) {
  const [comicDetail, setComicDetail] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  const id = match.params.id;
  const history = useHistory();

  useEffect(() => {
    api(id).get('/')
      .then(response => setComicDetail(response.data.data.results[0]))
  }, [id]);

  const handleBackContainerClick = () => {
    window.history.back();
  };

  const handleCharacterClick = (name) => {
    // console.log('character id ', id);
    history.push(`/characterdetails/${name}`);
  };

  return (
    <div className="container">

      <Topbar />

      <Link to={'/'}>
        <div className="backContainer" onClick={handleBackContainerClick}>
          <div className="home">
            <AiFillHome />
            <span>home</span>
          </div>
        </div>

      </Link>

      <div className="pageContainer">
        <h2>{comicDetail.title}</h2>

        <div className="comicDetailsCard">
          {comicDetail.thumbnail &&
            <img
              src={`${comicDetail.thumbnail.path}.${comicDetail.thumbnail.extension}`}
              alt={comicDetail.title}
            />
          }

          <div>
            <div className="headerCard">
              <h3>{comicDetail.title}</h3>
              <span className="heart" onClick={handleFavoriteClick}>
                {favorite ? <AiFillHeart style={{ color: 'red' }} /> : < AiOutlineHeart />}
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