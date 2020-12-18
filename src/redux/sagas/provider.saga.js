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
//   yield takeLatest('GET_THAT_PROV', fetchProvProv)
}

export default providerSaga;
