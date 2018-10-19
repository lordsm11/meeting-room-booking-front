import { createStore, applyMiddleware } from 'redux';
//import { combineReducers, createStore, applyMiddleware } from 'redux';
//import productsReducer from './reducers/products-reducer';
//import footReducer from './reducers/foot-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';

export default createStore(
    //combineReducers({productsReducer, footReducer, form: reduxFormReducer}),
    composeWithDevTools(applyMiddleware(thunk))
);