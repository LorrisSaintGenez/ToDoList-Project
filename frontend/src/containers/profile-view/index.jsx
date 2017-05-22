import React, {Component} from 'react';
import { connect } from 'react-redux';
import StatusBar from "../common/statusBar.jsx";

class ProfileView extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      profileView: {
        left: "0px",
        top: "0px",
        position: "absolute",
        width: "100%"
      }
    };

    if (this.props.token === null)
      this.props.router.router.push('/');

    return (
      <div style={styles.profileView}>
        <StatusBar dispatch={this.props.dispatch}/>
        Profile page
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

export default connect(mapStateToProps)(ProfileView);