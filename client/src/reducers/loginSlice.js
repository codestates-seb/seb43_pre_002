/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setIsLogin: (state, action) => {
			state.isLogin = action.payload;
		},
	},
});

export const { setIsLogin } = loginSlice.actions;

export const selectIsLogin = (state) => state.login.isLogin;

export default loginSlice.reducer;
