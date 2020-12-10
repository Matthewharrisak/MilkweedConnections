import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class AdminPartPage extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <h1> This Page will be for ADMIN view of the participants table feauturing all participants</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPartPage);
