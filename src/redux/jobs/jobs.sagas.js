import { takeEvery, call, put } from 'redux-saga/effects'
import {fetchJobsSuccess, fetchJobsFailure} from './jobs.actions'
import JobActionTypes from './jobs.types'
import {firestore, convertJobsSnapshotToMap } from '../../firebase/firebase.utils'
import {store} from '../store'



export function* fetchJobsAsync() {
    const state = store.getState();
    const currentUserID = state.user.currentUser.id;
    try {
        const collectionRef = firestore.collection('users');
        const userDoc = collectionRef.doc(currentUserID);
        const userJobs = userDoc.collection('jobs');
        const snapShot = yield userJobs.get()
        const jobsMap = yield call(convertJobsSnapshotToMap, snapShot)
        yield put(fetchJobsSuccess(jobsMap))
    } catch(err){
        yield put(fetchJobsFailure(err.message))
    }
}

export function* fetchJobsStart() {
    yield takeEvery(JobActionTypes.FETCH_JOBS_START, fetchJobsAsync)
}
