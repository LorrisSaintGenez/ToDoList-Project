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
    };

    return (
      <div>
        Welcome on ToDoList !
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

export default connect(mapStateToProps)(HomeView);