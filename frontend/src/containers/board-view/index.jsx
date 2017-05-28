import React, {Component} from 'react';
import { connect } from 'react-redux';
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
    //this.getBoards();
  }

  /*getBoards() {
    let res = JSON.parse(getBoard(this.props.params.id));
    this.setState({board: res});
  }*/

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
        //justifyContent: "center",
        //alignItems: "center",
        width: "100%"
      }
    };

    if (this.props.token === null)
     this.props.router.router.push('/');

    console.log(this.state.board);
    return (
      <div style={styles.myListViewStyle}>
        <StatusBar />
        <div style={styles.newBoard}>
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
