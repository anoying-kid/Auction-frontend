import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [isCelebrity, setIsCelebrity] = useState(false);
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = {
            username,
            mobile_number: mobileNumber,
            password,
        };

        const url = isCelebrity ? 'http://localhost:8000/celebrity/signup/' : 'http://localhost:8000/signup/';

        try {
            const response = await axios.post(url, signupData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccess('Signup successful!');
            setError('');
            console.log('Signup Successful', response.data);
        } catch (error) {
            console.error('Error during signup:', error);
            if (error.response) {
                setError(error.response.data.detail || 'Signup failed. Please check your input.');
            } else if (error.request) {
                setError('No response from the server. Please try again later.');
            } else {
                setError('Error in setting up the request.');
            }
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>{isCelebrity ? 'Celebrity Signup' : 'User Signup'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm password:</label>
                    <input
                        type="password"
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button onClick={() => { setIsCelebrity(!isCelebrity); setError(''); setSuccess('') }}>
                Switch to {isCelebrity ? 'User' : 'Celebrity'} Signup
            </button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
