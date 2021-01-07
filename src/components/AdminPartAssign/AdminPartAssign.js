import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class AdminPartAssign extends Component {
  state = {};

  handleChange = (event) => {
    const assignPartProv = {
      part: this.props.row.id,
      prov: event.target.value,
    };
    if (event.target.value !== "") {
      this.props.dispatch({
        type: "ADD_PROV_PART",
        payload: assignPartProv,
      });
    }
  };


  render() {
    return (
      <div>
        <select name="users" id="users" onChange={this.handleChange}>
          <optgroup label="Providers">
            <option value="">Assign to Provider:</option>
            {this.props.prov[0] ? (
              <>
                {this.props.prov.map((provider) => {
                  return (
                    <option value={provider.id}>
                      {provider.first_name} {provider.last_name}
                    </option>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </optgroup>
        </select>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPartAssign);
