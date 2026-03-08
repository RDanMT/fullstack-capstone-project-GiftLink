import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedName = sessionStorage.getItem('name') || 'Guest';
        const storedEmail = sessionStorage.getItem('email') || 'guest@example.com';
        const storedPhone = sessionStorage.getItem('phone') || '1234567890';
        setName(storedName);
        setEmail(storedEmail);
        setPhone(storedPhone);
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);
        setIsEditing(false);
        // Dispatch custom event to let Navbar know
        window.dispatchEvent(new Event('storage'));
        window.location.reload();
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Profile Information</h2>
                {!isEditing ? (
                    <div className="profile-details">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Phone:</strong> {phone}</p>
                        <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
                    </div>
                ) : (
                    <form className="profile-form" onSubmit={handleSave}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
