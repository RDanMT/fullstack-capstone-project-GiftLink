import React, { useState } from 'react';
import './FindDoctorSearch.css';

const initSpeciality = [
    'Dentist', 'Gynecologist/Obstetrician', 'General Physician', 'Dermatologist', 'Ear-Nose-Throat (ENT) Specialist', 'Homeopath', 'Ayurveda'
];

const mockDoctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Dentist", experience: 10, ratings: 4.5 },
    { id: 2, name: "Dr. Jane Smith", specialty: "General Physician", experience: 8, ratings: 4.8 },
    { id: 3, name: "Dr. Mike Johnson", specialty: "Dentist", experience: 15, ratings: 4.2 },
];

const FindDoctorSearch = () => {
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const [showSpecialities, setShowSpecialities] = useState(false);
    const [doctors, setDoctors] = useState([]);

    const handleSearch = () => {
        if (searchDoctor) {
            const filtered = mockDoctors.filter(doc => doc.specialty.toLowerCase().includes(searchDoctor.toLowerCase()));
            setDoctors(filtered);
            setShowSpecialities(false);
        }
    };

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor at your own ease</h1>
                <div>
                    <i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="search-local">
                        <input
                            type="text"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            value={searchDoctor}
                            onFocus={() => setShowSpecialities(true)}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                        />
                        <i className="fa fa-search"></i>
                    </div>
                    {showSpecialities && (
                        <div className="search-dropdown-specialities" onMouseLeave={() => setShowSpecialities(false)}>
                            {specialities.map((specialty) => (
                                <div key={specialty} className="search-item" onMouseDown={() => {
                                    setSearchDoctor(specialty);
                                    setShowSpecialities(false);
                                }}>
                                    <span><i className="fa fa-search"></i></span>
                                    <span>{specialty}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={handleSearch} style={{ marginLeft: '10px' }} className="btn btn-primary">Search</button>
                </div>

                {doctors.length > 0 && (
                    <div className="docsearch-output" style={{ marginTop: '20px', textAlign: 'left', width: '80%', margin: '20px auto' }}>
                        <h2>Results:</h2>
                        {doctors.map(doc => (
                            <div key={doc.id} className="doctor-card" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                                <h3>{doc.name}</h3>
                                <p>Specialty: {doc.specialty}</p>
                                <p>Experience: {doc.experience} years</p>
                                <p>Ratings: {doc.ratings} / 5</p>
                                <button className="btn btn-primary">Book Appointment</button>
                            </div>
                        ))}
                    </div>
                )}
            </center>
        </div>
    );
};

export default FindDoctorSearch;
