import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {addConnection} from '../../actions/authentication.js';

export default class SignupComponent extends Component {

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

  handleMailSignUp(email) {
    if (this.state.error)
      this.setState({error: false});
    this.setState({email: email});
  }

  handlePasswordSignUp(password) {
    this.setState({password: password});
  }

  render() {

    const styles = {
      signupStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      },
      spanStyle: {
        fontSize: "18px",
        color: this.state.success ? "green" : "rgba(0, 188, 212, 1)",
        marginBottom: "20px"
      }
    };

    let REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <div style={styles.signupStyle}>
        <span style={styles.spanStyle}>{this.state.success ? "Account created !" : "New ? Create an account !"}</span>
        <TextField
          type="email"
          hintText="Enter your email"
          errorText={this.state.error ? "Email already used" : ""}
          onChange={(e) => this.handleMailSignUp(e.target.value)} />
        <TextField
          type="password"
          hintText="Enter your password"
          onChange={(e) => this.handlePasswordSignUp(e.target.value)} />
        <FlatButton
          label="Sign up"
          primary={true}
          disabled={this.state.email === '' || this.state.password === '' || !this.state.email.match(REGEXP) }
          onClick={() => this.signupConnection()} />
      </div>
    );
  }
}