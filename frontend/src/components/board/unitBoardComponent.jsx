import React, {Component} from 'react';
import { connect } from 'react-redux';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import StarIcon from 'material-ui/svg-icons/action/stars.js'
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue200, indigo700} from 'material-ui/styles/colors';

import _ from 'lodash';

import { getBoardOwner } from '../../actions/board.js';

import TaskComponent from '../task/taskComponent.jsx';

class UnitBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: "",
      board: this.props.board
    };
  }

  componentWillMount() {
    this.getBoardAuthor();
  }

  getBoardAuthor() {
    let res = getBoardOwner(this.state.board.id);
    if (res)
      this.setState({author: JSON.parse(res)[0].username});
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
        backgroundColor: "#f9f9f9",
        color: "rgb(0, 188, 212)",
        width: "50%",
        height: "100%"
      },
      authorizedUsersStyle: {
        display: "flex",
        flexFlow: "row wrap",
        overflowX: "auto",
        marginLeft: "5px"
      },
      chipStyle: {
        margin: "5px"
      },
      textStyle: {
        color: "#5f5f5f",
        margin: "5px",
        textAlign: "center"
      },
      listTitle: {
        textAlign: "center",
        margin: "0",
        color: "#42A5F5"
      },
      titleBox: {
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#ffffff"
      },
      iconStyle: {
        fill: "#ffeb3b",
        marginTop: "14px",
        marginLeft: "5px",
        width: "30px",
        height: "30px"
      },
      authorNameStyle: {
        color: "#5f5f5f",
        marginLeft: "5px"
      },
      authorBox: {
        display: "flex",
        flexFlow: "row"
      }
    };

    return (
      <div style={styles.listStyle}>
        <div style={styles.titleBox}>
          <h1 style={styles.listTitle}>{this.state.board.name}</h1>
        </div>
        {this.state.board.authorizedUsers.length > 0 ?
          (<div>
            <div style={styles.authorBox}>
              <StarIcon style={styles.iconStyle}/>
              <h3 style={styles.authorNameStyle}>{this.state.author}</h3>
            </div>
            <div style={styles.authorizedUsersStyle}>
            {_.map(this.state.board.authorizedUsers, (user, i) => {
              return (
                <Chip key={i} style={styles.chipStyle} backgroundColor={blue200}>
                  <Avatar color="#FFF" icon={<SvgIconFace />} backgroundColor={indigo700} />
                  {user}
                </Chip>
              )
            })}
            </div>
          </div>)
          : <h3 style={styles.textStyle}>Personal board</h3>}
        {_.map(this.props.boardItems, (item, index) => {
          return (
            <TaskComponent
              getBoardItems={this.props.getBoardItems}
              boardId={this.state.board.id}
              item={item}
              key={index} />
          )
        })}
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
