import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to get all participant data 

function* fetchParticipants() {
    try {
        const participantResponse = yield axios.get('/api/participant');
        yield put({type: 'SET_PART', payload: participantResponse.data})
    }catch(error) {
        console.log('whats up from the fetchPARTYTIME' , error);
        
    }
}

function* deletePart(action){

    try{
        console.log('hello from deletePart:', action.payload);
    // use string interpolation to pass the payload
    yield axios.delete(`/api/participant/${action.payload.id}`)
    
    } catch (error){
        console.log('error in post', error);
    }
  }

function* participantsSaga() {
  yield takeLatest('GET_PART', fetchParticipants);
  yield takeLatest('DELETE_PARTICIPANT', deletePart);
}


export default participantsSaga;
