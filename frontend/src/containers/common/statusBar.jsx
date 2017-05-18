import React, {Component} from 'react';
import { Link } from 'react-router';

export default class StatusBar extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const styles = {
      banner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: 'grey',
        height: "50px"
      },
      linkStyle: {
        marginRight: "15px"
      }
    };

    return (
      <div style={styles.banner}>
        <Link to="/" style={styles.linkStyle}>
          Home
        </Link>
        <Link to="/login" style={styles.linkStyle}>
          Connection
        </Link>
        <Link to="/signup">
          Sign up
        </Link>
      </div>
    );
  }
}