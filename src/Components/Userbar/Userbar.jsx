// react
import React from 'react';
import { useHistory } from 'react-router';
// redux
import { useDispatch } from 'react-redux';
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

  const handleEditUser = () => {
    history.push('/register/update');
  }

  return (

    <div className="userBarContainer">
      <div>
        <span>Welcome, {user
          && user.name.split(' ')[0]}
        </span>

        <span className="userIcon"><FaUserAlt /></span>
        <span className="editUser" onClick={handleEditUser}>edit</span>

        <div className="menu">
          <span>
            <AiFillHeart className="whiteMe" />
            <span onClick={handleFavorites}>Favorites</span>
          </span>

          <span>
            <IoLogOutSharp className="logoutIcon" />
            <span onClick={handleLogout}>Logout</span>
          </span>
        </div>
      </div>

    </div>

  );
};
