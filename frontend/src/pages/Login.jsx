import React, {useState, useEffect} from 'react'
//useSelector brings something in from the state (user, isLoading, isError etc..)
//useDispatch can be used to dispatch a function such as reset or register (from features/auth)
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        // This is the slice called 'auth' from authSlice.js
        (state) => state.auth
    )

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    },[user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        
        )

    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const userData = {
        login,
        password
    }

    dispatch(login(userData))

    if(isLoading){
        return <Spinner />
    }
  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt />Login
        </h1>
        <p>Start Tracking Matches</p>
    </section>
    <section className="form">
        <form>
            <div className="form-group">
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Please enter your email'
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Please enter your password'
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
            <button type='submit' className='btn btn-block' onSubmit={onSubmit}>Submit</button>

            </div>
           
        </form>
    </section>
    </>
  )
}

export default Login