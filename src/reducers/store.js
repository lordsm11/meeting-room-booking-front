import { combineReducers, createStore, applyMiddleware } from 'redux';
import loginReducer from 'reducers/interceptors/login-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers({loginReducer}),
    composeWithDevTools(applyMiddleware(thunk))
);