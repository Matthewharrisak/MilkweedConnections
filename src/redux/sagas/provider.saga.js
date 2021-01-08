import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchProvider() {
    try {
        const providerResponse = yield axios.get('/api/provider');
        yield put({type: 'SET_PROV', payload: providerResponse.data})
    }catch(error) {
        console.log('whats up from the fetchProvider' , error);
        
    }
}
function* fetchAllDeactiveProviders(action) {
  try {
    const providerResponse = yield axios.get(`/api/provider/providers/${action.payload.status}`);
    console.log("all providers", providerResponse.data);
    yield put({ type: "SET_ALL_PROVS", payload: providerResponse.data });
  } catch (error) {
    console.log("whats up from the fetchAllProviders", error);
  }
}

function* updateActiveStatus(action) {
    yield console.log('UPDATING  ACTIVE STATUS:', action.payload)
    try {
      yield axios.put(`/api/provider/providers/${action.payload.id}` , action.payload);
    } catch (error) {
      console.log('ERROR in axios update', error);
    }
  }

function* fetchAllProviders(action) {
  try {
    const providerResponse = yield axios.get(`/api/provider/providers/${action.payload.status}`);
    console.log("all providers", providerResponse.data);
    yield put({ type: "SET_ALL_PROVS", payload: providerResponse.data });
  } catch (error) {
    console.log("whats up from the fetchAllProviders", error);
  }
}

function* fetchParticipantsOnProvider(action) {
    console.log('beautiful');
  try {
    console.log("this is where we are");
    const providerResponse = yield axios.get(`/api/provider//participants/${action.payload}`); //${action.payload}
    console.log("specific participants", providerResponse.data);
    yield put({ type: "SET_ALL_PROV_PARTS", payload: providerResponse.data });
  } catch (error) {
    console.log("whats up from the fetchProvider", error);
  }
}

function* addProviderParticipant(action) {
  try {
    console.log(action.payload);

    yield axios.post("/api/participant/participant", action.payload);
    yield put({ type: "GET_PROV_PART" });
  } catch (error) {
    console.log("Assign Provider Failed", error);
  }
}
// Removes relationships in prov_part table
function* removeProviderParticipant(action) {
  try {
    yield axios.delete(`/api/participant/provPart/${action.payload}`)
    yield put({ type: "GET_PROV_PART" });
  } catch (error) {
    console.log("Remove Provider Participant relationship failed ", error);
  }
}

function* fetchProviderParticipant() {
  try {
    console.log("this is where we are");
    const partProvResponse = yield axios.get("/api/participant/part_prov");
    console.log("all providers", partProvResponse.data);
    yield put({ type: "SET_ALL_PROV_PARTS", payload: partProvResponse.data });
  } catch (error) {
    console.log("whats up from the fetchProvider", error);
  }
}

// function* fetchProvProv() {
//     try {
//         const providerResponse = yield axios.get(`/api/participant/${provider.id}`);
//         yield put({type: 'SET_PROV', payload: providerResponse.data})
//     }catch(error) {
//         console.log('whats up from the fetchProvider' , error);
        
//     }
// }

function* providerSaga() {
  yield takeLatest('GET_PROV', fetchProvider);
  yield takeLatest('GET_ALL_PROVS', fetchAllProviders);
  yield takeLatest('ADD_PROV_PART', addProviderParticipant);
  yield takeLatest('GET_PROV_PART', fetchProviderParticipant);
  yield takeLatest('DELETE_PROV_PART', removeProviderParticipant);
  yield takeLatest('GET_PART_ON_PROV', fetchParticipantsOnProvider);
  yield takeLatest('GET_ALL_DEACTIVE_PROVS', fetchAllDeactiveProviders);
  yield takeLatest('UPDATE_ACTIVE_STATUS', updateActiveStatus);

//   yield takeLatest('GET_THAT_PROV', fetchProvProv)
}

export default providerSaga;
