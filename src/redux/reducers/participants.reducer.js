

const participantsReducer = (state = {}, action) => {
    // holds participant after API get
    switch (action.type) {
      case "SET_PART":
        return action.payload;
      case "UNSET_PART":
        return {};
      default:
        return state;
    }
  };
  
  export default participantsReducer;
  