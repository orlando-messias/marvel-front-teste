// react
import React, { useState } from 'react';
// react icons
import { FaSearch } from "react-icons/fa";
// services
import api from '../../services/marvelApi';
import { searchInputValidation } from '../../services/validations';
// styles
import './SearchBarStyles.css';


export default function SearchBar({ setCharacter }) {
  const [characterName, setCharacterName] = useState('');

  const handleSearchClick = () => {
    api.get(`&name=${characterName}`)
      .then(response => setCharacter(response.data.data.results[0]));
  };

  const handleInputChange = (e) => {
    setCharacterName(e.target.value);
  };

  return (
    <div className="searchBarContainer">

      <div className="searchIconContainer">
        <FaSearch className="searchIcon" />
      </div>

      <input
        type="text"
        name="search"
        placeholder="Character Name"
        onChange={handleInputChange}
      />

      <button
        className="btnSearch"
        onClick={handleSearchClick}
        disabled={!searchInputValidation(characterName)}
      >
        Search
      </button>

    </div>
  );
};