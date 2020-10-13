import { takeEvery, call, put } from 'redux-saga/effects'
import {fetchJobsSuccess, fetchJobsFailure} from './jobs.actions'
import JobActionTypes from './jobs.types'
import {firestore, convertJobsSnapshotToMap } from '../../firebase/firebase.utils'



export function* fetchJobsAsync(action) {
    console.log('FETCH JOBS ASYNC BEING CALLED')
    try {
        const response = yield call(dbCall, action.user)
        const jobsMap = yield call(convertJobsSnapshotToMap, response)
        yield put(fetchJobsSuccess(jobsMap))
    } catch(err){
        yield put(fetchJobsFailure(err.message))
    }
}

export function* fetchJobsStart() {
    yield takeEvery(JobActionTypes.FETCH_JOBS_START, fetchJobsAsync)
}

const dbCall = async (user) => {
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(user.id);
    const userJobs = userDoc.collection('jobs');
    return await userJobs.get()
}