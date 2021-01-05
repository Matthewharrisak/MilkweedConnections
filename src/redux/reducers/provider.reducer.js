import { combineReducers } from 'redux';

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
const currentProvider = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURR_PROV":
      return action.payload;
    default:
      return state;
  }
};

// export default providerReducer;
export default combineReducers({
  providerReducer,
  currentProvider
});
