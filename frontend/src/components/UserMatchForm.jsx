import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createUserMatch } from '../features/userMatches/userMatchSlice'

function UserMatchForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()


  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createUserMatch({text}))
    setText('')
  }
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Match</label>
          <input 
            type='text' 
            name='text' 
            id='text' 
            value={text}
            onChange={(e)=>setText(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">I was at this match</button>
        </div>
      </form>


    </section>
  )
}

export default UserMatchForm