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

const allProviders = (state = [], action) => {
  // holds provider after API get
  switch (action.type) {
    case "SET_ALL_PROVS":
      return action.payload;
    default:
      return state;
  }
};

const currProv = (state = {}, action) => {
  // holds provider after API get
  switch (action.type) {
    case "SET_CURR_PROV":
      return action.payload;
    default:
      return state;
  }
};

const provPart = (state = [], action) => {
  // holds provider after API get
  switch (action.type) {
    case "SET_ALL_PROV_PARTS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  providerReducer,
  allProviders,
  provPart,
  currProv
});
