import React, { useState } from 'react';
import './Reviews.css';

const initialReviews = [
    { id: 1, doctorName: 'Dr. John Doe', specialty: 'Dentist', review: '', rating: 0, submitted: false },
    { id: 2, doctorName: 'Dr. Jane Smith', specialty: 'General Physician', review: 'Great doctor!', rating: 5, submitted: true }
];

const Reviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });

    const handleGiveReview = (id) => {
        setCurrentReviewId(id);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        setReviews(reviews.map(r => r.id === currentReviewId ? { ...r, review: formData.review, rating: formData.rating, submitted: true } : r));
        setCurrentReviewId(null);
        setFormData({ name: '', review: '', rating: 0 });
    };

    return (
        <div className="reviews-container">
            <h2>Reviews</h2>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>Provide Feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((rev, index) => (
                        <tr key={rev.id}>
                            <td>{index + 1}</td>
                            <td>{rev.doctorName}</td>
                            <td>{rev.specialty}</td>
                            <td>
                                <button
                                    className="btn btn-primary review-btn"
                                    disabled={rev.submitted}
                                    onClick={() => handleGiveReview(rev.id)}
                                >
                                    {rev.submitted ? 'Review Submitted' : 'Click Here'}
                                </button>
                            </td>
                            <td>{rev.review}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {currentReviewId && (
                <div className="review-form-overlay">
                    <div className="review-form-container">
                        <h3>Give Your Feedback</h3>
                        <form onSubmit={handleSubmitReview}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Review:</label>
                                <textarea className="form-control" value={formData.review} onChange={e => setFormData({ ...formData, review: e.target.value })} required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Rating:</label>
                                <select className="form-control" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} required>
                                    <option value="0">Select Rating</option>
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="5">5 Stars</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => setCurrentReviewId(null)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
