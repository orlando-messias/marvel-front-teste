import React from 'react';
// react-icons
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import { useHistory } from 'react-router';
// styles
import './NavbarStyles.css';


export default function NavigationBar() {

  const history = useHistory();

  const handleBackClick = () => {
    window.history.back();
  };

  const handleHomeClick = () => {
    history.push('/');
  };

  return (
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
  );
};