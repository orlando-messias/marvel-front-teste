// react
import React, { useEffect, useState } from 'react';
// react-icons
import { IoChevronBackCircleSharp } from 'react-icons/io5';
// components
import Topbar from '../Components/Topbar/Topbar';
// services
import api from '../services/comicApi';
// styles
import './ComicDetailsStyles.css';


export default function ComicDetails({ match }) {
  const [comicDetail, setComicDetail] = useState('');

  const id = match.params.id;

  useEffect(() => {
    api(id).get('/')
      .then(response => setComicDetail(response.data.data.results[0]))
  }, [id]);

  const handleBackContainerClick = () => {
    window.history.back();
  }

  return (
    <div>

      <Topbar />

      <div className="backContainer" onClick={handleBackContainerClick}>
        <IoChevronBackCircleSharp className="backArrow" />
        <span>back</span>
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

          <div>
            <h3>{comicDetail.title}</h3>
            <p>{comicDetail.description}</p>
            <div>
              Characters:
              {comicDetail.characters &&
                comicDetail.characters.items.map((character, index) => (
                  <span
                    key={index}
                    className="characterNameSpan"
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