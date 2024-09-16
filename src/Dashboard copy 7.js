import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'; // Import from Material-UI

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
        <Button
          style={styles.sidebarButton}
          onClick={() => handleSectionChange('classroom')}
        >
          Classroom
        </Button>
        <Button
          style={styles.sidebarButton}
          onClick={() => handleSectionChange('course-management')}
        >
          Course Management
        </Button>
        <Button
          style={styles.sidebarButton}
          onClick={() => handleSectionChange('profile')}
        >
          Personal Information
        </Button>
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
    width: '200px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sidebarButton: {
    width: '100%',
    marginBottom: '10px',
    textAlign: 'center',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    padding: '10px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e0e0e0',
      color: '#000',
    },
  },
  mainContent: {
    marginLeft: '220px',
    padding: '20px',
    width: 'calc(100% - 220px)',
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
