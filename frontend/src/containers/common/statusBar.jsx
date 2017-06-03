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
          name: "Boards",
          path: "/list"
        },
        {
          name: "Profile",
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
    document.cookie = "token=";
    document.cookie = "id=";
    this.props.dispatch({ type: 'LOGOUT_ACT' });
    this.simulateAnchor('/');
  }

  simulateAnchor(anchor) {
    window.location.href = "#"+anchor;
  }

  render() {

    const styles = {
      banner: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#959fa9",//'grey',
        minHeight: "50px",
        borderBottom: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)"
      },
      flatButtonStyle: {
        marginLeft: "20px",
      },
      flatButtonLabel: {
        color: "#FFFFFF"
      }
    };

    return (
      <div style={styles.banner}>
        {_.map((this.props.token === null ? this.state.linkButtonLogOff : this.state.linkButtonLogOn), (item, index) => {
          return (
            <FlatButton
              key={index}
              style={styles.flatButtonStyle}
              label={item.name}
              labelStyle={styles.flatButtonLabel}
              hoverColor="rgb(181, 192, 202)"
              onClick={ index === 3 && this.props.token !== null
                ? (() => this.logoutAction())
                : (() => this.simulateAnchor(item.path)) } >
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
    userid: store.userid,
    router: router
  }
};

export default connect(mapStateToProps)(StatusBar);
