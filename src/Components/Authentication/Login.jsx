import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Ensure this path is correct
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '',
    password: '', 
    emailId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value 
    });
  };
  
  const formLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.emailId) {
      toast.error('Please fill in all fields.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, formData);
      props.setUserDetails(response.data.user);
      toast.success('Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/'), 2000); // Redirect after the toast
      console.log('Login successful:', response.data.user);
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : 'Unknown error');
      toast.error(error.response?.data?.message || 'An error occurred during login.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={formLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

        <label htmlFor="emailId">Email ID</label>
        <input type="email" id="emailId" name="emailId" value={formData.emailId} onChange={handleInputChange} required />

        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
          New to INSTA? <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>SIGN UP</Link>
        </div>

        <button type="submit">LOGIN</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
