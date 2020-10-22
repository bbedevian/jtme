import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { fetchJobsStart } from './jobs/jobs.sagas';
import { fetchInteractionsStart } from './interactions/interactions.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(fetchJobsStart), call(fetchInteractionsStart)]);
}