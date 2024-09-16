import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com', phone: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate password confirmation
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle profile update logic
    console.log('Updated user:', user);
  };

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>Phone</label>
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>New Password</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.submitButton}>Save</button>
      </form>
    </div>
  );
};

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
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Profile;
