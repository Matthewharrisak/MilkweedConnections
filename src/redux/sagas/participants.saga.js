import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to get all participant data 

function* fetchParticipants() {
  try {
    const participantResponse = yield axios.get("/api/participant");
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsNameAsc() {
  try {
    const participantResponse = yield axios.get("/api/participant/name_ascend");
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsNameDesc() {
  try {
    const participantResponse = yield axios.get("/api/participant/name_decend");
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsCountyAsc() {
  try {
    const participantResponse = yield axios.get(
      "/api/participant/county_ascend"
    );
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsCountyDesc() {
  try {
    const participantResponse = yield axios.get(
      "/api/participant/county_decend"
    );
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsCCS() {
  try {
    const participantResponse = yield axios.get("/api/participant/ccs");
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsChoices() {
  try {
    const participantResponse = yield axios.get("/api/participant/choices");
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}

function* fetchParticipantsPSP() {
  try {
    const participantResponse = yield axios.get("/api/participant/psp");
    yield put({ type: "SET_PART", payload: participantResponse.data });
  } catch (error) {
    console.log("whats up from the fetchPARTYTIME", error);
  }
}


function* deletePart(action){

    try{
        console.log('hello from deletePart:', action.payload);
    // use string interpolation to pass the payload
    yield axios.delete(`/api/participant/delete/${action.payload.id}`)
    yield put({ type: "GET_PART" });
    } catch (error){
        console.log('error in post', error);
    }
  }

  function* updatePart(action) {
    yield console.log('UPDATING  ITEM:', action)
    try {
      yield axios.put(`/api/participant/${action.payload.id}` , action.payload);
    } catch (error) {
      console.log('ERROR in axios update', error);
    }
  }

  function* fetchParticipantsNoDischarge() {
    try {
      const participantResponse = yield axios.get("/api/participant/participant/no_discharge");
      yield put({ type: "SET_PART", payload: participantResponse.data });
    } catch (error) {
      console.log("whats up from the fetchPARTYTIME", error);
    }
  }

  function* updatePartStatus(action) {
    console.log('hello from edit book');
    try {
      yield axios.put("/api/participant/participant/status", action.payload);
      yield put({ type: "GET_PART_NAME_ASC" });
    } catch (error) {
      console.log("Edit Book Failed", error);
    }
  }
  




function* participantsSaga() {
  yield takeLatest('GET_PART', fetchParticipants);
  yield takeLatest('GET_PART_NAME_ASC', fetchParticipantsNameAsc);
  yield takeLatest('GET_PART_NAME_DESC', fetchParticipantsNameDesc);
  yield takeLatest('GET_PART_COUNTY_ASC', fetchParticipantsCountyAsc);
  yield takeLatest('GET_PART_COUNTY_DESC', fetchParticipantsCountyDesc);
  yield takeLatest('GET_PART_CCS', fetchParticipantsCCS);
  yield takeLatest('GET_PART_CHOICES', fetchParticipantsChoices);
  yield takeLatest('GET_PART_PSP', fetchParticipantsPSP);
  yield takeLatest('DELETE_PARTICIPANT', deletePart);
  yield takeLatest('UPDATE_PART' , updatePart);
  yield takeLatest('GET_PART_NO_DISCHARGE' , fetchParticipantsNoDischarge);
  yield takeLatest('UPDATE_STATUS' , updatePartStatus);

}


export default participantsSaga;
