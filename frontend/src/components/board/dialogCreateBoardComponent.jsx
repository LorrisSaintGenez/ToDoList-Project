import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input';

import { getUserById, getUserByUsername } from '../../actions/authentication.js';
import { addBoard } from '../../actions/board.js';

class DialogCreateBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isDialogOpen: false,

      name: "",
      isGlobal: false,
      authorizedUsers: [],
      unknownUser: null,
      invalidUser: null
    };
  }

  onBoardCreate() {
    const boardInformation = {
      name: this.state.name,
      authorizedUsers: this.state.authorizedUsers,
      isGlobal: this.state.isGlobal,
      authorId: this.props.userid
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
      }
    };

    const actions = [
      <FlatButton
        label="Create"
        primary={true}
        disabled={this.state.name === "" || this.state.name.length > 20 || (this.state.isGlobal ? this.state.authorizedUsers.length === 0 : false)}
        onTouchTap={() => this.onBoardCreate()}
      />
    ];

    return (
      <div style={styles.addNewBoard}>
        <h1>Boards</h1>
        <FloatingActionButton onTouchTap={() => this.onDialogOpen()} style={styles.floatingButtonStyle}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="New board"
          actions={actions}
          open={this.state.isDialogOpen}
          onRequestClose={() => this.onDialogClose()}>
          <TextField
            type="text"
            hintText="Enter board's name"
            errorText={this.state.error ? "Fill with a name" : ""}
            onChange={(e) => this.handleName(e.target.value)} />
          <Checkbox
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

export default connect(mapStateToProps)(DialogCreateBoardComponent);
