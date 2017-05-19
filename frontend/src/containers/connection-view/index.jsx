import React, {Component} from 'react';
import StatusBar from "../common/statusBar.jsx";
import SigninComponent from "../../components/connection/signinComponent.jsx";
import SignupComponent from "../../components/connection/signupComponent.jsx";
import { connect } from 'react-redux';

class ConnectionView extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      connectionViewStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        left: "0px",
        top: "0px",
        position: "absolute"
      },
      contentStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        marginTop: "100px"
      }
    }

    return (
      <div style={styles.connectionViewStyle}>
        <StatusBar dispatch={this.props.dispatch}/>
        <div style={styles.contentStyle}>
          <SigninComponent dispatch={this.props.dispatch} router={this.props.router.router} />
          <SignupComponent />
        </div>
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

export default connect(mapStateToProps)(ConnectionView);