import React, {Component} from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import StatusBar from '../common/statusBar.jsx';
import UnitBoardComponent from '../../components/board/unitBoardComponent.jsx';
import DialogCreateTaskComponent from '../../components/task/dialogCreateTaskComponent.jsx';
import DialogEditBoardComponent from '../../components/board/dialogEditBoardComponent.jsx';

import { getBoard, deleteBoard, getBoardOwner } from '../../actions/board.js';
import { getBoardItems, deleteBoardItem } from '../../actions/boarditem.js';
import { getUserById } from '../../actions/authentication.js';

class BoardView extends Component {

  constructor(props) {
    super(props);

    this.getBoardItems = this.getBoardItems.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onEditDialogOff = this.onEditDialogOff.bind(this);
    this.getBoard = this.getBoard.bind(this);

    this.state = {
      board: [],
      boardItems: [],
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      isDeleting: false,
      isEditDialogOn: false,
      isShareDialogOn: false,
      author: "",
      currentUser: ""
    };
  }

  componentWillMount() {
    this.getBoard();
  }

  backToBoards() {
    window.location.href = "#/list";
  }

  getBoardItems(id) {
    let res = JSON.parse(getBoardItems(id));
    if (res !== null)
      this.setState({boardItems: res});
  }

  onBoardDelete() {
    let res = deleteBoard(this.state.board.id);
    let items = JSON.parse(getBoardItems(this.state.board.id));
    for (let i = 0; i < items.length; i++) {
      deleteBoardItem(items[i].id);
    }
    if (res)
      this.backToBoards();
  }

  getBoardAuthor(board) {
    let res = getBoardOwner(board.id);
    if (res)
      this.setState({author: JSON.parse(res)[0].username});
  }

  getCurrentUser() {
    let res = getUserById(this.props.userid, this.props.token);
    if (res)
      this.setState({currentUser: JSON.parse(res).username});
  }

  onDialogOpen() {
    this.setState({isDialogOpen: true});
  }

  onDialogClose() {
    this.setState({isDialogOpen: false});
  }

  onDeleteDialogOn() {
    this.setState({isDeleteDialogOpen: true});
  }

  onDeleteDialogOff() {
    this.setState({isDeleteDialogOpen: false});
  }

  onEditDialogOn() {
    this.setState({isEditDialogOn: true});
  }

  onEditDialogOff() {
    this.setState({isEditDialogOn: false});
  }

  onShareDialogOn() {
    this.setState({isShareDialogOn: true});
  }

  onShareDialogOff() {
    this.setState({isShareDialogOn: false});
  }

  getBoard() {
    let res = JSON.parse(getBoard(this.props.params.id));
    this.setState({board: res});
    this.getBoardItems(res.id);
    this.getBoardAuthor(res);
    this.getCurrentUser();
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
      window.location.href = "#/";

    const actions = [
      <FlatButton
        label="No"
        onTouchTap={() => this.onDeleteDialogOff()}/>,
      <FlatButton
        label="Yes"
        onTouchTap={() => this.onBoardDelete()}
        secondary={true}/>
    ];

    const actionShare = [
      <FlatButton
        label="Ok"
        onTouchTap={() => this.onShareDialogOff()}/>
    ];

    return (
      <div style={styles.newBoard}>
        <div style={styles.buttonList}>
          <FlatButton
            style={styles.buttonStyle}
            label="< Back to boards"
            onClick={() => this.backToBoards()} />
          <FlatButton
            style={styles.buttonStyle}
            primary={true}
            label="Add new task"
            onTouchTap={() => this.onDialogOpen()} />
          <FlatButton
            style={styles.buttonStyle}
            primary={true}
            label="Share this board"
            onTouchTap={() => this.onShareDialogOn()} />
          {this.state.currentUser === this.state.author ? (
            <div>
              <FlatButton
                style={styles.buttonStyle}
                primary={true}
                label="Edit this board"
                onTouchTap={() => this.onEditDialogOn()} />
              <FlatButton
                style={styles.buttonStyle}
                secondary={true}
                label="Delete this board"
                onTouchTap={() => this.onDeleteDialogOn()} />
            </div>
          ): null}
        </div>
        <UnitBoardComponent
          board={this.state.board}
          boardItems={this.state.boardItems}
          getBoardItems={this.getBoardItems} />
        <Dialog
          title={"You want to share your list ? Give this token to your friends : " + this.state.board.sharedToken}
          actions={actionShare}
          modal={false}
          open={this.state.isShareDialogOn}
          onRequestClose={() => this.onShareDialogOff()} />
        <Dialog
          title="Are you sure you want to delete this board ?"
          actions={actions}
          modal={false}
          open={this.state.isDeleteDialogOpen}
          onRequestClose={() => this.onDeleteDialogOff()} />
        <DialogCreateTaskComponent
          isDialogOpen={this.state.isDialogOpen}
          onDialogClose={this.onDialogClose}
          getBoardItems={this.getBoardItems}
          board={this.state.board}
          user={this.props.userid} />
        <DialogEditBoardComponent
          board={this.state.board}
          user={this.props.userid}
          isEditDialogOn={this.state.isEditDialogOn}
          onEditDialogOff={this.onEditDialogOff}
          getBoard={this.getBoard} />
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
