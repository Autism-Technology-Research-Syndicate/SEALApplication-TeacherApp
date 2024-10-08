import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, TextField, MenuItem } from '@mui/material'; // Ensure MenuItem is imported
import logo from './components/Logo.png';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from './axiosInstance'; // Use custom Axios instance
import Classroom from './Classroom'; // Import Classroom component

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('home'); // Default to 'home' section
   const [classes, setClasses] = useState([]); // State for classes fetched from API
  const [courses, setCourses] = useState([]); // State for courses fetched from API
  const [messages, setMessages] = useState([]); // State for messages from students
  const userName = ''; // Simulating logged-in user's name; replace this with actual logic if needed
  const navigate = useNavigate(); // Hook for navigation

  // Fetch classroom and course data from backend API when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/rooms/search'); // Adjust API URL
        setClasses(response.data); // Set classes data from API
      } catch (error) {
        console.error('Error fetching classes:', error); // Log any errors
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses/search'); // Adjust API URL for courses
        setCourses(response.data); // Set courses data from API
      } catch (error) {
        console.error('Error fetching courses:', error); // Log any errors
      }
    };

    fetchClasses(); // Fetch classes
    fetchCourses(); // Fetch courses
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to handle section change

  // Function to navigate to the user profile
  const handleUserProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  // Function to handle clicking the Home button
  const handleHomeClick = () => {
    setSelectedSection('home'); // Set selected section to 'home' to display Home content
  };

  // Function to handle editing a class

  // Function to handle deleting a class

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {/* Clickable logo that navigates to Home */}
        <div onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Company Logo" style={styles.logo} />
        </div>

        <div style={styles.sidebarMenu}>
          <Button
            style={selectedSection === 'home' ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={handleHomeClick}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/classroom"
            style={styles.sidebarButton}
          >
            Classroom
          </Button>
          <Button
            component={Link}
            to="/course-management"
            style={styles.sidebarButton}
          >
            Course Management
          </Button>
          <Button
            component={Link}
            to="/profile"
            style={styles.sidebarButton}
          >
            Personal Information
          </Button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.header}>
          <Button variant="outlined" color="primary" onClick={handleUserProfile} style={styles.userButton}>
            User: {userName} {/* Display logged-in user's name */}
          </Button>
        </div>
        {selectedSection === 'home' ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                    Classroom Information
                  </Typography>
                  <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {classes.slice(0, 10).map(course => ( // Show only the first 10 classes
                      <li key={course.room_id} style={styles.listItem}>
                        <Typography style={{ fontStyle: 'italic', color: 'black' }}>{course.course_name}</Typography> {/* Adjust color */}
                        <Typography style={{ fontWeight: 'bold', color: 'black' }}>Taught by: {course.teacher_name}</Typography>
                        <Typography style={{ color: 'black', fontSize: '1.0rem', fontWeight: 'bold' }}>
                          Start Time: {new Date(course.start_time).toLocaleString('en-US', { timeZone: 'America/New_York' })}
                        </Typography>
                        <Typography style={{ color: 'black', fontSize: '1.0rem', fontWeight: 'bold' }}>
                          End Time: {new Date(course.end_time).toLocaleString('en-US', { timeZone: 'America/New_York' })}
                        </Typography>
                        <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
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
                    Course information
                  </Typography>
                  <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {courses.map(course => (
                      <li key={course.id} style={styles.listItem}>
                        <Typography style={{ fontStyle: 'italic', color: 'black' }}>{course.course_name}</Typography>
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
                    Messages
                  </Typography>
                  <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {messages.map((message, index) => (
                      <li key={index} style={styles.listItem}>
                        <Typography style={{ color: 'black' }}>{message}</Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : selectedSection === 'classroom' ? (
          <Classroom
            classes={classes}
            setSelectedSection={setSelectedSection}
          />
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
              <Typography style={{ color: 'black' }}>Name: {userName}</Typography>
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
    backgroundColor: '#f5f5f5',
    backgroundImage: 'url(https://yourbackgroundimageurl.com)', // Set your background image URL here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sidebar: {
    width: '250px',
    background: 'linear-gradient(135deg, #00aaff, #0044ff)',
    padding: '20px',
    boxShadow: '4px 0 8px rgba(0, 0, 0, 0.2)',
    position: 'fixed', // Ensures the sidebar is fixed on the left
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
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
    borderRadius: '12px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    color: '#333',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
  },
  sidebarButtonActive: {
    backgroundColor: '#e0e0e0',
    transform: 'scale(0.98)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  mainContent: {
    marginLeft: '270px', // Matches the sidebar width to prevent overlap
    padding: '20px',
    width: 'calc(100% - 270px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  userButton: {
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease-in-out',
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