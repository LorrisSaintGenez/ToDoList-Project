import React, {Component} from 'react';
import { Router, Route, hashHistory} from 'react-router';
import { connect } from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import HomeView from '../home-view/index.jsx'
import ProfilView from '../profil-view/index.jsx'
import ConnectionView from '../connection-view/index.jsx'

class RootView extends Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  render() {
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
          <Route path='/login' component={ConnectionView} />
        </Router>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (store, router) => {
  return {
    token: store.token,
    router: router
  }
};

export default connect(mapStateToProps)(RootView);
