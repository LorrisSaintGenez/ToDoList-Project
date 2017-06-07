import React, {Component} from 'react';
import { connect } from 'react-redux';
import StatusBar from "../common/statusBar.jsx";
import { getUserById } from "../../actions/authentication.js";
import { getBoardByOwnerId, getBoardSharedWithUser } from "../../actions/board.js";

class ProfileView extends Component {

  constructor(props) {
    super(props);
	
	this.state = {
		username: "",
		email: "",
		nbAuthoredBoard: 0,
		nbPersonalBoard: 0,
		nbSharedBoard:0
	};
  }
  
  componentWillMount() {
	this.getBoards();
  }
  
  getUserInfo() {
   
  }
  
  getBoards() {
	let user = getUserById(this.props.userid, this.props.token);
    if (user) {
	   let name = JSON.parse(user).username;
	   let mail = JSON.parse(user).email;
	   this.setState({email: mail});
       this.setState({username: name});
	   
	   let author = getBoardByOwnerId(this.props.userid);
	   if (author) {
	     let tab = JSON.parse(author);
	     let own = tab.filter((elt) => elt.authorizedUsers.length > 0);
	     let perso = tab.filter((elt) => elt.authorizedUsers.length == 0);
	   
	     this.setState({nbAuthoredBoard: own.length});
	     this.setState({nbPersonalBoard: perso.length});
	
	   }
	   console.log("name :");
	   console.log(name);
	   let shared = getBoardSharedWithUser(name);
	   if (shared) {
		 this.setState({nbSharedBoard: JSON.parse(shared).length});
	   }
	} 
  }

  render() {

    const styles = {
      profileView: {
        left: "0px",
        top: "0px",
        position: "absolute",
        width: "100%"
      },
	  infoView: {
		left: "20px",
        position: "relative",
        width: "100%"
	  }
    };

    if (this.props.token === null)
      window.location.href = "#/";

    return (
      <div style={styles.profileView}>
        <StatusBar dispatch={this.props.dispatch}/>
		<div style={styles.infoView}>
			<h1>Profile page</h1>
			<h4>username : {this.state.username}</h4>
			<h4>email : {this.state.email}</h4>
			<h4>Shared boards you own : {this.state.nbAuthoredBoard}</h4>
			<h4>Shared boards you contribute to : {this.state.nbSharedBoard}</h4>
			<h4>Personal boards : {this.state.nbPersonalBoard}</h4>
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

export default connect(mapStateToProps)(ProfileView);