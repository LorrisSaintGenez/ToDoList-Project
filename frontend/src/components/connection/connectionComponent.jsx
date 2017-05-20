import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {addConnection, loginConnection} from '../../actions/authentication.js';

export default class ConnectionComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
      success: false
    };
  }

  signupConnection() {
    let signupInformations = {
      email: this.state.email,
      password: this.state.password
    };
    let res = addConnection(signupInformations);
    if (res)
      this.setState({success: true});
    else
      this.setState({error: true});
  }

  signinConnection() {
    let signinInformations = {
      email: this.state.email,
      password: this.state.password
    };
    let res = JSON.parse(loginConnection(signinInformations));
    if (res) {
      this.props.dispatch({
        type: 'LOGIN_ACT',
        token: res.id
      });
      this.props.router.push('/profile');
    }
    else
      this.setState({error: true})
  }

  handleMail(email) {
    if (this.state.error)
      this.setState({error: false});
    this.setState({email: email});
  }

  handlePassword(password) {
    this.setState({password: password});
  }

  render() {

    const styles = {
      connectionStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        border: "1px solid black",
        padding: "10px",
        marginRight: "10px",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)"
      },
      spanStyle: {
        fontSize: "18px",
        color: this.state.success ? "green" : "rgba(0, 188, 212, 1)",
        marginBottom: "20px"
      }
    };

    let REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <div style={styles.connectionStyle}>
        <span style={styles.spanStyle}>{this.props.isSignup ? (this.state.success ? "Account created !" : "New ? Create an account !") : "Log in your account"}</span>
        <TextField
          type="email"
          hintText="Enter your email"
          errorText={this.state.error ? (this.props.isSignup ? "Email already used" : "Wrong combination email/password") : ""}
          onChange={(e) => this.handleMail(e.target.value)} />
        <TextField
          type="password"
          hintText="Enter your password"
          onChange={(e) => this.handlePassword(e.target.value)} />
        <FlatButton
          label={this.props.isSignup ? "Sign up" : "Sign in"}
          primary={true}
          disabled={this.state.email === '' || this.state.password === '' || !this.state.email.match(REGEXP) }
          onClick={() => this.props.isSignup ? this.signupConnection() : this.signinConnection()} />
      </div>
    );
  }
}
