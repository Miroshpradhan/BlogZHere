import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const Profile = ({ isLoggedIn }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    // Add more fields as needed
  });

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    // Fetch user data from your backend using userId
    // Update setUser with the fetched user data
    // Example fetch:
    fetch(`http://localhost:5000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [isLoggedIn, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update user profile data on the backend
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setUser(data);
      // Optionally, show a success message
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Optionally, show an error message
    }
  };

  if (!isLoggedIn) {
    return <h1>You must log in to continue.</h1>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Profile</h2>
      {user && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || user.username}
            onChange={handleChange}
          />

          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio || user.bio}
            onChange={handleChange}
          />

     

          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
