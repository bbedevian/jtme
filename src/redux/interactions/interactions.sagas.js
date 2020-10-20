import { takeEvery, call, put } from 'redux-saga/effects'
import {fetchInteractionsSuccess,fetchInteractionsFailure } from './interactions.actions'
import InteractionsActionTypes from './interactions.types'
import {firestore, convertInteractionsSnapshotToMap } from '../../firebase/firebase.utils'
import {store} from '../store'


export function* fetchInteractionsAsync(action) {
    const state = store.getState();
    const currentUserID = state.user.currentUser.id;
    const selectedJobID = state.jobs.selectedJob.id
    try {
        const collectionRef = firestore.collection('users');
        const userDoc = collectionRef.doc(currentUserID);
        const userJobs = userDoc.collection('jobs');
        const job = userJobs.doc(selectedJobID)
        const interactions = job.collection('interactions')
        const snapShot = yield interactions.get()
        const interactionsMap = yield call(convertInteractionsSnapshotToMap, snapShot)
        yield put(fetchInteractionsSuccess(interactionsMap))
    } catch(err){
        yield put(fetchInteractionsFailure(err.message))
    }
}

export function* fetchInteractionsStart() {
    yield takeEvery(InteractionsActionTypes.FETCH_INTERACTIONS_START, fetchInteractionsAsync)
}
