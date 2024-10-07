// Classroom.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Classroom = ({ classes, courseNameColor, onAddClass }) => {
  return (
    <Card style={styles.card}>
      <CardContent>
        <Typography variant="h5" gutterBottom style={styles.cardTitle}>
          Classroom Information
        </Typography>
        <ul>
          {classes.map(course => (
            <li key={course.room_id} style={styles.listItem}>
              <Typography style={{ fontStyle: 'italic', color: courseNameColor }}>{course.course_name}</Typography>
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
        <Button variant="contained" color="primary" onClick={onAddClass}>
          Add New Class
        </Button>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
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
};

export default Classroom;
