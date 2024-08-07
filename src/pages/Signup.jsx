import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";
import '../styles/LogSign.css'; // Import the CSS file

function Signup() {
    const [isCelebrity, setIsCelebrity] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleCelebritySignup = () => {
        setIsCelebrity(!isCelebrity);
    };

    return (
        <div className="login-signup-container">
            <Form route={isCelebrity ? "/celebrity/signup/" : "/signup/"} method="signup" isCelebrity={isCelebrity}/>
            <div className="navigation-links">
                <span onClick={() => handleNavigation('/login')} style={{ cursor: 'pointer', color: 'blue' }}>
                    Log In
                </span>
                <span onClick={() => handleNavigation('/forgot')} style={{ cursor: 'pointer', color: 'blue' }}>
                    Forgot Password
                </span>
                <span onClick={handleCelebritySignup} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isCelebrity ? 'Normal Login' : 'Celebrity Login'}
                </span>
            </div>
        </div>
    );
}

export default Signup;
