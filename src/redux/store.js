import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger'
import rootReducer from './root-reducer';
import rootSaga from './root-saga';



const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];

// ??? Comment these in when you need to work with redux dev tools or redux logger and add 'compose' to redux imports
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
// if(process.env.NODE_ENV === 'development') middlewares.push(logger)
// ???

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export default store;