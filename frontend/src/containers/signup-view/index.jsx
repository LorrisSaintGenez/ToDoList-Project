import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import StatusBar from "../common/statusBar.jsx";

import {addConnection} from '../../actions/authentication.js';

export default class SignupView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    this.setState({email: ""});
    this.setState({password: ""});
  }

  createConnection() {
    let signupInformations = {
      email: this.state.email,
      password: this.state.password
    };
    addConnection(signupInformations);
  }

  handleMail(email) {
    this.setState({email: email});
  }

  handlePassword(password) {
    this.setState({password: password});
  }

  render() {

    const styles = {
      signupStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        height: "100%",
        marginBottom: "50px"
      },
      spanStyle: {
        fontSize: "18px",
        color: "rgba(0, 188, 212, 1)",
        marginBottom: "20px"
      }
    };

    //language=JSRegexp
    let REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <div>
        <StatusBar/>
        <div style={styles.signupStyle}>
          <span style={styles.spanStyle}>Please fill the forms</span>
          <TextField
            type="email"
            hintText="Enter your email here"
            onChange={(e) => this.handleMail(e.target.value)} />
          <TextField
            type="password"
            hintText="Enter your password here"
            onChange={(e) => this.handlePassword(e.target.value)} />
          <FlatButton
            label="Sign up"
            primary={true}
            disabled={this.state.email === '' || this.state.password === '' || !this.state.email.match(REGEXP) }
            onClick={() => this.createConnection()} />
        </div>
      </div>
    );
  }
}