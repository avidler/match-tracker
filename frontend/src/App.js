import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <>
      <Router>
      <div className='container'>
        <Header />
        <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userdetails' element={<UserDetails />} />
        <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
