import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import StatusBar from "../common/statusBar.jsx";
import BoardComponent from '../../components/board/boardComponent.jsx';
import DialogCreateBoardComponent from '../../components/board/dialogCreateBoardComponent.jsx';

import { getBoardByOwnerId, getBoardSharedWithUser } from '../../actions/board.js';
import { getUserById } from '../../actions/authentication.js';

class AllBoardView extends Component {

  constructor(props) {
    super(props);

    this.updateLists = this.updateLists.bind(this);

    this.state = {
      personalLists: [],
      sharedLists: []
    };
  }

  componentWillMount() {
    if (this.props.token === null)
      window.location.href = "#/";
    else
      this.getUserBoards();
  }

  getUserBoards() {
    getBoardByOwnerId(this.props.userid, (res) => {
      let personal = [];
      let shared = [];
      _.forEach(res, list => {
        if (list.authorizedUsers.length > 0)
          shared.push(list);
        else
          personal.push(list);
      });

      let userInfos = JSON.parse(getUserById(this.props.userid, this.props.token));
      let boardShared = JSON.parse(getBoardSharedWithUser(userInfos.username));

      this.setState({
        personalLists: personal,
        sharedLists: _.concat(shared, boardShared)
      });
    });
  }

  updateLists() {
    this.getUserBoards();
  }

  render() {

    const styles = {
      newBoard: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
      },
      displayListStyle: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "flex-start",
        width: "100%",
        marginTop: "30px"
      }
    };

    return (
      <div style={styles.newBoard}>
        <DialogCreateBoardComponent updateLists={this.updateLists} />
        <div style={styles.displayListStyle}>
            <BoardComponent list={this.state.sharedLists} title="Shared boards" />
            <BoardComponent list={this.state.personalLists} title="Personal boards" />
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

export default connect(mapStateToProps)(AllBoardView);
