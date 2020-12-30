import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AdminTabBar from '../AdminTabBar/AdminTabBar';
import { CSVLink, CSVDownload } from "react-csv";
import NewPartForm from '../NewPartForm/NewPartForm';
import './AdminPage.css';


// this component exists to display the Admin tab bar which holds the data tables
class AdminPage extends Component {
 

  render() {
    return (
      <div>
        <AdminTabBar/>
        <CSVLink data={this.props.store.print}><div className="printLink">Print all of the check marked Participant rows</div></CSVLink>
        <NewPartForm/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
