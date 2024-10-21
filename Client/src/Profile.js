import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from './axiosInstance'; // Use custom Axios instance

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { teacherData } = location.state || {}; // Extract teacherData
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Simulate fetching user data after login
  useEffect(() => {
    if (teacherData) {
      // Set user data from teacherData
      setUserInfo({
        email: teacherData.teacher_email, // Email should be read-only
        name: teacherData.teacher_name,     // Automatically fill name
        phone: teacherData.phone,           // Automatically fill phone
        password: '',                       // Initial empty password
        confirmPassword: '',                // Initial empty confirm password
      });
    }
  }, [teacherData]); // Add teacherData as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value }); // Update userInfo state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate password confirmation
    if (userInfo.password !== userInfo.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Update user information via API
      const response = await axios.put('/teachers/update', {
        name: userInfo.name,
        password: userInfo.password,
        confirm_password: userInfo.confirmPassword,
        phone: userInfo.phone,
      });

      if (response.status === 200) {
        alert('Information updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('Failed to update information. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input type="email" name="email" value={userInfo.email} onChange={handleChange} style={styles.input} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input type="text" name="name" value={userInfo.name} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>Phone</label>
          <input type="tel" name="phone" value={userInfo.phone} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>New Password</label>
          <input type="password" name="password" value={userInfo.password} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
          <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.submitButton}>Save</button>
      </form>
    </div>
  );
};

// Styles for the profile form
const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  submitButton: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Profile;
