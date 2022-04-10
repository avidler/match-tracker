import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import userMatchService from "./userMatchService"

const initialState = {
    userMatches: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new userMatch
export const createUserMatch = createAsyncThunk('userMatches/create',
async(userMatchData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userMatchService.createUserMatch(userMatchData, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const userMatchSlice = createSlice({
    name: 'userMatches',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserMatch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUserMatch.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userMatches.push(action.payload)

            })
            .addCase(createUserMatch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
    }
})

export const { reset } = userMatchSlice.actions
export default userMatchSlice.reducer