import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";
import '../styles/LogSign.css'; // Import the CSS file

function Login() {
    const [isCelebrity, setIsCelebrity] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleCelebrityLogin = () => {
        setIsCelebrity(!isCelebrity);
    };

    return (
        <div className="login-signup-container">
            <Form route={isCelebrity ? "/celebrity/login/" : "/login/"} method="login" isCelebrity={isCelebrity}/>
            <div className="navigation-links">
                <span onClick={() => handleNavigation('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>
                    Sign Up
                </span>
                <span onClick={() => handleNavigation('/forgot')} style={{ cursor: 'pointer', color: 'blue' }}>
                    Forgot Password
                </span>
                <span onClick={handleCelebrityLogin} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isCelebrity ? 'Normal Login' : 'Celebrity Login'}
                </span>
            </div>
        </div>
    );
}

export default Login;
