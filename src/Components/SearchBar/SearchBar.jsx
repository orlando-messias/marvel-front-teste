// react
import React, { useEffect, useState } from 'react';
// react icons
import { FaSearch } from "react-icons/fa";
// services
import api from '../../services/characterApi';
import comicApi from '../../services/comicApi';
import { searchInputValidation } from '../../services/validations';
// styles
import './SearchBarStyles.css';


export default function SearchBar({
  setCharacter,
  setSearch,
  setIsFetchingCharacter,
  setComics,
  setIsFetchingComics }) {

  const [characterName, setCharacterName] = useState('');
  const [check, setCheck] = useState(false);

  // checks if searchbar is empty
  useEffect(() => {
    if (characterName === '') {
      setSearch(false);
      setCharacter('');
    }
  }, [characterName, setCharacter, setSearch]);

  // fetches characters or comics after clicking search button
  // previously verifies the state of checkbox 'Comics only'
  const handleSearchClick = () => {
    setCharacter('');
    if (check) {
      setIsFetchingComics(true);
      comicApi().get(`&title=${characterName}`)
        .then(response => {
          setComics(response.data.data.results);
          setIsFetchingComics(false);
        });
    }
    if (!check) {
      setIsFetchingCharacter(true);
      api().get(`&name=${characterName}`)
        .then(response => {
          setCharacter(response.data.data.results[0])
          setIsFetchingCharacter(false);
        });
    }

    setSearch(true);
  };

  const handleSearchChange = (e) => {
    setCharacterName(e.target.value);
  };

  // toggles between checked and unchecked to search by characters or comics
  const handleCheck = () => setCheck(!check);

  return (
    <div className="searchBarContainer">

      <div className="searchIconContainer">
        <FaSearch className="searchIcon" />
      </div>

      <input
        type="text"
        name="search"
        placeholder={check ? 'Comic Title' : 'Character Name'}
        onChange={handleSearchChange}
      />

      <label htmlFor="comic" className="checkLabel">
        <input
          id="comic"
          type="checkbox"
          className="comicCheck"
          checked={check}
          onChange={handleCheck}
        />
        Comics only
      </label>

      <button
        className="btnSearch"
        onClick={handleSearchClick}
        disabled={!searchInputValidation(characterName)}
      >
        Search
      </button>

    </div >
  );
};