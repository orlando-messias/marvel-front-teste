import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import api from '../../services/marvelApi';
import './SearchBarStyles.css';

export default function SearchBar({ setCharacter }) {
  const [characterName, setCharacterName] = useState('');

  const handleSearchClick = () => {
    api.get(`&name=${characterName}`)
      .then(response => setCharacter(response.data.data.results[0]))
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
      <button type="button" onClick={handleSearchClick}>Search</button>
    </div>
  )
};