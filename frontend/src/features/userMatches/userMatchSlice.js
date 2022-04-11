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
    console.log("userMatchData: ", userMatchData)
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log("token: ", token)
        return await userMatchService.createUserMatch(userMatchData, token)
    } catch (error) {
        console.log("userMatchData",userMatchData)
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Get all userMatches
export const getAllUserMatches = createAsyncThunk('userMatches/getAll',
async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userMatchService.getAllUserMatches(token)
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

// Delete userMatch
export const deleteUserMatch = createAsyncThunk('userMatches/delete',
async(id, thunkAPI) => {
     try {
        const token = thunkAPI.getState().auth.user.token
        return await userMatchService.deleteUserMatch(id, token)
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
    name: 'userMatch',
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
            .addCase(getAllUserMatches.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUserMatches.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userMatches = action.payload

            })
            .addCase(getAllUserMatches.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
            .addCase(deleteUserMatch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserMatch.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userMatches = state.userMatches.filter(
                    (userMatch) => userMatch._id !== action.payload.id)
   
            })
            .addCase(deleteUserMatch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
    }
})

export const { reset } = userMatchSlice.actions
export default userMatchSlice.reducer