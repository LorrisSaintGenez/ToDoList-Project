import React, {Component} from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

class BoardOptionsComponent extends Component {

  constructor(props) {
    super(props);
  }

  backToBoards() {
    window.location.href = "#/list";
  }

  render() {

    const styles = {
      buttonList: {
        display: "flex",
        flexFlow: "row wrap",
        width: "100%"
      },
      buttonStyle: {
        margin: "30px 0px 0px 30px"
      }
    };

    return (
      <div style={styles.buttonList}>
        <FlatButton
          style={styles.buttonStyle}
          label="< Back to boards"
          onClick={() => this.backToBoards()} />
        <FlatButton
          style={styles.buttonStyle}
          primary={true}
          label="Add new task"
          onTouchTap={() => this.props.onDialogOpen()} />
        <FlatButton
          style={styles.buttonStyle}
          primary={true}
          label="Share this board"
          onTouchTap={() => this.props.onShareDialogOn()} />
        {this.props.currentUser === this.props.author ? (
          <div>
            <FlatButton
              style={styles.buttonStyle}
              primary={true}
              label="Edit this board"
              onTouchTap={() => this.props.onEditDialogOn()} />
            <FlatButton
              style={styles.buttonStyle}
              secondary={true}
              label="Delete this board"
              onTouchTap={() => this.props.onDeleteDialogOn()} />
          </div>
        ): null}
      </div>
    );
  }
}

export default BoardOptionsComponent;
