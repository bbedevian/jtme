import { takeEvery, call, put } from 'redux-saga/effects'
import {fetchInteractionsSuccess,fetchInteractionsFailure } from './interactions.actions'
import InteractionsActionTypes from './interactions.types'
import {firestore, convertInteractionsSnapshotToMap } from '../../firebase/firebase.utils'



export function* fetchInteractionsAsync(action) {
    try {
        const collectionRef = firestore.collection('users');
        const userDoc = collectionRef.doc(action.user.id);
        const userJobs = userDoc.collection('jobs');
        const job = userJobs.doc(action.jobID)
        const interactions = job.collection('interactions')
        const snapShot = yield interactions.get()
        const interactionsMap = yield call(convertInteractionsSnapshotToMap, snapShot)
        yield put(fetchInteractionsSuccess(interactionsMap))
    } catch(err){
        yield put(fetchInteractionsFailure(err.message))
    }
}

export function* fetchJobsStart() {
    yield takeEvery(InteractionsActionTypes.FETCH_INTERACTIONS_START, fetchInteractionsAsync)
}
