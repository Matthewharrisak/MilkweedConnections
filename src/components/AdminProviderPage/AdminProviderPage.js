import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// this component isn't doing anything right now

class ProviderPage extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <h1> this page will be for ADMIN view of the Provider Table</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProviderPage);
