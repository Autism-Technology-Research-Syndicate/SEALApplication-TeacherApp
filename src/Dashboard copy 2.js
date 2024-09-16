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

  return (
    <div style={styles.container}>
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Classroom Student Count
              </Typography>
              <ul>
                {courses.map(course => (
                  <li key={course.id}>
                    {course.name}: {course.studentCount} students
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
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
          <Card>
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
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5', // Light grey background
  },
};

export default Dashboard;
