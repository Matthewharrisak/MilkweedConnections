import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    try {
      const response = yield axios.get(`/api/provider/${action.payload.first_name}/${action.payload.last_name}/${action.payload.username}`);
      yield put({type: 'SET_PROV_ID', payload: response.data.id})
    }
    catch (error) {
      console.log('Error with user registration:', error);
    }
    
  } 
  catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}
// takes in provider_id created from registering new user and provider and creates a provider profile linked to their provider account based off id
function* createProfile(action) {
  try {
    console.log('WHAT UP FROM THE CREATE PROFILE');
    
    yield axios.post(`/api/provider/${action.payload.prov_id}`, action.payload);
  } 
  catch (error) {
    console.log('Error with user creating profile:', error);
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('CREATE_PROFILE', createProfile);
}

export default registrationSaga;
