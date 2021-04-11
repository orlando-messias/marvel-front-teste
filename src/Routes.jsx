import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CharacterDetails from './Pages/CharacterDetails';
import ComicDetails from './Pages/ComicDetails';
import Home from './Pages/Home';
import Login from './Pages/Login';

export default function Routes() {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/login' exact component={Login} />
      <Route path='/comicdetails/:id' component={ComicDetails} />
      <Route path='/characterdetails/:name' component={CharacterDetails} />
    </Router>
  );
};