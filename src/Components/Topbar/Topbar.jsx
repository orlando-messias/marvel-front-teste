import React from 'react';

import logo from '../../assets/logo-marvel.png';
import styles from './TopbarStyles.css';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <h3 className="topbarTitle">Characters and Comics</h3>
      <img src={logo} alt="Marvel"/>
    </div>
  )
};