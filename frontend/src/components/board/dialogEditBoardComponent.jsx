import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input';

import { getUserById, getUserByUsername } from '../../actions/authentication.js';
import { editBoard, getBoardOwner } from '../../actions/board.js';

class DialogEditBoardComponent extends Component {

  constructor(props) {
    super(props);

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
	  
	if (this.state.isGlobal === false) {
		console.log("auteur");
		console.log(this.state.author);
		console.log("user");
		console.log(this.state.currentUser);
		if (this.state.author === this.state.currentUser) {
			authorizedUsers: _.remove(this.state.authorizedUsers, (n) => {
				return true;
			});
		}
		else {
			authorizedUsers: _.remove(this.state.authorizedUsers, (n) => {
				return n.username === this.state.currentUser;
			});
		}
		
	}
	
    const boardInformation = {
      name: this.state.name,
      authorizedUsers: this.state.authorizedUsers,
      isGlobal: this.state.isGlobal
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

    const styles = {
      checkBoxStyle: {
        marginTop: "40px",
        marginBottom: "10px"
      },
      chipInputStyle: {
        width: "80%",
      },
      floatingButtonStyle: {
        boxShadow: "none"
      }
    };

    const actions = [
      <FlatButton
        label="Edit"
        primary={true}
        disabled={this.state.name === "" || this.state.name.length > 20 || (this.state.isGlobal ? this.state.authorizedUsers.length === 0 : false)}
        onTouchTap={() => this.onBoardEdit()}
      />
    ];

    console.log(this.state.authorizedUsers);

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
        <Checkbox
          defaultChecked={this.state.isGlobal}
          style={styles.checkBoxStyle}
          label="Share it"
          onCheck={() => this.handleGlobal()} />
        {this.state.isGlobal ? (
          <div>
            <ChipInput
              value={_.map(this.state.authorizedUsers, (user) => {
                return (user.username)
              })}
              hintText="List all authorized users"
              style={styles.chipInputStyle}
              onRequestAdd={(e) => this.handleAddChip(e)}
              onRequestDelete={(e) => this.handleDeleteChip(e)}>
              {_.map(this.state.authorizedUsers, (user, index) => {
                return (<Chip key={index}>{user.username}</Chip>)
              })}
            </ChipInput>
            {this.state.unknownUser !== null ? (
              <div>
                User not found : {this.state.unknownUser}
              </div>
            ) : null}
            {this.state.invalidUser !== null ? (
              <div>
                You can't add yourself : {this.state.invalidUser}
              </div>
            ) : null}
          </div>
        ) : null}
      </Dialog>
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

export default connect(mapStateToProps)(DialogEditBoardComponent);
