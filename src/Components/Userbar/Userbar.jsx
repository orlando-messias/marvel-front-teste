// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../store/Login/Login.action';
// react icons
import { FaUserAlt } from 'react-icons/fa';
import { IoLogOutSharp } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';
//styles
import './UserbarStyles.css';

export default function Userbar() {

  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('loggedUser'));

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem('loggedUser');
    history.push('/');
  };

  const handleFavorites = () => {
    history.push('/favorites');
  }

  return (

    <div className="userBarContainer">
      <div>
        <span>Welcome, {user
          && user.name.split(' ')[0]}
        </span>

        <span className="userIcon"><FaUserAlt /></span>

        <div className="menu">
          <AiFillHeart className="whiteMe"/>
          <span onClick={handleFavorites}>Favorites</span>
          <IoLogOutSharp className="logoutIcon" />
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>

    </div>

  );
};
