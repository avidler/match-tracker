import React, {useState, useEffect} from 'react'
//useSelector brings something in from the state (user, isLoading, isError etc..)
//useDispatch can be used to dispatch a function such as reset or register (from features/auth)
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const axios = require("axios");

const options = {
method: 'GET',
url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
params: {   league: '41',
            season: '2021'},
headers: {
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    'X-RapidAPI-Key': '6c26722765msh90b4b0c04761e11p1765c4jsn88f7ec578f91'
}
};
axios.request(options).then(function (response) {
    let teamList = []
    response.data.response.forEach(function(team){

        teamList.push(team.team.name);
     });
     console.log("teamList: ",teamList)
     var teamListChoice = document.getElementById('teamschoice');

        teamList.forEach(function(teamName){
        var option = document.createElement('option');
        option.value = teamName;
        teamListChoice.appendChild(option);
});
}).catch(function (error) {
    console.error(error);
});

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

function UserDetails() {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        password2: '',
        favouriteTeam: user.favouriteTeam,
        favouriteTeamID: '',
    })

    const {name, email, password, password2, favouriteTeam, favouriteTeamID} = formData



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
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }
  return (
    <>
    <section className="heading">
        <h1>
            <FaUser />Update Details
        </h1>
        <p></p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    placeholder={name}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    placeholder={email}
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
                    placeholder='Please enter a password'
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input
                    type='password'
                    className='form-control'
                    id='password2'
                    name='password2'
                    value={password2}
                    placeholder='Please confirm password'
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input
                    list='teamschoice'
                    className='form-control'
                    id='favourite-team'
                    name='favouriteTeam'
                    value={favouriteTeam}
                    placeholder={favouriteTeam}
                    onChange={onChange}
                />
                <datalist id="teamschoice"></datalist>
            </div>
            <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>

            </div>
           
        </form>
    </section>
    </>
  )
}

export default UserDetails