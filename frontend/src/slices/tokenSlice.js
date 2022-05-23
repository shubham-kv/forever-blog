import {createSlice} from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
	name: 'token',
	initialState: {
		value: ''
	},
	reducers: {
		setToken: (state, action) => {
			state.value = action.payload
		}
	}
})

// action creators for token
export const {setToken} = tokenSlice.actions

// selector, selects the required value from the state
export const selectToken = (state) => (state.token.value)

export default tokenSlice.reducer
