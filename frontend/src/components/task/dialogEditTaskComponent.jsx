import React, {Component} from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import { updateBoardItem } from '../../actions/boarditem.js';

class DialogEditBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      hasImage: false,
      imageUrl: null
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
      hasImage: this.props.item.imageUrl !== null
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
      this.setState({imageUrl: this.props.item.imageUrl});
    this.setState({hasImage: !this.state.hasImage});
  }

  onImageUrlHandler(url) {
    this.setState({imageUrl: url});
  }

  onDialogOff() {
    this.initValues();
    this.props.onDialogEditTaskOff();
  }

  onTaskEdit() {
    const taskInformation = {
      name: this.state.name,
      description: this.state.description,
      imageUrl: this.state.imageUrl !== null ? this.state.imageUrl : null
    };
    let res = updateBoardItem(this.props.item.id, taskInformation);
    if (res) {
      this.props.getBoardItems(this.props.boardId);
      this.props.onDialogEditTaskOff();
    }
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
          (this.state.hasImage &&
          (this.state.imageUrl === null || this.state.imageUrl === ""))}
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