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
        width: "49%",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "flex-start",
        borderRight: this.props.longestList ? (this.props.title === "Shared boards" ? "1px solid #757575" : null) : null,
        borderLeft: this.props.longestList ? null : (this.props.title === "Shared boards" ? null : "1px solid #757575")
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
