import { legacy_createStore as createStore, combineReducers, applyMiddleware  } from 'redux';
import {thunk} from 'redux-thunk';

import { authReducer } from '../authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

