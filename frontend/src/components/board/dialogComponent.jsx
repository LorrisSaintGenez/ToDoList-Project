import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ChipInput from 'material-ui-chip-input';

import { addBoard } from '../../actions/board.js';

class DialogComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isDialogOpen: false,

      name: "",
      isGlobal: false,
      authorizedUsers: []
    };
  }

  onBoardCreate() {
    const boardInformation = {
      name: this.state.name,
      authorizedUsers: this.state.authorizedUsers,
      isGlobal: this.state.isGlobal,
      userid: this.props.userid
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
    this.setState({isGlobal: false});
    this.setState({authorizedUsers: []});
    this.setState({isDialogOpen: false})
    this.setState({isChecked: false});
  }

  handleName(name) {
    this.setState({name: name});
  }

  handleGlobal() {
    this.setState({isGlobal: !this.state.isGlobal});
  }

  handleAddChip(chip) {
    this.setState({authorizedUsers: _.concat(this.state.authorizedUsers, chip)});
  }

  handleDeleteChip(chip) {
    this.setState({authorizedUsers: _.remove(this.state.authorizedUsers, (n) => {
      return n !== chip;
    })});
  }

  render() {

    const styles = {
      addNewBoard: {
        display: "flex",
        flexDirection: "column",
        //justifyContent: "left",
        //alignItems: "center",
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
            <ChipInput
              value={this.state.authorizedUsers}
              hintText="List all authorized users"
              style={styles.chipInputStyle}
              onRequestAdd={(e) => this.handleAddChip(e)}
              onRequestDelete={(e) => this.handleDeleteChip(e)} />
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

export default connect(mapStateToProps)(DialogComponent);
