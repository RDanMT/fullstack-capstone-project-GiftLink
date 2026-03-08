import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Sign_Up/Sign_Up.css'; // Reusing the same CSS for simplicity

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        if (!email || !password) {
            setError('Please fill out all fields');
            return;
        }

        if (password.length < 5) {
            setError('Password must be at least 5 characters');
            return;
        }

        setError('');
        // Mock API Call successful
        sessionStorage.setItem('auth-token', 'mock-token-xyz');
        sessionStorage.setItem('email', email);

        navigate('/');
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Login</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: "left" }}>
                    Are you a new member?
                    <span><Link to="/signup" style={{ color: '#2190FF' }}> Sign Up Here</Link></span>
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" aria-describedby="helpId" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {error && <div className="err" style={{ color: 'red' }}>{error}</div>}

                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
