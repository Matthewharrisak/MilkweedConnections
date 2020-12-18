import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddPartButt from '../AddPartButt/AddPartButt';


// this component will display Participants table

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
        <AddPartButt/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PartDisplay);
