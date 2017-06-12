import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { getUserById, getUserByUsername } from '../../actions/authentication.js';
import { addBoard, getBoardWithToken, editBoard } from '../../actions/board.js';

import SharedUsersComponent from './sharedUsersComponent.jsx';

class DialogCreateBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.handleGlobal = this.handleGlobal.bind(this);
    this.handleAddChip = this.handleAddChip.bind(this);
    this.handleDeleteChip = this.handleDeleteChip.bind(this);

    this.state = {
      error: "",
      isDialogOpen: false,
      sharedToken: "",
      name: "",
      isGlobal: false,
      authorizedUsers: [],
      unknownUser: null,
      invalidUser: null,
      isTokenInvalid: false
    };
  }

  generateRandomString() {
    const keys = _.shuffle(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"));

    let sharedToken = "";
    while (sharedToken.length < 12) {
      _.forEach(keys, (key, index) => {
        let ran = Math.floor(Math.random() * 5) + 1;
        if ((index + 2) % ran === 0)
          sharedToken += key;
        if (sharedToken.length === 12)
          return false;
      });
    }
    return sharedToken;
  }

  onBoardCreate() {
    let userInfos = JSON.parse(getUserById(this.props.userid, this.props.token));
    const boardInformation = {
      name: this.state.name,
      authorizedUsers: this.state.authorizedUsers,
      isGlobal: this.state.isGlobal,
      authorId: this.props.userid,
      sharedToken: this.generateRandomString(),
      history: [{ task: this.state.name + " was created by " + userInfos.username }]
    };
    let res = addBoard(boardInformation);
    if (res) {
      this.onDialogClose();
      this.props.updateLists();
    }
    else {
      this.setState({error: true})
    }
  }

  joinBoardWithToken() {
    let board = JSON.parse(getBoardWithToken(this.state.sharedToken));
    let res = JSON.parse(getUserById(this.props.userid, this.props.token));
    if (board && res && (board.authorId !== res.id) && !board.authorizedUsers.some((e) => {return e.username === res.username})) {
      let tmp_arr = [];
      let user = {
        username: res.username
      };
      tmp_arr.push(user);
      let authorizedUsers = _.concat(board.authorizedUsers, tmp_arr);
      const boardInformations = {
        name: board.name,
        authorizedUsers: authorizedUsers,
        isGlobal: true,
        authorId: board.userid,
        sharedToken: board.sharedToken,
        history: _.concat(board.history, { task: res.username + " joined the board" })
      };
      let joinBoard = editBoard(boardInformations, board.id);
      if (joinBoard) {
        this.onDialogClose();
        this.props.updateLists();
      }
    }
    else
      this.setState({isTokenInvalid: true});
  }

  onDialogOpen() {
    this.setState({isDialogOpen: true})
  }

  onDialogClose() {
    this.setState({
      isGlobal: false,
      authorizedUsers: [],
      isDialogOpen: false,
      isChecked: false,
      unknownUser: null,
      invalidUser: null,
      isTokenInvalid: false
    });
  }

  handleName(name) {
    this.setState({name: name});
  }

  handleGlobal() {
    this.setState({isGlobal: !this.state.isGlobal});
  }

  handleAddChip(chip) {
    if (JSON.parse(getUserById(this.props.userid, this.props.token)).username !== chip) {
      let res = getUserByUsername(chip);

      if (res) {
        let tmp_arr = [];
        let user = {
          username: chip
        };
        tmp_arr.push(user);
        this.setState({
          authorizedUsers: _.concat(this.state.authorizedUsers, tmp_arr),
          unknownUser: null,
          invalidUser: null
        });
      }
      else
        this.setState({unknownUser: chip});
    } else {
      this.setState({invalidUser: chip});
    }
  }

  handleDeleteChip(chip) {
    this.setState({authorizedUsers: _.remove(this.state.authorizedUsers, (n) => {
      return n.username !== chip;
    })});
  }

  handleSharedToken(token) {
    if (this.state.isTokenInvalid)
      this.setState({isTokenInvalid: false});
    this.setState({sharedToken: token});
  }

  render() {

    const styles = {
      addNewBoard: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "40px",
        color: "rgb(0, 188, 212)"
      },
      checkBoxStyle: {
        marginTop: "40px",
        marginBottom: "10px"
      },
      chipInputStyle: {
        width: "80%",
      },
      floatingButtonStyle: {
        boxShadow: "none"
      },
      dialogStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      },
      insideDialogStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }
    };

    const actions = [
      <FlatButton
        label="Create"
        primary={true}
        disabled={this.state.name === "" || this.state.name.length > 20 || (this.state.isGlobal ? this.state.authorizedUsers.length === 0 : false)}
        onTouchTap={() => this.onBoardCreate()} />,
      <FlatButton
        label="Join the board"
        onTouchTap={() => this.joinBoardWithToken()}
        disabled={this.state.sharedToken.length !== 12}
        primary={true} />
    ];

    return (
      <div style={styles.addNewBoard}>
        <h1>Boards</h1>
        <FloatingActionButton onTouchTap={() => this.onDialogOpen()} style={styles.floatingButtonStyle}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          bodyStyle={styles.dialogStyle}
          title="Add a board"
          actions={actions}
          open={this.state.isDialogOpen}
          onRequestClose={() => this.onDialogClose()}>
          <div style={styles.insideDialogStyle}>
            <div>
              Create a board<br/>
              <TextField
                type="text"
                hintText="Enter board's name"
                errorText={this.state.error ? "Fill with a name" : ""}
                onChange={(e) => this.handleName(e.target.value)} />
            </div>
            <div>
              Join a board<br/>
              <TextField
                type="text"
                hintText="Shared token"
                errorText={this.state.isTokenInvalid ? "Invalid token" : ""}
                onChange={(e) => this.handleSharedToken(e.target.value)}/>
            </div>
          </div>
          <SharedUsersComponent
            handleGlobal={this.handleGlobal}
            isGlobal={this.state.isGlobal}
            authorizedUsers={this.state.authorizedUsers}
            handleAddChip={this.handleAddChip}
            handleDeleteChip={this.handleDeleteChip}
            unknownUser={this.state.unknownUser}
            invalidUser={this.state.invalidUser} />
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (store, router) => {
  return {
    token: store.loginState.token,
    userid: store.loginState.userid,
    router: router
  }
};

export default connect(mapStateToProps)(DialogCreateBoardComponent);
