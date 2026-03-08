import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Mock checking auth
        const email = sessionStorage.getItem("email");
        const name = sessionStorage.getItem("name");
        if (email) {
            setIsLoggedIn(true);
            setUserName(name || email.split("@")[0]);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    StayHealthy <i className="fa fa-stethoscope"></i>
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
            </ul>
            <div className="navbar-auth">
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="btn userName-btn">
                            Welcome, {userName}
                        </Link>
                        <button className="btn logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="btn auth-btn">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn auth-btn">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
