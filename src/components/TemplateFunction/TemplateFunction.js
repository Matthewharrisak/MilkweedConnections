// import { CheckBox } from "material-ui-icons";
import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";


const SelectAll = () => {
  let [checked, setChecked] = useState(false);
  let [checkedAll, setCheckedAll] = useState(false);

  function onChangeSelectBox(value, event) {
   if (event === true) {
    console.log('ILL CHECK THAT BOX');
    setChecked(!true) }
  }

  return (
    <div>

      all box
    <Checkbox
      onChange={onChangeSelectBox}
  
    />
    box 2
    <Checkbox
      onChange={onChangeSelectBox}
      checked={checked}
    />
    </div>
  );
};

export default SelectAll;
