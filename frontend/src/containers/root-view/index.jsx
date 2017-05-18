import React, {Component} from 'react';
import { Router, Route, hashHistory} from 'react-router';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import HomeView from '../home-view/index.jsx'
import ProfilView from '../profil-view/index.jsx'
import SignupView from '../signup-view/index.jsx'

export default class RootView extends Component {

  constructor(props) {
      super(props);
  }

  render() {

    injectTapEventPlugin();

    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      }
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={hashHistory}>
          <Route exact path='/' component={HomeView} />
          <Route path='/profil' component={ProfilView} />
          <Route path='/signup' component={SignupView} />
        </Router>
      </MuiThemeProvider>
    );
  }
}