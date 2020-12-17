import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchParticipants() {
    try {
        const participantResponse = yield axios.get('/api/participant');
        yield put({type: 'SET_PART', payload: participantResponse.data})
    }catch(error) {
        console.log('whats up from the fetchPARTYTIME' , error);
        
    }
}

function* setPart(action) {
    try{
        yield axios.post('/api/participant', action.payload)
    } catch (error){
        console.log('error in the post' , error);
    }
}


function* participantsSaga() {
  yield takeLatest('GET_PART', fetchParticipants);
  yield takeLatest('SET_PART' , setPart);
}

export default participantsSaga;
