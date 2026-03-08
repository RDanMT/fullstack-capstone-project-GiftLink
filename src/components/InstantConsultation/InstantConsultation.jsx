import React, { useState } from 'react';
import './InstantConsultation.css';

const InstantConsultation = () => {
    return (
        <div className="instant-consultation">
            <center>
                <h1>Instant Consultation</h1>
                <p>Connect with a doctor instantly via video call.</p>

                <div className="consultation-card">
                    <i className="fa fa-video-camera" style={{ fontSize: '5rem', color: '#2190FF', marginBottom: '20px' }}></i>
                    <h3>Start a Video Call</h3>
                    <p>Available 24/7 for urgent health concerns.</p>
                    <button className="btn btn-primary" style={{ marginTop: '20px' }}>Join Now</button>
                </div>
            </center>
        </div>
    );
};

export default InstantConsultation;
