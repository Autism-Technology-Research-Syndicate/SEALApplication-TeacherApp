import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'; // Import from Material-UI

// Simulate data
const classes = [
  { id: 1, name: 'Math', studentCount: 30 },
  { id: 2, name: 'Science', studentCount: 25 },
  { id: 3, name: 'History', studentCount: 20 },
];

const Dashboard = () => {
  const [courses, setCourses] = useState(classes);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [isExpanded, setIsExpanded] = useState(false);

  // Pretend to get data
  useEffect(() => {
    // 这里可以添加获取数据的逻辑
  }, []);

  const handleCourseUpdate = (courseId, updatedCourse) => {
    setCourses(courses.map(course => (course.id === courseId ? updatedCourse : course)));
  };

  const handleCourseDelete = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/profile" style={styles.userInfo}>
          {user.name}
        </Link>
      </div>
      <div style={styles.dashboard}>
        <Typography variant="h2" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Classroom Student Count
                </Typography>
                {isExpanded ? (
                  <div>
                    <ul>
                      {courses.map(course => (
                        <li key={course.id}>
                          {course.name}: {course.studentCount} students
                        </li>
                      ))}
                    </ul>
                    <Button variant="outlined" color="primary" onClick={toggleExpand}>
                      Minimize
                    </Button>
                  </div>
                ) : (
                  <Button variant="outlined" color="primary" onClick={toggleExpand}>
                    Maximize
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5', // Light grey background
    backgroundImage: 'url(https://yourbackgroundimageurl.com)', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
  },
  header: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  userInfo: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '1px solid #ffffff',
    borderRadius: '4px',
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly transparent background for readability
  },
  dashboard: {
    maxWidth: '800px',
    width: '100%',
    backgroundColor: '#ffffff', // White background for the dashboard
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    opacity: 0.9, // Fade effect
    position: 'relative', // For correct positioning of header
  },
  card: {
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Dashboard;
