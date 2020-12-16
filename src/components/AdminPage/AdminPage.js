import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AdminTabBar from '../AdminTabBar/AdminTabBar';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class AdminPage extends Component {
 

  render() {
    return (
      <div>
        <AdminTabBar/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
