// react
import React, { useEffect, useState } from 'react';
// react icons
import { FaSearch } from "react-icons/fa";
// services
import api from '../../services/marvelApi';
import { searchInputValidation } from '../../services/validations';
// styles
import './SearchBarStyles.css';


export default function SearchBar({ setCharacter, setSearch }) {
  const [characterName, setCharacterName] = useState('');

  useEffect(() => {
    if (characterName === '') {
      setSearch(false);
      setCharacter('');
    }
  }, [characterName]);

  const handleSearchClick = () => {
    api().get(`&name=${characterName}`)
      .then(response => setCharacter(response.data.data.results[0]));

    setSearch(true);
  };

  const handleSearchChange = (e) => {
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
        onChange={handleSearchChange}
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