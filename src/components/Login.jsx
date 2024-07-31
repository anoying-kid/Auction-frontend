import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCelebrity, setIsCelebrity] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const loginData = {
        "username": username,
        "password": password,
    };

    const url = isCelebrity ? 'http://localhost:8000/celebrity/login/' : 'http://localhost:8000/login/';

    try {
        const response = await axios.post(url, loginData);
        console.log('Login Successful', response.data);
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.detail || 'Login failed. Please check your username and password.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error in setting up the request.');
      }
    };
    };

  return (
    <div>
      <h2>{isCelebrity ? 'Celebrity Login' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color:'red' }}> {error}</p>}
      <button onClick={() => setIsCelebrity(!isCelebrity)}>
      {isCelebrity ? 'Switch to Normal Login' : 'Switch to Celebrity Login'}
      </button>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
