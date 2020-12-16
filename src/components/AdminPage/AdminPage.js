import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import WaitlistPart from '../WaitlistPart/WaitlistPart';
import PartDisplay from '../PartDisplay/PartDisplay';
import ProvDisplay from '../ProvDisplay/ProvDisplay';
import AdminTabBar from '../AdminTabBar/AdminTabBar';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class AdminPage extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <AdminTabBar/>
      
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
