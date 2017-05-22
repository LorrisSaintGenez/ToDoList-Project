import React, {Component} from 'react';
import { connect } from 'react-redux';
import StatusBar from "../common/statusBar.jsx";

import _ from 'lodash';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ChipInput from 'material-ui-chip-input';

import { addBoard, getBoardByOwnerId } from '../../actions/board.js';

class MyListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isDialogOpen: false,

      name: "",
      isGlobal: false,
      authorizedUsers: [],

      userLists: []
    };
  }

  componentDidMount() {
    this.getUserBoards();
  }

  onBoardCreate() {
    const boardInformation = {
      name: this.state.name,
      authorizedUsers: this.state.authorizedUsers,
      isGlobal: this.state.isGlobal,
      userid: this.props.userid
    };
    let res = addBoard(boardInformation);
    if (res)
      this.onDialogClose();
    else {
      this.setState({error: true})
    }
  }

  getUserBoards() {
    let res = JSON.parse(getBoardByOwnerId(this.props.userid));
    this.setState({userLists: res});
  }

  onDialogOpen() {
    this.setState({isDialogOpen: true})
  }

  onDialogClose() {
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
        position: "fixed",
        width: "100%",
        height: "80%"
      },
      addNewBoard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#ffffff",
        padding: "20px 30px",
        color: "rgb(0, 188, 212)"
      },
      checkBoxStyle: {
        marginTop: "40px",
        marginBottom: "10px"
      },
      chipInputStyle: {
        width: "80%",
      },
      displayListStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        marginLeft: "100px"
      },
      eachListStyle: {
        marginRight: "50px",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#ffffff",
        color: "rgb(0, 188, 212)"
      }
    };

    if (this.props.token === null)
     this.props.router.router.push('/');

    const actions = [
      <FlatButton
        label="Create"
        primary={true}
        onTouchTap={() => this.onBoardCreate()}
      />
    ];

    return (
      <div style={styles.myListViewStyle}>
        <StatusBar dispatch={this.props.dispatch}/>
        <div style={styles.newBoard}>
          <div style={styles.addNewBoard}>
            <FloatingActionButton onTouchTap={() => this.onDialogOpen()}>
              <ContentAdd />
            </FloatingActionButton>
            <h3>Create a new board</h3>
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
          <div style={styles.displayListStyle}>
          {_.map(this.state.userLists, (list) => {
            return (
              <div style={styles.eachListStyle}>
                <h2>{list.name}</h2>
                {list.authorizedUsers.length > 0 ?
                  (<div>
                      <h3>Authorized persons : </h3>
                      {_.map(list.authorizedUsers, (user) => {
                        return (
                          <div>
                            <span>{user}</span>
                          </div>
                        )
                      })}
                    </div>)
                : null}
              </div>
            )})}
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