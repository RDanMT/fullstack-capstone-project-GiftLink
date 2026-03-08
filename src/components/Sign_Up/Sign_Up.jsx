import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sign_Up.css';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        if (!name || !phone || !email || !password) {
            setError('Please fill out all fields');
            return;
        }

        if (password.length < 5) {
            setError('Password must be at least 5 characters');
            return;
        }

        if (phone.length < 10) {
            setError('Phone number must be at least 10 digits');
            return;
        }

        setError('');
        // Mock API Call successful
        sessionStorage.setItem('auth-token', 'mock-token-xyz');
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);

        navigate('/');
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: "left" }}>
                    Already a member?
                    <span><Link to="/login" style={{ color: '#2190FF' }}> Login</Link></span>
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Role</label>
                            <input type="text" name="role" id="role" className="form-control" placeholder="Patient" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
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
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;
