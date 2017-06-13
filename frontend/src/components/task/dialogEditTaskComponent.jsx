import React, {Component} from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import _ from 'lodash';

import { updateBoardItem } from '../../actions/boarditem.js';
import { editBoard, getBoard } from '../../actions/board.js';
import { getUserById } from '../../actions/authentication.js';

class DialogEditBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      hasImage: false,
      hasVideo: false,
      imageUrl: null,
      videoUrl: null
    }
  }

  componentWillMount() {
    this.initValues();
  }

  initValues() {
    this.setState({
      name: this.props.item.name,
      description: this.props.item.description,
      imageUrl: this.props.item.imageUrl,
      videoUrl: this.props.item.videoUrl,
      hasImage: this.props.item.imageUrl !== null,
      hasVideo: this.props.item.videoUrl !== null
    });
  }

  onNameHandler(name) {
    this.setState({name: name});
  }

  onDescriptionHandler(description) {
    this.setState({description: description});
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

  onDialogOff() {
    this.initValues();
    this.props.onDialogEditTaskOff();
  }

  onTaskEdit() {
    const taskInformation = {
      name: this.state.name,
      description: this.state.description,
      imageUrl: this.state.hasImage ? this.state.imageUrl : null,
      videoUrl: this.state.videoUrl ? this.state.videoUrl.replace("watch?v=", "embed/") : null
    };
    let res = updateBoardItem(this.props.item.id, taskInformation);
    if (res) {
      this.props.getBoardItems(this.props.boardId);
      this.onBoardEdit();
      this.props.onDialogEditTaskOff();
    }
  }

  onBoardEdit() {
    let board = JSON.parse(getBoard(this.props.boardId));
    let userInfos = JSON.parse(getUserById(this.props.userid, this.props.token));

    const boardInformation = {
      name: board.name,
      authorizedUsers: board.authorizedUsers,
      isGlobal: board.isGlobal,
      history: _.concat(board.history, { task: userInfos.username + " edited the task : " + this.state.name })
    };
    editBoard(boardInformation, board.id);
  }

  render() {

    const styles = {
      checkBoxStyle: {
        marginTop: "40px",
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
        label="Edit task"
        onTouchTap={() => this.onTaskEdit()}
        primary={true}/>
    ];

    return (
      <Dialog
        title="Edit task"
        actions={actions}
        open={this.props.isDialogOpen}
        onRequestClose={() => this.onDialogOff()}>
        <TextField
          defaultValue={this.state.name}
          type="text"
          onChange={(e) => this.onNameHandler(e.target.value)}
          hintText="Name of the task" />
        <br/>
        <TextField
          fullWidth={true}
          defaultValue={this.state.description}
          type="text"
          onChange={(e) => this.onDescriptionHandler(e.target.value)}
          hintText="Description" />
        <Checkbox
          style={styles.checkBoxStyle}
          defaultChecked={this.state.hasImage}
          onCheck={() => this.onImageHandler()}
          label="Add image" />
        {this.state.hasImage ? (
          <TextField
            type="text"
            hintText="Image's url"
            defaultValue={this.state.imageUrl}
            onChange={(e) => this.onImageUrlHandler(e.target.value)} />
        ) : null}
        <Checkbox
          defaultChecked={this.state.hasVideo}
          style={styles.checkBoxStyle}
          onCheck={() => this.onVideoHandler()}
          label="Add video" />
        {this.state.hasVideo ? (
          <TextField
            type="text"
            hintText="Video's url"
            defaultValue={this.state.videoUrl}
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

export default connect(mapStateToProps)(DialogEditBoardComponent);