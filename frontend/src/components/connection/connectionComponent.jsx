import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import _ from 'lodash';

import {addConnection, loginConnection} from '../../actions/authentication.js';

export default class ConnectionComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pseudo: "",
      email: "",
      password: "",
      error: false,
      errorPseudo: false,
      success: false,
      isDialogOpen: false,
      resetedPassword: null
    };
  }

  signupConnection() {
    this.props.onLoadingConnectionOn();
    let signupInformations = {
      username: this.state.pseudo,
      email: this.state.email,
      password: this.state.password
    };
    let res = JSON.parse(addConnection(signupInformations));
    if (!res.error)
      this.setState({success: true});
    else if (res.error.details.messages.username)
      this.setState({errorPseudo: true});
    else
      this.setState({error: true});
    this.props.onLoadingConnectionOff();
  }

  signinConnection() {
    this.props.onLoadingConnectionOn();
    let signinInformations = {
      email: this.state.email,
      password: this.state.password
    };
    let res = JSON.parse(loginConnection(signinInformations));
    if (res) {
      document.cookie = "token=" + res.id;
      document.cookie = "id=" + res.userId;
      this.props.dispatch({ type: 'LOGIN_ACT', auth: {token: res.id, userid: res.userId} });
      this.props.onLoadingConnectionOff();
      this.props.router.push('/profile');
    }
    else {
      this.setState({error: true});
      this.props.onLoadingConnectionOff();
    }
  }

  handlePseudo(pseudo) {
    if (this.state.success)
      this.setState({success: false});
    if (this.state.errorPseudo)
      this.setState({errorPseudo: false});
    this.setState({pseudo: pseudo});
  }

  handleMail(email) {
    if (this.state.success)
      this.setState({success: false});
    if (this.state.error)
      this.setState({error: false});
    this.setState({email: email});
  }

  handlePassword(password) {
    this.setState({password: password});
  }

  onPasswordDialogOn() {
    this.setState({isDialogOpen: true});
  }

  onPasswordDialogOff() {
    this.setState({isDialogOpen: false});
  }

  generateRandomString() {
    const keys = _.shuffle(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"));

    let password = "";
    while (password.length < 8) {
      _.forEach(keys, (key, index) => {
        let ran = Math.floor(Math.random() * 5) + 1;
        if ((index + 2) % ran === 0)
          password += key;
        if (password.length === 8)
          return false;
      });
    }

    this.setState({resetedPassword: password});
  }

  onPasswordReset() {
    this.generateRandomString();
  }

  render() {

    const styles = {
      connectionStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        padding: "10px",
        marginRight: "10px",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        height: "250px"
      },
      spanStyle: {
        fontSize: "18px",
        color: this.state.success ? "green" : "rgba(0, 188, 212, 1)",
        marginBottom: "20px"
      }
    };

    const actions = [
      <FlatButton
        label="Back"
        onTouchTap={() => this.onPasswordDialogOff()} />,
      <FlatButton
        label="Reset"
        onTouchTap={() => this.onPasswordReset()}
        secondary={true} />
    ];

    let REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <div style={styles.connectionStyle}>
        <span style={styles.spanStyle}>{this.props.isSignup ? (this.state.success ? "Account created !" : "New ? Create an account !") : "Log in your account"}</span>
        {this.props.isSignup ? (
          <TextField
            type="text"
            hintText="Enter your pseudo"
            errorText={this.state.errorPseudo ? "Pseudo already used" : ""}
            onChange={(e) => this.handlePseudo(e.target.value)} />
        ) : null}
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
          disabled={this.state.email === '' || this.state.password === '' || (this.state.pseudo === '' && this.props.isSignup) || !this.state.email.match(REGEXP) }
          onClick={this.props.isSignup ? () => this.signupConnection() : () => this.signinConnection()} />
        {this.props.isSignup ? null :
          (<div>
            <FlatButton
              label="Forgot password"
              disabled={this.state.email === '' || !this.state.email.match(REGEXP)}
              secondary={true}
              onClick={() => this.onPasswordDialogOn()} />
            <Dialog
              title="Reset password"
              actions={actions}
              open={this.state.isDialogOpen}
              onRequestClose={() => this.onPasswordDialogOff()}>
              {this.state.resetedPassword ?
                  "Your new password is : " + this.state.resetedPassword
                : (
                  "Are you sure you want to reset your password ?" +
                  "The new password will be send to your email address."
                )}
            </Dialog>
          </div>)
        }
      </div>
    );
  }
}
