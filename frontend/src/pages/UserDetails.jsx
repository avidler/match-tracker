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



function UserDetails() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        favouriteTeam: '',
        favouriteTeamID: '',
    })

    const {name, email, password, password2, favouriteTeam, favouriteTeamID} = formData



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        // This is the slice called 'auth' from authSlice.js
        (state) => state.auth
        
    )
    console.log("user name",user.name)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/userdetails')
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
                password,
                favouriteTeam,
                favouriteTeamID,
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
            <FaUser />Change details
        </h1>
        <p>Please modify details below</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                Name: <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    placeholder={user.name}
                    onChange={onChange}
                />
            </div>           
        </form>
    </section>
    </>
  )
}

export default UserDetails