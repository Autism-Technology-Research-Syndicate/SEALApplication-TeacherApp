import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import logo from './components/Logo.png';
import axios from './axiosInstance'; // Use custom Axios instance
import Classroom from './Classroom'; // Import Classroom component
import CourseManagement from './CourseManagement'; // Import CourseManagement component

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('home'); // Default to 'home' section
  const [classes, setClasses] = useState([]); // State for classes fetched from API
  const [courses, setCourses] = useState([]); // State for courses fetched from API
  const [messages, setMessages] = useState([]); // State for messages from students
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Get location object
  const { teacherData } = location.state || {}; // Extract teacherData from state
  const userName = teacherData ? teacherData.teacher_name : ''; // Use teacher name from teacherData

  // Fetch classes and courses on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/rooms/search'); // Adjust API URL
        setClasses(response.data); // Set classes data from API
        console.log('Fetched classes:', response.data); // Log the fetched classes data
      } catch (error) {
        console.error('Error fetching classes:', error); // Log any errors
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses/search'); // Adjust API URL for courses
        setCourses(response.data); // Set courses data from API
        console.log('Fetched courses:', response.data); // Log the fetched courses data
      } catch (error) {
        console.error('Error fetching courses:', error); // Log any errors
      }
    };

    // Call the fetch functions
    fetchClasses();
    fetchCourses();
  }, []); // Make sure to include an empty dependency array to run this effect only once

  // Function to navigate to the user profile
  const handleUserProfile = () => {
    navigate('/profile', { state: { teacherData } }); // Pass teacherData
  };

  // Function to handle clicking the Home button
  const handleHomeClick = () => {
    setSelectedSection('home'); // Set selected section to 'home' to display Home content
  };

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
            style={styles.sidebarButton}
            onClick={handleUserProfile} 
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
                        <Typography style={{ fontStyle: 'italic', color: 'black' }}>{course.course_name}</Typography>
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
                    Course Information
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
          />
        ) : selectedSection === 'course-management' ? (
          <CourseManagement
            courses={courses} // Pass courses as prop
          />
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
    transform: 'scale(1.05)', // Slightly enlarge active button
  },
  mainContent: {
    flex: 1,
    marginLeft: '250px', // Make space for the sidebar
    padding: '20px',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  userButton: {
    marginLeft: 'auto',
  },
  card: {
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  listItem: {
    marginBottom: '10px',
  },
  linkButton: {
    marginTop: '15px',
  },
};

export default Dashboard;
