import React, {Component} from 'react';

import StatusBar from '../common/statusBar.jsx';
import { connect } from 'react-redux';

class HomeView extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const styles = {
		homeInfo: {
			marginTop: "50px",
			textAlign: "center"
        },
		features: {
			color: "#5f5f5f",
			lineHeight: "80px"
        }
    };

    return (
      <div style={styles.homeInfo}>
		<h1>Welcome on ToDoList !</h1>
		<div style={styles.features}>
	   	  <h3>Create todo lists</h3>
		  <h3>Share them with friends</h3>
		  <h3>Add and complete tasks</h3>
		</div>
      </div>
    );
  }
}

const mapStateToProps = (store, router) => {
  return {
    token: store.loginState.token,
    userid: store.loginState.userid,
    personal: store.boardState.personal,
    shared: store.boardState.shared,
    router: router
  }
};

export default connect(mapStateToProps)(HomeView);