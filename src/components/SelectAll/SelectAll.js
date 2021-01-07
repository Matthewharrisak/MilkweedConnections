// import { CheckBox } from "material-ui-icons";
import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
// import { row } from '../AdminPartDisplay/AdminPartDisplay'

const SelectAll = (props) => {
  let [checked, setChecked] = useState(false);
  let [checkedAll, setCheckedAll] = useState(false);
  const dispatch = useDispatch();

  function onChangeSelectBox(value, event) {
    dispatch({ type: "SET_PRINT", payload: props.row })
   if (event === true) {
    setChecked(true)
   }
    else {setChecked(false)}
    }
  return (
    <div>
    <Checkbox
      onChange={onChangeSelectBox}
      checked={checked}
    />
    </div> 
  );
};

export default SelectAll;
