import React, {Component} from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import { addBoardItem } from '../../actions/boarditem.js';
import { editBoard, getBoard } from '../../actions/board.js';
import { getUserById } from '../../actions/authentication.js';

import _ from 'lodash';

class DialogCreateTaskComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      isDone: false,
      hasImage: false,
      hasVideo: false,
      imageUrl: null,
      videoUrl: null
    };
  }

  initValues() {
    this.setState({
      name: "",
      description: "",
      isDone: false,
      hasImage: false,
      hasVideo: false,
      imageUrl: null,
      videoUrl: null
    });
  }

  onTaskCreate() {
    const itemInformations = {
      name: this.state.name,
      description: this.state.description,
      isDone: this.state.isDone,
      authorId: this.props.userid,
      boardId: this.props.board.id,
      imageUrl: this.state.imageUrl,
      videoUrl: this.state.videoUrl ? this.state.videoUrl.replace("watch?v=", "embed/") : null
    };
    let res = addBoardItem(itemInformations);
    if (res) {
      this.props.getBoardItems(this.props.board.id);
      this.onBoardEdit();
      this.onDialogClose();
    }
  }

  onBoardEdit() {
    let board = JSON.parse(getBoard(this.props.board.id));
    let userInfos = JSON.parse(getUserById(this.props.userid, this.props.token));

    const boardInformation = {
      name: board.name,
      authorizedUsers: board.authorizedUsers,
      isGlobal: board.isGlobal,
      history: _.concat(board.history, { task: userInfos.username + " added the task : " + this.state.name })
    };
    editBoard(boardInformation, board.id);
  }

  onDialogClose() {
    this.initValues();
    this.props.onDialogClose();
  }

  onNameHandler(name) {
    this.setState({name: name});
  }

  onDescriptionHandler(description) {
    this.setState({description: description});
  }

  onDoneHandler() {
    this.setState({isDone: !this.state.isDone});
  }

  onImageHandler() {
    if (this.state.hasImage)
      this.setState({imageUrl: null});
    this.setState({videoUrl: null});
    this.setState({hasVideo: false});
    this.setState({hasImage: !this.state.hasImage});
  }

  onVideoHandler() {
    if (this.state.hasVideo)
      this.setState({videoUrl: null});
    this.setState({imageUrl: null});
    this.setState({hasImage: false});
    this.setState({hasVideo: !this.state.hasVideo});
  }

  onImageUrlHandler(url) {
    this.setState({imageUrl: url});
  }

  onVideoUrlHandler(url) {
    this.setState({videoUrl: url});
  }

  render() {

    const styles = {
      checkBoxStyle: {
        marginTop: "20px",
        marginBottom: "10px"
      }
    };

    const actions = [
      <FlatButton
        disabled={
          this.state.name === "" ||
          this.state.name.length > 40 ||
          (this.state.hasImage && (this.state.imageUrl === null || this.state.imageUrl === "")) ||
          (this.state.hasVideo && (this.state.videoUrl === null || this.state.videoUrl === ""))}
        label="Add task"
        onTouchTap={() => this.onTaskCreate()}
        primary={true}/>
    ];

    return (
      <Dialog
        title="New task"
        actions={actions}
        open={this.props.isDialogOpen}
        onRequestClose={() => this.onDialogClose()}>
        <TextField
          type="text"
          onChange={(e) => this.onNameHandler(e.target.value)}
          hintText="Name of the task" />
        <br/>
        <TextField
          fullWidth={true}
          type="text"
          onChange={(e) => this.onDescriptionHandler(e.target.value)}
          hintText="Description" />
        <Checkbox
          style={styles.checkBoxStyle}
          onCheck={() => this.onDoneHandler()}
          label="Done" />
        <Checkbox
          checked={this.state.hasImage}
          style={styles.checkBoxStyle}
          onCheck={() => this.onImageHandler()}
          label="Add image" />
        {this.state.hasImage ? (
          <TextField
            type="text"
            hintText="Image's url"
            onChange={(e) => this.onImageUrlHandler(e.target.value)} />
        ) : null}
        <Checkbox
          checked={this.state.hasVideo}
          style={styles.checkBoxStyle}
          onCheck={() => this.onVideoHandler()}
          label="Add video" />
        {this.state.hasVideo ? (
          <TextField
            type="text"
            hintText="Video's url"
            onChange={(e) => this.onVideoUrlHandler(e.target.value)} />
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

export default connect(mapStateToProps)(DialogCreateTaskComponent);
