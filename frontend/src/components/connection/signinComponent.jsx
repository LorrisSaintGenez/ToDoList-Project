import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {loginConnection} from '../../actions/authentication.js';

export default class SigninComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false
    };
  }

  signinConnection() {
    let signinInformations = {
      email: this.state.email,
      password: this.state.password
    };
    let res = JSON.parse(loginConnection(signinInformations));
    this.props.dispatch({
      type: 'LOGIN_ACT',
      token: res.id
    });
    this.props.router.push('/profil');
  }

  handleMailSignIn(email) {
    if (this.state.error)
      this.setState({error: false});
    this.setState({email: email});
  }

  handlePasswordSignIn(password) {
    this.setState({password: password});
  }

  render() {

    const styles = {
      signinStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      },
      spanStyle: {
        fontSize: "18px",
        color: "rgba(0, 188, 212, 1)",
        marginBottom: "20px"
      }
    };

    let REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <div style={styles.signinStyle}>
        <span style={styles.spanStyle}>Log in your account</span>
        <TextField
          type="email"
          hintText="Enter your email"
          errorText={this.state.error ? "Wrong combination email/password" : ""}
          onChange={(e) => this.handleMailSignIn(e.target.value)} />
        <TextField
          type="password"
          hintText="Enter your password"
          onChange={(e) => this.handlePasswordSignIn(e.target.value)} />
        <FlatButton
          label="Sign in"
          primary={true}
          disabled={this.state.email === '' || this.state.password === '' || !this.state.email.match(REGEXP) }
          onClick={() => this.signinConnection()} />
      </div>
    )
  }
}