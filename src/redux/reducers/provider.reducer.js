const providerReducer = (state = {}, action) => {
  // holds provider after API get
  switch (action.type) {
    case "SET_PROV":
      return action.payload;
    case "UNSET_PROV":
      return {};
    default:
      return state;
  }
};

export default providerReducer;
