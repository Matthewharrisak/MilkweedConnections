import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class ProvDisplay extends Component {
  state = {
    heading: 'Class Component',
  };

  componentDidMount = () => {
    this.props.dispatch({ type: 'GET_PROV'});
  }

  render() {
    return (
      <div>
        <h2>This is where we'll display all providers for the Admin view</h2>
        {JSON.stringify(this.props.store.provider)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProvDisplay);
