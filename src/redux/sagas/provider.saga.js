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

function* fetchAllProviders() {
  try {
    console.log("this is where we are");
    const providerResponse = yield axios.get("/api/provider/providers");
    console.log("all providers", providerResponse.data);
    yield put({ type: "SET_ALL_PROVS", payload: providerResponse.data });
  } catch (error) {
    console.log("whats up from the fetchProvider", error);
  }
}

function* addProviderParticipant(action) {
  try {
    console.log(action.payload);
    
    yield axios.post("/api/participant/participant", action.payload);
  } catch (error) {
    console.log("Assign Provider Failed", error);
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

//   yield takeLatest('GET_THAT_PROV', fetchProvProv)
}

export default providerSaga;
