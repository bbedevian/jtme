import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') middlewares.push(logger)

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

// sagaMiddleware.run() sagas will be put in here

export default store;