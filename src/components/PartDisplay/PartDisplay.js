import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class PartDisplay extends Component {
  state = {
    heading: 'Class Component',
  };

  componentDidMount = () => {
    this.props.dispatch({ type: 'GET_PART'});
  }

  render() {
    return (
      <div>
        <h2>this is where we'll display the participants table for admins</h2>
        {JSON.stringify(this.props.store.participants)}
        
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PartDisplay);
