import axios from 'axios'


const API_URL = '/api/userMatches/'

// Create new userMatch
const createUserMatch = async(userMatchData, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, userMatchData, config)

    return response.data
}

// Get all userMatches
const getAllUserMatches = async(token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user match
const deleteUserMatch = async(userMatchID, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + userMatchID, config)

    return response.data
}

const userMatchService = {
    createUserMatch,
    getAllUserMatches,
    deleteUserMatch,
}

export default userMatchService
