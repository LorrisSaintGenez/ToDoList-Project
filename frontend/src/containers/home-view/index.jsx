import React, {Component} from 'react';
import { Link } from 'react-router';

import StatusBar from '../common/statusBar.jsx';

export default class HomeView extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <StatusBar/>
        Bienvenue sur la ToDoList Collaborative !
        <br/>
        <Link to='/profil'>
          <button>Aller sur la page profil</button>
        </Link>
      </div>
    );
  }
}