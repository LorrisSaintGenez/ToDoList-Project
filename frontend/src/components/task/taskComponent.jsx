import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Bookmark from 'material-ui/svg-icons/action/bookmark.js';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border.js';
import PersonIcon from 'material-ui/svg-icons/social/person.js'

import DialogEditBoardComponent from './dialogEditTaskComponent.jsx';

import { deleteBoardItem, updateBoardItem, getTaskAuthor } from '../../actions/boarditem.js';

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
      isDone: false,
      author: ""
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
    this.getTaskAuthor();
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

  getTaskAuthor() {
    let res = getTaskAuthor(this.props.item.id);
    if (res !== null) {
      this.setState({author: JSON.parse(res)[0].username});
    }
  }

  render() {

    const styles = {
      bookmarkStyle: {
        float: "right",
        cursor: "pointer"
      },
      authorStyle: {
        marginTop: "3px"
      },
      cardStyle: {
        margin: "10px"
      }
    };

    if (this.props.token === null)
      window.location.href = "#/";

    return (
      <Card style={styles.cardStyle}>
        <CardHeader title={this.state.author} titleStyle={styles.authorStyle} avatar={<PersonIcon/>}>
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
    token: store.loginState.token,
    userid: store.loginState.userid,
    router: router
  }
};

export default connect(mapStateToProps)(TaskComponent);
