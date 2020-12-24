

const printReducer = (state = [], action) => {
    // holds participant after API get
    switch (action.type) {
      case "SET_PRINT":
        return state.concat(action.payload);
      case "UNSET_PART":
        return {};
      default:
        return state;
    }
  };
  
  export default printReducer;
  