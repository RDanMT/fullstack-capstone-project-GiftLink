import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('auth-token');
        if (storedToken) {
            setIsLoggedIn(true);
            const mockAppointment = {
                doctorName: "Dr. John Doe",
                specialty: "Dentist",
                date: new Date().toLocaleDateString(),
            };
            setAppointmentData(mockAppointment);
        }
    }, []);

    return (
        <div>
            {isLoggedIn && appointmentData && (
                <div className="appointment-card">
                    <div className="appointment-card__content">
                        <h3 className="appointment-card__title">Appointment Details</h3>
                        <p className="appointment-card__message">
                            <strong>Doctor:</strong> {appointmentData.doctorName} <br />
                            <strong>Specialty:</strong> {appointmentData.specialty} <br />
                            <strong>Date:</strong> {appointmentData.date}
                        </p>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export default Notification;
