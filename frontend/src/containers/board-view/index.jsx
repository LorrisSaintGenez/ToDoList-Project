import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import StatusBar from "../common/statusBar.jsx";
import UnitBoardComponent from '../../components/board/unitBoardComponent.jsx';

import { getBoard } from '../../actions/board.js';

class BoardView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      board: []
    };
  }

  componentWillMount() {
    let res = JSON.parse(getBoard(this.props.params.id));
    this.setState({board: res});
  }

  backToBoards() {
    window.location.href = "#/list";
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
        alignItems: "flex-start"
      },
      buttonStyle: {
        margin: "30px 0px 0px 30px"
      }
    };

    if (this.props.token === null)
     this.props.router.router.push('/');

    console.log(this.state.board);
    return (
      <div style={styles.myListViewStyle}>
        <StatusBar />
        <div style={styles.newBoard}>
          <FlatButton
            style={styles.buttonStyle}
            primary={true}
            label="< Back to boards"
            onClick={() => this.backToBoards()}/>
          <UnitBoardComponent board={this.state.board} />
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

export default connect(mapStateToProps)(BoardView);
