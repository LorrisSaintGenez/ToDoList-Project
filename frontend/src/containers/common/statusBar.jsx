import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class StatusBar extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  logoutAction() {
    this.props.dispatch({
      type: 'LOGOUT_ACT',
      token: null
    });
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
        marginLeft: "20px"
      }
    };

    return (
      <div style={styles.banner}>
        <Link to="/" style={styles.linkStyle}>
          Home
        </Link>
        {this.props.token === null ? (
            <Link to="/login" style={styles.linkStyle}>
              Sign In / Sign Up
            </Link>
          ): (
            <Link to="/" style={styles.linkStyle} onClick={() => this.logoutAction()}>
              Logout
            </Link>
          )
        }
      </div>
    );
  }
}
const mapStateToProps = (store, router) => {
  return {
    token: store.token,
    router: router
  }
};

export default connect(mapStateToProps)(StatusBar);