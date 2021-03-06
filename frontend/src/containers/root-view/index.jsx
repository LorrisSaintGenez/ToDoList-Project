import React, {Component} from 'react';
import { Router, Route, hashHistory} from 'react-router';
import { connect } from 'react-redux';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import HomeView from '../home-view/index.jsx'
import ProfileView from '../profile-view/index.jsx'
import ConnectionView from '../connection-view/index.jsx'
import AllBoardView from '../allboards-view/index.jsx';
import BoardView from '../board-view/index.jsx';
import StatusBar from '../common/statusBar.jsx';

class RootView extends Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();

    this.state = {
      routes:
        <Route component={StatusBar}>
          <Route exact path='/' component={HomeView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/login' component={ConnectionView} />
          <Route path='/list' component={AllBoardView} />
          <Route path='/list/:id' component={BoardView} />
        </Route>
    }
  }

  getCookieValue(key) {
    let regex = new RegExp('(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$');
    const decodedCookie = decodeURIComponent(document.cookie);
    let value = decodedCookie.replace(regex, "$1");

    if (value !== "")
      return value;
    else
      return null;
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      }
    });

    const token = this.getCookieValue('token');
    const userid = this.getCookieValue('id');

    if (this.props.token === null)
      if (token)
        this.props.dispatch({ type: 'LOGIN_ACT', auth: {token: token, userid: userid} });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={hashHistory}>
          {this.state.routes}
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (store, router) => {
  return {
    token: store.loginState.token,
    userid: store.loginState.userid,
    personal: store.boardState.personal,
    shared: store.boardState.shared,
    router: router
  }
};

export default connect(mapStateToProps)(RootView);