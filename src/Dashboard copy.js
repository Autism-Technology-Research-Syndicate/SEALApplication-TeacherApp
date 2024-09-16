import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <h2>Dashboard</h2>
      <div style={styles.section}>
        <h3>Classroom Student Count</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id}>{course.name}: {course.studentCount} students</li>
          ))}
        </ul>
      </div>
      <div style={styles.section}>
        <h3>Course Management</h3>
        <Link to="/course-management">Manage Courses</Link>
      </div>
      <div style={styles.section}>
        <h3>Personal Information</h3>
        <Link to="/profile">Edit Profile</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  section: {
    marginBottom: '20px',
  },
};

export default Dashboard;
