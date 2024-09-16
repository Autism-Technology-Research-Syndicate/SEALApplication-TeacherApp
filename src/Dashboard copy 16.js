import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, TextField, MenuItem } from '@mui/material'; // Material-UI
import logo from './components/Logo.png'; 
import { TimePicker } from '@mui/x-date-pickers'; // Ensure you have @mui/x-date-pickers installed
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import Day.js adapter
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Simulate data with updated fields
const classes = [
  { id: 1, name: 'Math 1', teacher: 'John Smith', time: 'Mon, Wed, Fri 10:00 AM - 12:00 PM' },
  { id: 2, name: 'Science 2', teacher: 'Jane Doe', time: 'Tue, Thu 1:00 PM - 3:00 PM' },
  { id: 3, name: 'History 3', teacher: 'Emily Davis', time: 'Mon, Wed 9:00 AM - 11:00 AM' },
];

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [editClass, setEditClass] = useState(null);
  const [newClass, setNewClass] = useState({ name: '', teacher: '', days: [], startTime: null, endTime: null });
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    if (section === 'course-management') {
      navigate('/course-management');
    } else if (section === 'profile') {
      navigate('/profile');
    } else {
      setSelectedSection(section);
    }
  };

  const handleUserProfile = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    setSelectedSection('home');
  };

  const handleAddClass = () => {
    // Add new class logic here
    console.log('New Class Added:', newClass);
    setNewClass({ name: '', teacher: '', days: [], startTime: null, endTime: null });
  };

  const handleEditClass = (classId) => {
    // Find the class to edit
    const classToEdit = classes.find(c => c.id === classId);
    setEditClass(classToEdit);
  };

  const handleDeleteClass = (classId) => {
    // Delete class logic here
    console.log('Class Deleted:', classId);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <a href="https://www.autrs.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Company Logo" style={styles.logo} /> 
        </a>
        <div style={styles.sidebarMenu}>
          <Button
            style={selectedSection === 'home' ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={handleHomeClick}
          >
            Home
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
      </div>
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <Button variant="outlined" color="primary" onClick={handleUserProfile} style={styles.userButton}>
            User: John Doe
          </Button>
        </div>
        {selectedSection === 'home' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={styles.cardTitle}>
                    Course Management
                  </Typography>
                  <TextField
                    label="Search Courses"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    // Implement search functionality here
                  />
                  <ul>
                    {classes.map(course => (
                      <li key={course.id} style={styles.listItem}>
                        {course.name}: Taught by {course.teacher} <br />
                        Time: {course.time} <br />
                        <Button variant="outlined" color="secondary" onClick={() => handleEditClass(course.id)}>
                          Edit
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDeleteClass(course.id)}>
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button variant="contained" color="primary" onClick={() => setSelectedSection('add-class')}>
                    Add New Class
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
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
          </Grid>
        )}
        {selectedSection === 'add-class' && (
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
    backgroundImage: 'url(https://yourbackgroundimageurl.com)',
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
};

export default Dashboard;
