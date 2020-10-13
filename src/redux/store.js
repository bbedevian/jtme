import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { fetchJobsStart } from './jobs/jobs.sagas';


const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') middlewares.push(logger)

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(fetchJobsStart) 

export default store;