import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, TextField, MenuItem } from '@mui/material'; 
import logo from './components/Logo.png'; 
import { DatePicker, TimePicker } from '@mui/x-date-pickers'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from './axiosInstance'; // Use the custom Axios instance

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null); // State to manage selected section
  const [editClass, setEditClass] = useState(null); // State to manage class being edited
  const [newClass, setNewClass] = useState({ name: '', teacher: '', days: [], startTime: null, endTime: null }); // State for new class information
  const [classes, setClasses] = useState([]); // State for classes fetched from API
  const [courses, setCourses] = useState([]); // State for courses fetched from API
  const userName = 'John Doe'; // Simulating logged-in user's name; replace this with actual logic if needed
  const navigate = useNavigate(); // Hook for navigation

  // Fetch classroom data from backend API when the component mounts
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
  const handleSectionChange = (section) => {
    setSelectedSection(section); // Update the selected section state
  };

  // Function to navigate to the user profile
  const handleUserProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  // Function to handle clicking the Home button
  const handleHomeClick = () => {
    setSelectedSection(null); // Reset selected section to show the home view
  };

  // Function to handle adding a new class
  const handleAddClass = async () => {
    try {
      const response = await axios.post('/courses/insert', newClass); // Call API to add new class
      setClasses([...classes, response.data]); // Update classes state with the newly added class
      setNewClass({ name: '', teacher: '', days: [], startTime: null, endTime: null }); // Reset new class form
    } catch (error) {
      console.error('Error adding class:', error); // Log any errors
    }
  };

  // Function to handle editing a class
  const handleEditClass = (classId) => {
    const classToEdit = classes.find(c => c.id === classId); // Find class to edit by ID
    setEditClass(classToEdit); // Set the class to be edited
  };

  // Function to handle deleting a class
  const handleDeleteClass = async (classId) => {
    try {
      await axios.delete(`/courses/${classId}`); // Call API to delete the class
      setClasses(classes.filter(c => c.id !== classId)); // Remove the deleted class from state
    } catch (error) {
      console.error('Error deleting class:', error); // Log any errors
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <a href="https://www.autrs.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Company Logo" style={styles.logo} /> 
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
            User: {userName} {/* Display logged-in user's name */}
          </Button>
        </div>
        {selectedSection === null ? (
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
                  <Button variant="contained" color="primary" onClick={() => setSelectedSection('add-class')}>
                    Add New Class
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                    Course Management
                  </Typography>
                  <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {courses.slice(0, 10).map(course => ( // Show only the first 10 courses
                      <li key={course.course_id} style={styles.listItem}>
                        <Typography style={{ fontWeight: 'bold', color: 'black' }}>{course.course_name}</Typography>
                      </li>
                    ))}
                  </ul>
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
                  <Typography style={{ color: 'black' }}>Name: {userName}</Typography>
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
                Classroom Information
              </Typography>
              <ul>
                {classes.map(course => (
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
              <Button variant="contained" color="primary" onClick={() => setSelectedSection('add-class')}>
                Add New Class
              </Button>
            </CardContent>
          </Card>
        ) : selectedSection === 'add-class' ? (
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                Add New Class
              </Typography>
              <TextField
                label="Class Name"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teacher's Name"
                value={newClass.teacher}
                onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Days of the Week"
                value={newClass.days}
                onChange={(e) => setNewClass({ ...newClass, days: e.target.value })}
                fullWidth
                margin="normal"
                SelectProps={{
                  multiple: true,
                }}
              >
                <MenuItem value="Mon">Monday</MenuItem>
                <MenuItem value="Tue">Tuesday</MenuItem>
                <MenuItem value="Wed">Wednesday</MenuItem>
                <MenuItem value="Thu">Thursday</MenuItem>
                <MenuItem value="Fri">Friday</MenuItem>
                <MenuItem value="Sat">Saturday</MenuItem>
                <MenuItem value="Sun">Sunday</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={newClass.startTime}
                  onChange={(newValue) => setNewClass({ ...newClass, startTime: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <TimePicker
                  label="End Time"
                  value={newClass.endTime}
                  onChange={(newValue) => setNewClass({ ...newClass, endTime: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </LocalizationProvider>
              <Button variant="contained" color="primary" onClick={handleAddClass}>
                Add Class
              </Button>
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
    position: 'fixed',
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
  },
  sidebarButtonActive: {
    backgroundColor: '#e0e0e0',
    transform: 'scale(0.98)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  mainContent: {
    marginLeft: '270px',
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
  timeContainer: {
    marginTop: '10px',
    marginBottom: '10px',
  },
};

export default Dashboard;
