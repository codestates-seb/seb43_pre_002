import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import searchReducer from './searchSlice';

const rootReducer = combineReducers({
	login: loginReducer,
	search: searchReducer,
});

export default rootReducer;
