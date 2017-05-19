import React, {Component} from 'react';
import { Link } from 'react-router';

import StatusBar from '../common/statusBar.jsx';
import { connect } from 'react-redux';

class HomeView extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const styles = {
      homeView: {
        left: "0px",
        top: "0px",
        position: "absolute",
        width: "100%"
      }
    };

    return (
      <div style={styles.homeView}>
        <StatusBar dispatch={this.props.dispatch}/>
        Bienvenue sur la ToDoList Collaborative !
        <br/>
        {this.props.token !== null ? (
          <Link to='/profil'>
            <button>Aller sur la page profil</button>
          </Link>
        )
          : (
             <span>You need to be logged to access the website</span>
          )}
      </div>
    );1
  }
}

const mapStateToProps = (store, router) => {
  return {
    token: store.token,
    router: router
  }
};

export default connect(mapStateToProps)(HomeView);