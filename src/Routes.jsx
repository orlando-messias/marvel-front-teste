import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CharacterDetails from './Pages/CharacterDetails';
import ComicDetails from './Pages/ComicDetails';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

export default function Routes() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/home' component={Home} />
      <Route path='/register' component={Register} />
      <Route path='/comicdetails/:id' component={ComicDetails} />
      <Route path='/characterdetails/:name' component={CharacterDetails} />
    </Router>
  );
};