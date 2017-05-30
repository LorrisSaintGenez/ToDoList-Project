import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import StatusBar from "../common/statusBar.jsx";
import BoardComponent from '../../components/board/boardComponent.jsx';
import DialogComponent from '../../components/board/dialogComponent.jsx';

import { getBoardByOwnerId } from '../../actions/board.js';

class MyListView extends Component {

  constructor(props) {
    super(props);

    this.updateLists = this.updateLists.bind(this);

    this.state = {
      personalLists: [],
      sharedLists: []
    };
  }

  componentWillMount() {
    this.getUserBoards();
  }

  getUserBoards() {
    let res = JSON.parse(getBoardByOwnerId(this.props.userid));
    let personal = [];
    let shared = [];
    _.forEach(res, list => {
      if (list.authorizedUsers.length > 0)
        shared.push(list);
      else
        personal.push(list);
    });

    this.setState({personalLists: personal, sharedLists: shared});
  }

  updateLists() {
    this.getUserBoards();
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
        //justifyContent: "center",
        //alignItems: "center",
        width: "100%"
      },
      displayListStyle: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "flex-start",
        //justifyContent: "center",
        width: "100%",
        marginTop: "30px"
      }
    };

    if (this.props.token === null)
     this.props.router.router.push('/');

    return (
      <div style={styles.myListViewStyle}>
        <StatusBar />
        <div style={styles.newBoard}>
          <DialogComponent updateLists={this.updateLists} />
          <div style={styles.displayListStyle}>
              <BoardComponent list={this.state.sharedLists} title="Shared boards" />
              <BoardComponent list={this.state.personalLists} title="Personal boards" />
          </div>
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
