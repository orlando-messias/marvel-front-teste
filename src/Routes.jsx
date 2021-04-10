import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ComicDetails from './Pages/ComicDetails';
import Home from './Pages/Home';

export default function Routes() {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/comicdetails/:id' component={ComicDetails} />
    </Router>
  );
};