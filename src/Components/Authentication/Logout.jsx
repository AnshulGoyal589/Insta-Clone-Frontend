import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Logout = async() => {
    const navigate = useNavigate();

    try {
        await axios.get('http://localhost:8000/auth/logout');
        navigate('/login');
        console.log('Logout successful:');
      } catch (error) {
        console.error('Error during logout:', error.response ? error.response.data : 'Unknown error');
        toast.error(error.response?.data?.message || 'An error occurred during logout.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }

  return (
    <></>
  )
}

export default Logout