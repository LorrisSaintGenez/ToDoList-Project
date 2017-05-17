import React, {Component} from 'react';
import { Router, Route, hashHistory} from 'react-router';

import HomeView from '../home-view/index.jsx'
import ProfilView from '../profil-view/index.jsx'

export default class RootView extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route exact path='/' component={HomeView} />
        <Route path='/profil' component={ProfilView} />
      </Router>
    );
  }
}