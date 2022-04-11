import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUserMatch } from '../features/userMatches/userMatchSlice' 

function UserMatchItem({userMatch}) {
  const dispatch = useDispatch()
    console.log("UserMatchItem userMatch: ", userMatch)
  return (
    <div className="user-match">
        <div>
         {new Date(userMatch.CreatedAt).toLocaleString('en-US')}
        </div>
        
        <h2>{userMatch.text}</h2>
        <button onClick={() => {dispatch(deleteUserMatch(userMatch._id))}} className='close'>X</button>
    </div>
  )
}

export default UserMatchItem