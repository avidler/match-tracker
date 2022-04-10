import axios from 'axios'

const API_URL = '/api/userMatches'

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

const userMatchService = {
    createUserMatch
}

export default userMatchService
