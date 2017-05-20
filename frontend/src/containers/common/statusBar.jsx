import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';

class StatusBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      linkButtonLogOff: [
        {
          name: "Home",
          path: "/"
        },
        {
          name: "Sign In / Sign Up",
          path: "/login"
        }
      ],
      linkButtonLogOn: [
        {
          name: "Home",
          path: "/"
        },
        {
          name: "My profile",
          path: "/profile"
        },
        {
          name: "Logout",
          path: '/'
        }
      ]
    };
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
      flatButtonStyle: {
        marginLeft: "20px"
      }
    };

    console.log(this.props.token);

    return (
      <div style={styles.banner}>
        {_.map((this.props.token === null ? this.state.linkButtonLogOff : this.state.linkButtonLogOn), (item, index) => {
          return (
            <FlatButton style={styles.flatButtonStyle}>
              <Link to={item.path} onClick={index === 2 && this.props.token !== null ? (() => this.logoutAction()) : null} >
                {item.name}
              </Link>
            </FlatButton>
          );
        })}
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