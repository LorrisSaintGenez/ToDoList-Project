import React, {Component} from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Face from 'material-ui/svg-icons/action/face';

import _ from 'lodash';

class SingleBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  goToBoardId(id) {
    window.location.href = "#/list/" + id;
  }

  hoverOn() {
    this.setState({hover: true});
  }

  hoverOff() {
    this.setState({hover: false});
  }

  render() {

    const styles = {
      eachListStyle: {
        margin: "0px 25px 50px 25px",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#ffffff",
        color: "rgb(0, 188, 212)",
        width: "250px",
        textAlign: "center",
        height: "100%",
        cursor: "pointer",
        overflowX: "hidden"
      },
      authorizedStyle: {
        display: "flex",
        flexDirection: "column"
      },
      authorizedUsersStyle: {
        display: "flex",
        flexDirection: "row",
        overflowX: "auto"
      },
      chipStyle: {
        margin: "0px 0px 5px 0px",
        backgroundColor: "rgb(224, 224, 224)"
      },
      textColor: {
        color: "#5f5f5f"
      },
      listStyle: {
        textAlign: "-webkit-auto"
      }
    };

    const list = this.props.list;

    return (
      <div
        style={styles.eachListStyle}
        onClick={() => this.goToBoardId(list.id)}
        onMouseOver={() => this.hoverOn()}
        onMouseOut={() => this.hoverOff()}>
        <h2>{list.name}</h2>
        <Divider/>
        {list.authorizedUsers.length > 0 ?
          (<div>
            <h3 style={styles.textColor}>Shared with :</h3>
            <List style={styles.listStyle}>
            {_.map(list.authorizedUsers, (user, i) => {
              return (
                <ListItem
                  primaryText={user}
                  key={i}
                  leftIcon={<Face />}
                />)
            })}
            </List>
          </div>)
          : <h3 style={styles.textColor}>Personnal board</h3>}
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

export default connect(mapStateToProps)(SingleBoardComponent);
