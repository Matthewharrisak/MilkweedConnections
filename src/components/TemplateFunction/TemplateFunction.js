import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  
  export default function SelectAll() {
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({
      nr1: false,
      nr2: false
    });
  
  // handles input toggles
  
    const toggleCheck = (inputName) => {
      setChecked((prevState) => {
        const newState = { ...prevState };
        newState[inputName] = !prevState[inputName];
        return newState;
      });
    };
  
 // handles the select all


    const selectAll = (value) => {
      setCheckedAll(value);
      setChecked((prevState) => {
        const newState = { ...prevState };
        for (const inputName in newState) {
          newState[inputName] = value;
        }
        return newState;
      });
    };

    // control checked state

    useEffect(() => {
      let allChecked = true;
      for (const inputName in checked) {
        if (checked[inputName] === false) {
          allChecked = false;
        }
      }
      if (allChecked) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }, [checked]);

    return (
      <div className="App">
        <div>
          <label>All</label>
          <input
            type="checkbox"
            onChange={(event) => selectAll(event.target.checked)}
            checked={checkedAll}
          />
        </div>
        <div>
          <label>1</label>
          <input
            type="checkbox"
            name="nr1"
            onChange={() => toggleCheck("nr1")}
            checked={checked["nr1"]}
          />
        </div>
        <div>
          <label>2</label>
          <input
            type="checkbox"
            name="nr2"
            onChange={() => toggleCheck("nr2")}
            checked={checked["nr2"]}
          />
        </div>
      </div>
    );
  }
  

