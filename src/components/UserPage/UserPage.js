import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NewUserForm from '../NewUserForm/NewUserForm'
import ProvTabBar from '../ProvTabBar/ProvTabBar'
import { CSVLink, CSVDownload } from "react-csv";

// this component will display Providers list of participants
class UserPage extends Component {

  render() {
    return (
      <div>
        <h1 id="welcome">Milkweed Connect!</h1>
        <p>{this.props.store.user.username}</p>
        {/* <CSVLink data={this.props.store.print}>Download me</CSVLink>; */}
        <ProvTabBar/>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
