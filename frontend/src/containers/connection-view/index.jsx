import React, {Component} from 'react';
import StatusBar from "../common/statusBar.jsx";
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';

import ConnectionComponent from "../../components/connection/connectionComponent.jsx";

class ConnectionView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.onLoadingConnectionOff = this.onLoadingConnectionOff.bind(this);
    this.onLoadingConnectionOn = this.onLoadingConnectionOn.bind(this);

  }

  onLoadingConnectionOff() {
    this.setState({isLoading: false})
  }

  onLoadingConnectionOn() {
    this.setState({isLoading: true})
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
        height: "100%",
        position: "fixed",
        top: "0%"
      },
      circularStyle: {
        paddingTop: "20px",
        paddingRight: "10px"
      }
    };

    return (
      <div style={styles.connectionViewStyle}>
        <StatusBar dispatch={this.props.dispatch}/>
        <div style={styles.contentStyle}>
          <ConnectionComponent isSignup={false}
                               dispatch={this.props.dispatch}
                               router={this.props.router.router}
                               onLoadingConnectionOn={this.onLoadingConnectionOn}
                               onLoadingConnectionOff={this.onLoadingConnectionOff} />
          <ConnectionComponent isSignup={true}
                               onLoadingConnectionOn={this.onLoadingConnectionOn}
                               onLoadingConnectionOff={this.onLoadingConnectionOff} />
        </div>
        {this.state.isLoading ? (
          <CircularProgress style={styles.circularStyle} />
        ) : null}
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

export default connect(mapStateToProps)(ConnectionView);
