import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import CharacterDetails from './Pages/CharacterDetails';
import ComicDetails from './Pages/ComicDetails';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserFavorites from './Pages/UserFavorites';

export default function Routes() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/home' component={Home} />
      <Route path='/register/:mode' component={Register} />
      <Route path='/register' exact component={() => <Redirect to="/register/insert" />} />
      <Route path='/comicdetails/:id' component={ComicDetails} />
      <Route path='/characterdetails/:name' component={CharacterDetails} />
      <Route path='/favorites' component={UserFavorites} />
    </Router>
  );
};