import React, {Component} from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

import StatusBar from '../common/statusBar.jsx';
import UnitBoardComponent from '../../components/board/unitBoardComponent.jsx';
import DialogCreateTaskComponent from '../../components/task/dialogCreateTaskComponent.jsx';

import { getBoard } from '../../actions/board.js';
import { getBoardItems } from '../../actions/boarditem.js';

class BoardView extends Component {

  constructor(props) {
    super(props);

    this.getBoardItems = this.getBoardItems.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);

    this.state = {
      board: [],
      boardItems: [],
      isDialogOpen: false
    };
  }

  componentWillMount() {
    let res = JSON.parse(getBoard(this.props.params.id));
    this.setState({board: res});
    this.getBoardItems(res.id);
  }

  backToBoards() {
    window.location.href = "#/list";
  }

  getBoardItems(id) {
    let res = JSON.parse(getBoardItems(id));
    if (res !== null)
      this.setState({boardItems: res});
  }

  onDialogOpen() {
    this.setState({isDialogOpen: true});
  }

  onDialogClose() {
    this.setState({isDialogOpen: false});
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
        alignItems: "center"
      },
      buttonList: {
        display: "flex",
        flexFlow: "row wrap",
        width: "100%"
      },
      buttonStyle: {
        margin: "30px 0px 0px 30px"
      }
    };

    if (this.props.token === null)
     this.props.router.router.push('/');

    return (
      <div style={styles.myListViewStyle}>
        <StatusBar />
        <div style={styles.newBoard}>
          <div style={styles.buttonList}>
            <FlatButton
              style={styles.buttonStyle}
              primary={true}
              label="< Back to boards"
              onClick={() => this.backToBoards()} />
            <FlatButton
              style={styles.buttonStyle}
              primary={true}
              label="Add new task"
              onTouchTap={() => this.onDialogOpen()} />
          </div>
          <UnitBoardComponent
            board={this.state.board}
            boardItems={this.state.boardItems}
            getBoardItems={this.getBoardItems} />
          <DialogCreateTaskComponent
            isDialogOpen={this.state.isDialogOpen}
            onDialogClose={this.onDialogClose}
            getBoardItems={this.getBoardItems}
            board={this.state.board}
            user={this.props.userid}
          />
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

export default connect(mapStateToProps)(BoardView);
