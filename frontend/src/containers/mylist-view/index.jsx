import React, {Component} from 'react';
import { connect } from 'react-redux';
import StatusBar from "../common/statusBar.jsx";

import BoardComponent from '../../components/board/boardComponent.jsx';
import DialogComponent from '../../components/board/dialogComponent.jsx';

import { getBoardByOwnerId } from '../../actions/board.js';

class MyListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userLists: []
    };
  }

  componentWillMount() {
    this.getUserBoards();
  }

  getUserBoards() {
    let res = JSON.parse(getBoardByOwnerId(this.props.userid));
    this.setState({userLists: res});
  }

  render() {

    const styles = {
      myListViewStyle: {
        left: "0px",
        top: "0px",
        position: "absolute",
        width: "100%"
      },
      newBoard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }
    };

    if (this.props.token === null)
     this.props.router.router.push('/');

    return (
      <div style={styles.myListViewStyle}>
        <StatusBar />
        <div style={styles.newBoard}>
          <DialogComponent/>
          <BoardComponent userLists={this.state.userLists} />
        </div>
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

export default connect(mapStateToProps)(MyListView);