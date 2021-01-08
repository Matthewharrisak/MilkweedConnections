import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class AdminPartStatusAssign extends Component {
  state = {
      edit : false
  };

  editToggle = () => {
      this.setState({
          edit : !this.state.edit
      })
  }

  render() {
    return (
      <>
        {this.state.edit === true ? 
        <>
        Dropdown will go here
        </> 
        : 
        <>{this.props.status}</>}
        <button onClick={this.editToggle}>Update</button>
      </>
    );
  }
}

export default connect(mapStoreToProps)(AdminPartStatusAssign);
