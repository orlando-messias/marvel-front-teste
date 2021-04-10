// react
import React, { useEffect, useState } from 'react';
// react-icons
import { IoChevronBackCircleSharp } from 'react-icons/io5';
// components
import Topbar from '../Components/Topbar/Topbar';
// services
import api from '../services/marvelApi';
// styles
import './CharacterDetailsStyles.css';


export default function CharacterDetails({ match }) {
  const [characterDetail, setCharacterDetail] = useState('');

  const name = match.params.name;

  useEffect(() => {
    api().get(`&name=${name}`)
      .then(response => setCharacterDetail(response.data.data.results[0]));
  }, [name]);

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
        <h2>{characterDetail.title}</h2>

        <div className="foundCharacterCard">

          {characterDetail.thumbnail &&
            <img
              src={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
              alt={characterDetail.title}
            />
          }

          <div>
            <h3>{characterDetail.name}</h3>
            <p>{characterDetail.description}</p>
            {characterDetail.comics &&
              <p>
                <span>Comics: {characterDetail.comics.available}</span> |
                <span> Series: {characterDetail.series.available}</span> |
                <span> Stories: {characterDetail.stories.available}</span> |
                <span> Events: {characterDetail.events.available}</span>
              </p>
            }

          </div>

        </div>
      </div>
    </div>
  );
};