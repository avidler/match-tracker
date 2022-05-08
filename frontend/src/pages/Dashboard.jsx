import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserMatchItem from '../components/UserMatchItem'
import UserMatchForm from '../components/UserMatchForm'
import Spinner from '../components/Spinner'
import {getAllUserMatches, reset} from '../features/userMatches/userMatchSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { userMatches, isLoading, isError, message} = useSelector((state) => state.userMatches)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    dispatch(getAllUserMatches())

    // This will do something when the component unmounts
    // ie - when the user leaves the dashboard
    return () => {
      dispatch(reset())
    }

  },[user, navigate, isError, message, dispatch])
  

  if(isLoading) {
    return <Spinner />
  }

  return (
    
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <h3>{user.favouriteTeam}</h3>
        <p>Match Tracker Dashboard</p>
      </section>

      <UserMatchForm />
      <section className="content">
        {userMatches.length > 0 ? (
          <div className="user-matches">
            {userMatches.map((userMatch) => 
              <UserMatchItem key={userMatch._id} userMatch={userMatch}/>
            )}
          </div>
        ) : (
        <h3>"You have not been to any matches!"</h3>)}
      </section>
    </>
  )
}

export default Dashboard