import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import SingleBoardComponent from './singleBoardComponent.jsx';

class BoardComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      divListStyle: {
        width: "45%",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "flex-start",
        border: "solid 1px #dddce1",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.13)",
        backgroundColor: "#f9f9f9",
        margin: "30px"
      },
      eachTypeListStyle: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "flex-start"
      },
      titleStyle: {
        marginLeft: "27px",
        fontSize: "xx-large"
      }
    };

    return (
      <div style={styles.divListStyle}>
        <h3 style={styles.titleStyle}>{this.props.title}</h3>
        <div style={styles.eachTypeListStyle}>
        {_.map(this.props.list, (listItem, index) => {
          return (
            <SingleBoardComponent list={listItem} key={index} />
          );
        })}
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

export default connect(mapStateToProps)(BoardComponent);
