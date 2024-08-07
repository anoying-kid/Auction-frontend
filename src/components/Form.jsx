import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method, isCelebrity }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Log In' : 'Sign Up';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {
                username,
                password,
                ...(method 
                    !== 'login' && { mobile_number: mobileNumber })
            });
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.username ? error.response.data.username[0] : error.response.data.detail ? error.response.data.detail : 'An error occurred';
                alert(errorMessage); // Set the error message
            } else {
                alert('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{isCelebrity && 'Celebrity '}{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {method !== 'login' && (<input
            className="form-input"
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Phone Number"
        />)}
        <button className="form-button" type="submit">{name}</button>
    </form>

}

export default Form;