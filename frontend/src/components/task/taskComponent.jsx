import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Bookmark from 'material-ui/svg-icons/action/bookmark.js';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border.js';

import DialogEditBoardComponent from './dialogEditTaskComponent.jsx';

import { deleteBoardItem, updateBoardItem } from '../../actions/boarditem.js';

class TaskComponent extends Component {

  constructor(props) {
    super(props);

    this.onDialogEditTaskOff = this.onDialogEditTaskOff.bind(this);

    this.state = {
      isDialogOpen: false,
      name: "",
      description: "",
      hasImage: false,
      imageUrl: null,
      isDone: false
    }
  }

  componentWillMount() {
    this.setState({
      name: this.props.item.name,
      description: this.props.item.description,
      imageUrl: this.props.item.imageUrl,
      hasImage: this.props.item.imageUrl !== null,
      isDone: this.props.item.isDone
    });
  }

  onDeleteTask() {
    let res = deleteBoardItem(this.props.item.id);
    if (res)
      this.props.getBoardItems(this.props.boardId);
  }

  handleDone() {
    const taskInformation = {
      isDone: !this.props.item.isDone
    };
    let res = updateBoardItem(this.props.item.id, taskInformation);
    if (res)
      this.props.getBoardItems(this.props.boardId);
  }

  onDialogEditTaskOn() {
    this.setState({isDialogOpen: true});
  }

  onDialogEditTaskOff() {
    this.setState({
      name: this.props.item.name,
      description: this.props.item.description,
      imageUrl: this.props.item.imageUrl,
      hasImage: this.props.item.imageUrl !== null,
      isDone: this.props.item.isDone,
      isDialogOpen: false
    });
  }

  render() {

    const styles = {
      bookmarkStyle: {
        float: "right",
        cursor: "pointer"
      }
    };

    if (this.props.token === null)
      this.props.router.router.push('/');

    return (
      <Card>
        <CardHeader title="Author">
          {this.props.item.isDone ?
            <Bookmark style={styles.bookmarkStyle} onClick={() => this.handleDone()}/>
            : <BookmarkBorder style={styles.bookmarkStyle} onClick={() => this.handleDone()}/>
          }
        </CardHeader>
        {this.props.item.imageUrl !== null ? (
          <CardMedia>
            <img src={this.props.item.imageUrl} />
          </CardMedia>
        ) : null}
        <CardTitle title={this.props.item.name} />
        <CardText>
          {this.props.item.description}
        </CardText>
        <CardActions>
          <FlatButton
            label={this.props.item.isDone ? "Undone" : "Done"}
            onTouchTap={() => this.handleDone()}/>
          <FlatButton
            onTouchTap={() => this.onDialogEditTaskOn()}
            label="Edit" />
          <FlatButton
            onTouchTap={() => this.onDeleteTask()}
            secondary={true}
            label="Delete" />
        </CardActions>
        <DialogEditBoardComponent
          item={this.props.item}
          isDialogOpen={this.state.isDialogOpen}
          onDialogEditTaskOff={this.onDialogEditTaskOff}
          getBoardItems={this.props.getBoardItems}
          boardId={this.props.boardId}
        />
      </Card>
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

export default connect(mapStateToProps)(TaskComponent);