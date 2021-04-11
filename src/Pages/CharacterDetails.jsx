// react
import React, { useEffect, useState } from 'react';
// react-icons
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import FoundCharacterCard from '../Components/FoundCharacterCard/FoundCharacterCard';
// components
import Topbar from '../Components/Topbar/Topbar';
// services
import api from '../services/marvelApi';
// styles
import './CharacterDetailsStyles.css';
import { useHistory } from 'react-router';


export default function CharacterDetails({ match }) {
  const [characterDetail, setCharacterDetail] = useState('');

  const name = match.params.name;
  const history = useHistory();

  useEffect(() => {
    api().get(`&name=${name}`)
      .then(response => setCharacterDetail(response.data.data.results[0]));
  }, [name]);

  const handleBackClick = () => {
    window.history.back();
  }

  const handleHomeClick = () => {
    history.push('/');
  }

  return (
    <div className="container">

      <Topbar />

      <div className="backContainer">
        <div onClick={handleBackClick} className="backArrow">
          <IoChevronBackCircleSharp />
          <span>back</span>
        </div>

        <div onClick={handleHomeClick} className="home">
          <AiFillHome />
          <span>home</span>
        </div>
      </div>

      <div className="pageContainer">
        <h2>{characterDetail.title}</h2>

        {characterDetail.thumbnail &&
          <FoundCharacterCard
            name={characterDetail.name}
            description={characterDetail.description}
            image={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
            comics={characterDetail.comics.available}
            series={characterDetail.series.available}
            stories={characterDetail.stories.available}
            events={characterDetail.events.available}
          />
        }

      </div>
    </div>
  );
};