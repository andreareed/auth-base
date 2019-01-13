import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import apiRequestMiddleware from './common/utils/apiRequestMiddleware';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancer(applyMiddleware(apiRequestMiddleware, thunk)));
