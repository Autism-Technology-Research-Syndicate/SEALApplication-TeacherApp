import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'; // Import from Material-UI
import logo from './components/Logo.png'; // Import the local image

// Simulate data
const classes = [
  { id: 1, name: 'Math', studentCount: 30 },
  { id: 2, name: 'Science', studentCount: 25 },
  { id: 3, name: 'History', studentCount: 20 },
];

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null); // Default to showing all sections
  const navigate = useNavigate();
  
  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleUserProfile = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    setSelectedSection(null); // Reset to show all sections
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <a href="https://www.autrs.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Company Logo" style={styles.logo} /> {/* Use the local image */}
        </a>
        <div style={styles.sidebarMenu}>
          <Button
            style={selectedSection === null ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={handleHomeClick}
          >
            Home
          </Button>
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
        <div style={styles.header}>
          <Button variant="outlined" color="primary" onClick={handleUserProfile} style={styles.userButton}>
            User: John Doe
          </Button>
        </div>
        {selectedSection === null ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                    Classroom Student Count
                  </Typography>
                  <ul>
                    {classes.map(course => (
                      <li key={course.id} style={styles.listItem}>
                        {course.name}: {course.studentCount} students
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                    Course Management
                  </Typography>
                  <Button variant="contained" color="primary" component={Link} to="/course-management" style={styles.linkButton}>
                    Manage Courses
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                    Personal Information
                  </Typography>
                  <Button variant="contained" color="primary" component={Link} to="/profile" style={styles.linkButton}>
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : selectedSection === 'classroom' ? (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                Classroom Student Count
              </Typography>
              <ul>
                {classes.map(course => (
                  <li key={course.id} style={styles.listItem}>
                    {course.name}: {course.studentCount} students
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : selectedSection === 'course-management' ? (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                Course Management
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/course-management" style={styles.linkButton}>
                Manage Courses
              </Button>
            </CardContent>
          </Card>
        ) : selectedSection === 'profile' && (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                Personal Information
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/profile" style={styles.linkButton}>
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
    width: '250px',
    background: 'linear-gradient(135deg, #00aaff, #0044ff)', // Gradient background
    padding: '20px',
    boxShadow: '4px 0 8px rgba(0, 0, 0, 0.2)',
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
    borderRadius: '12px', // Rounded corners
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    color: '#333',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  sidebarButtonActive: {
    backgroundColor: '#e0e0e0',
    transform: 'scale(0.98)', // Sinks the button
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  mainContent: {
    marginLeft: '270px', // Adjust to account for the sidebar width
    padding: '20px',
    width: 'calc(100% - 270px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  userButton: {
    borderRadius: '12px', // Rounded corners
    fontSize: '16px',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  listItem: {
    fontSize: '16px',
    padding: '5px 0',
  },
  linkButton: {
    marginTop: '10px',
  },
};

export default Dashboard;
