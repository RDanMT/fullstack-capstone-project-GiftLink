import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Sign_Up from './components/Sign_Up/Sign_Up';
import Login from './components/Login/Login';
import FindDoctorSearch from './components/FindDoctorSearch/FindDoctorSearch';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import Notification from './components/Notification/Notification';
import Reviews from './components/Reviews/Reviews';
import ProfileCard from './components/ProfileCard/ProfileCard';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Notification>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Sign_Up />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/appointments" element={<FindDoctorSearch />} />
                    <Route path="/instant-consultation" element={<InstantConsultation />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/profile" element={<ProfileCard />} />
                </Routes>
            </Notification>
        </div>
    );
}

export default App;
