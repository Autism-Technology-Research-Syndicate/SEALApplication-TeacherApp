import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'; // Import from Material-UI
import logo from './components/Logo.png'; // Import the local image

// Simulate data
const classes = [
  { id: 1, name: 'Math', studentCount: 30 },
  { id: 2, name: 'Science', studentCount: 25 },
  { id: 3, name: 'History', studentCount: 20 },
];

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('classroom'); // Default section

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <a href="https://www.autrs.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Company Logo" style={styles.logo} /> {/* Use the local image */}
        </a>
        <div style={styles.sidebarMenu}>
          <Button
            style={selectedSection === 'classroom' ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={() => handleSectionChange('classroom')}
          >
            Classroom
          </Button>
          <Button
            style={selectedSection === 'course-management' ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={() => handleSectionChange('course-management')}
          >
            Course Management
          </Button>
          <Button
            style={selectedSection === 'profile' ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={() => handleSectionChange('profile')}
          >
            Personal Information
          </Button>
        </div>
      </div>
      <div style={styles.mainContent}>
        {selectedSection === 'classroom' && (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Classroom Student Count
              </Typography>
              <ul>
                {classes.map(course => (
                  <li key={course.id}>
                    {course.name}: {course.studentCount} students
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        {selectedSection === 'course-management' && (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Course Management
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/course-management">
                Manage Courses
              </Button>
            </CardContent>
          </Card>
        )}
        {selectedSection === 'profile' && (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/profile">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5', // Light grey background
    backgroundImage: 'url(https://yourbackgroundimageurl.com)', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto', // Ensures sidebar content is scrollable
  },
  logo: {
    width: '150px',
    height: 'auto',
    marginBottom: '20px',
  },
  sidebarMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  sidebarButton: {
    width: '100%',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    color: '#333',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  sidebarButtonActive: {
    backgroundColor: '#c0c0c0',
    transform: 'scale(0.95)', // Sinks the button
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  mainContent: {
    marginLeft: '240px', // Adjust to account for the sidebar width
    padding: '20px',
    width: 'calc(100% - 240px)',
  },
  card: {
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
};

export default Dashboard;
