import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class AdminPartStatusAssign extends Component {
  state = {
      edit : false,
  };

  editToggle = () => {
      this.setState({
          edit : !this.state.edit
      })

  }

  handleChange = (event) => {
    let data = {
        row : this.props.id,
        status : event.target.value
    }
        if (event.target.value !== "") {
          this.props.dispatch({
            type: "UPDATE_STATUS",
            payload: data,
          });
        }
          this.setState({
            edit: false,
          });
  }

  render() {
    return (
      <>
        {this.state.edit === true ? (
          <>
            <select name="users" id="users" onChange={this.handleChange}>
              <optgroup label="Providers">
                <option value="">Change Status:</option>
                <option value="Active">Active</option>
                <option value="Waitlist">Waitlist</option>
                <option value="Discharged">Discharge</option>
              </optgroup>
            </select>
            <button onClick={this.editToggle}>Cancel</button>
          </>
        ) : (
          <>
            {this.props.status}
            <br />
            <button onClick={this.editToggle}>Update</button>
          </>
        )}
      </>
    );
  }
}

export default connect(mapStoreToProps)(AdminPartStatusAssign);
