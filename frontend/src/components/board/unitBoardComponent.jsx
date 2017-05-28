import React, {Component} from 'react';
import { connect } from 'react-redux';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import _ from 'lodash';

class UnitBoardComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      displayItems: {
        display: "flex",
        flexFlow: "column",
        width: "100%",
        margin: "10px"
      },
      listStyle: {
        margin: "30px",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#ffffff",
        color: "rgb(0, 188, 212)",
        width: "95%",
        height: "100%"
      },
      authorizedUsersStyle: {
        display: "flex",
        flexDirection: "row",
        overflowX: "auto"
      },
      chipStyle: {
        margin: "5px"
      },
      textStyle: {
        color: "#5f5f5f",
        margin: "5px"
      },
      listTitle: {
        margin: "5px"
      }
    };

    const board = this.props.board;

    return (
      <div style={styles.listStyle}>
        <h1 style={styles.listTitle}>{board.name}</h1>
        {board.authorizedUsers.length > 0 ?
          (<div>
            <h3 style={styles.textStyle}>shared with : </h3>
            <div style={styles.authorizedUsersStyle}>
            {_.map(board.authorizedUsers, (user, i) => {
              return (
                <Chip key={i} style={styles.chipStyle}>
                  <Avatar size={32}>{(user[0].toUpperCase())}</Avatar>
                  {user}
                </Chip>
              )
            })}
            </div>
          </div>)
          : <h3 style={styles.textStyle}>personnal board</h3>}
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

export default connect(mapStateToProps)(UnitBoardComponent);
