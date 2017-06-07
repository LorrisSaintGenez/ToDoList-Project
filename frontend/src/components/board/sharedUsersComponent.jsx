import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input';

class SharedUsersComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      checkBoxStyle: {
        marginTop: "40px",
        marginBottom: "10px"
      },
      chipInputStyle: {
        width: "80%",
      }
    };

    return (
      <div>
        <Checkbox
          defaultChecked={this.props.isGlobal}
          style={styles.checkBoxStyle}
          label="Share it"
          onCheck={() => this.props.handleGlobal()} />
        {this.props.isGlobal ? (
          <div>
            <ChipInput
              value={_.map(this.props.authorizedUsers, (user) => {
                return (user.username)
              })}
              hintText="List all authorized users"
              style={styles.chipInputStyle}
              onRequestAdd={(e) => this.props.handleAddChip(e)}
              onRequestDelete={(e) => this.props.handleDeleteChip(e)}>
              {_.map(this.props.authorizedUsers, (user, index) => {
                return (<Chip key={index}>{user.username}</Chip>)
              })}
            </ChipInput>
            {this.props.unknownUser !== null ? (
              <div>
                User not found : {this.props.unknownUser}
              </div>
            ) : null}
            {this.props.invalidUser !== null ? (
              <div>
                You can't add yourself : {this.props.invalidUser}
              </div>
            ) : null}
          </div>
        ) : null}
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

export default connect(mapStateToProps)(SharedUsersComponent);
