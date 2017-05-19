import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import StatusBar from "../common/statusBar.jsx";

class ProfilView extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const styles = {
      profilView: {
        left: "0px",
        top: "0px",
        position: "absolute",
        width: "100%"
      }
    }

    if (this.props.token === null)
      this.props.router.router.push('/');

    return (
      <div style={styles.profilView}>
        <StatusBar dispatch={this.props.dispatch}/>
        Bienvenue sur la page profil !
        <br/>
        <Link to='/'>
            <button>Retour au menu principal</button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (store, router) => {
  return {
    token: store.token,
    router: router
  }
};

export default connect(mapStateToProps)(ProfilView);