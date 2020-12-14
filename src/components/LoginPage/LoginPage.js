import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import NewUserForm from '../NewUserForm/NewUserForm'

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />

        <center>
          <NewUserForm />
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
