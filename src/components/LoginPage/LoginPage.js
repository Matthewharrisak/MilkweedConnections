import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import NewUserForm from '../NewUserForm/NewUserForm'
import MultiStepForm from '../NewUserForm/MultiForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />

        <center>
          <MultiStepForm />
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
