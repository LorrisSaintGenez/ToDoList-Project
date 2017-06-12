import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { getUserById, getUserByUsername } from '../../actions/authentication.js';
import { editBoard, getBoardOwner } from '../../actions/board.js';

import SharedUsersComponent from './sharedUsersComponent.jsx';

class DialogEditBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.handleGlobal = this.handleGlobal.bind(this);
    this.handleAddChip = this.handleAddChip.bind(this);
    this.handleDeleteChip = this.handleDeleteChip.bind(this);

    this.state = {
      error: "",
      isDialogOpen: false,

      userId: this.props.userid,
      board: this.props.board,
      author: "",
      currentUser: "",
	  
      name: "",
      isGlobal: false,
      authorizedUsers: [],
      unknownUser: null,
      invalidUser: null
    };
  }

  componentWillMount() {
    this.setState({
      isGlobal: this.props.board.isGlobal,
      authorizedUsers: this.props.board.authorizedUsers,
      name: this.props.board.name
    });
    this.getBoardAuthor();
    this.getCurrentUser();
  }
  
  getBoardAuthor() {
    let res = getBoardOwner(this.state.board.id);
    if (res)
      this.setState({author: JSON.parse(res)[0].username});
  }
  
  getCurrentUser() {
	  let res = getUserById(this.props.userid, this.props.token);
	  if (res)
		  this.setState({currentUser: JSON.parse(res).username});
  }

  onBoardEdit() {
	  
    if (!this.state.isGlobal) {
      this.setState({authorizedUsers: _.remove(this.state.authorizedUsers, () => {
        return true;
      })});
    }

    let userInfos = JSON.parse(getUserById(this.props.userid, this.props.token));

    const boardInformation = {
      name: this.state.name,
      authorizedUsers: this.state.authorizedUsers,
      isGlobal: this.state.isGlobal,
      history: _.concat(this.state.board.history, { task: userInfos.username + " edited the board" })
    };
    let res = editBoard(boardInformation, this.props.board.id);
    if (res) {
      this.onDialogClose();
      this.props.onEditDialogOff();
      window.location.href = "#/list";
    }
    else {
      this.setState({error: true})
    }
  }

  onDialogClose() {
    this.setState({
      isGlobal: false,
      authorizedUsers: [],
      isDialogOpen: false,
      isChecked: false,
      unknownUser: null,
      invalidUser: null
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

  render() {

    const actions = [
      <FlatButton
        label="Edit"
        primary={true}
        disabled={this.state.name === "" || this.state.name.length > 20 || (this.state.isGlobal ? this.state.authorizedUsers.length === 0 : false)}
        onTouchTap={() => this.onBoardEdit()}
      />
    ];

    return (
      <Dialog
        title="Edit board"
        actions={actions}
        open={this.props.isEditDialogOn}
        onRequestClose={() => this.props.onEditDialogOff()}>
        <TextField
          defaultValue={this.state.name}
          type="text"
          hintText="Enter board's name"
          errorText={this.state.error ? "Fill with a name" : ""}
          onChange={(e) => this.handleName(e.target.value)} />
        {this.state.author === this.state.currentUser ? (
          <SharedUsersComponent
            handleGlobal={this.handleGlobal}
            isGlobal={this.state.isGlobal}
            authorizedUsers={this.state.authorizedUsers}
            handleAddChip={this.handleAddChip}
            handleDeleteChip={this.handleDeleteChip}
            unknownUser={this.state.unknownUser}
            invalidUser={this.state.invalidUser} />
        ) : null}
      </Dialog>
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

export default connect(mapStateToProps)(DialogEditBoardComponent);
