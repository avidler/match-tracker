import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import createUserMatch from '../features/userMatches/userMatchSlice'

function UserMatchForm() {
  const [match, setMatch] = useState('')
  const dispatch = useDispatch()


  const onSubmit = e => {
    e.preventDefault()

    dispatch(createUserMatch({match}))
    setMatch('')
  }
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='Match'>Match</label>
          <input 
            type='text' 
            name='match' 
            id='match' 
            value={match}
            onChange={(e)=>setMatch(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">I was at this match</button>
        </div>
      </form>


    </section>
  )
}

export default UserMatchForm