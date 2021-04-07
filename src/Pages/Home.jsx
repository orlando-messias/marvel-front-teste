import React from 'react';
import Topbar from '../Components/Topbar/Topbar';

import './HomeStyles.css';

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="pageContainer">
        <h2>Hello World</h2>
      </div>
    </div>
  )
};