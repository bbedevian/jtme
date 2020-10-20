import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { fetchJobsStart } from './jobs/jobs.sagas';


const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if(process.env.NODE_ENV === 'development') middlewares.push(logger)

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(fetchJobsStart) 

export default store;