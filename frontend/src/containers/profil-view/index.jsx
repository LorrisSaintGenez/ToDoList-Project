import React, {Component} from 'react';
import { Link } from 'react-router';

export default class ProfilView extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Bienvenue sur la page profil !
        <br/>
        <Link to='/'>
            <button>Retour au menu principal</button>
        </Link>
      </div>
    );
  }
}