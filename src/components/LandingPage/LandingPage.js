import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TemplateFunction from '../TemplateFunction/TemplateFunction'
import './LandingPage.css';

// CUSTOM COMPONENTS

class LandingPage extends Component {
  
  

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  

  render() {
    return (
      <div className="container">
        

        <div className="grid">
          <div className="grid-col grid-col_8">
        <h1> this is where users will go upon login!  </h1>
        </div>
          <div className="grid-col grid-col_4">

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
