import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NewUserForm from '../NewUserForm/NewUserForm'

// this component will display Providers list of participants
class UserPage extends Component {

  render() {
    return (
      <div>
        <h1 id="welcome">Milkweed Connect {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
