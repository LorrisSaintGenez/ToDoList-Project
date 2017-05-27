import React, {Component} from 'react';
import { connect } from 'react-redux';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import _ from 'lodash';

class BoardComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      displayListStyle: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "flex-start",
        //justifyContent: "center",
        width: "100%",
        margin: "30px"
      },
      eachListStyle: {
        margin: "0px 25px 50px 25px",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#ffffff",
        color: "rgb(0, 188, 212)",
        width: "300px",
        textAlign: "center",
        height: "100%"
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
        margin: "5px"
      },
      textColor: {
        color: "#5f5f5f"
      }
    };

    return (
      <div style={styles.displayListStyle}>
        {_.map(this.props.userLists, (list, index) => {
          return (
            <div key={index} style={styles.eachListStyle}>
              <h2>{list.name}</h2>
              {list.authorizedUsers.length > 0 ?
                (<div>
                  <h3 style={styles.textColor}>shared with : </h3>
                  <div style={styles.authorizedUsersStyle}>
                  {_.map(list.authorizedUsers, (user, i) => {
                    return (
                      <Chip key={i} style={styles.chipStyle}>
                        <Avatar size={32}>{(user[0].toUpperCase())}</Avatar>
                        {user}
                      </Chip>
                    )
                  })}
                  </div>
                </div>)
                : <h3 style={styles.textColor}>personnal board</h3>}
            </div>
          )})}
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

export default connect(mapStateToProps)(BoardComponent);
