/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
	name: 'search',
	initialState: {
		searchTerm: '',
	},
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
	},
});

export const { setSearchTerm } = searchSlice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;

export default searchSlice.reducer;
