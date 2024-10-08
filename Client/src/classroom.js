import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import axios from './axiosInstance';

const Classroom = ({ setSelectedSection }) => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', teacher: '', days: [], startTime: null, endTime: null, capacity: '' });
  const [editClassId, setEditClassId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/rooms/search');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleSaveClass = async () => {
    try {
      if (editClassId) {
        await axios.put(`/rooms/update/${editClassId}`, newClass);
        setSuccessMessage('Successfully updated the room.');
      } else {
        await axios.post('/rooms/insert', newClass);
        setSuccessMessage('Successfully added the room.');
      }
      setNewClass({ name: '', teacher: '', days: [], startTime: null, endTime: null, capacity: '' });
      setEditClassId(null);
      setShowForm(false);
      setSelectedSection('classroom');
      const response = await axios.get('/rooms/search');
      setClasses(response.data);
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  const handleEditClass = (room) => {
    setNewClass({
      name: room.course_name,
      teacher: room.teacher_name,
      days: room.days,
      startTime: room.start_time,
      endTime: room.end_time,
      capacity: room.capacity,
    });
    setEditClassId(room.room_id);
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleDeleteClass = async (classId) => {
    try {
      await axios.delete(`/rooms/delete/${classId}`);
      const response = await axios.get('/rooms/search');
      setClasses(response.data);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleAddNewRoom = () => {
    setNewClass({ name: '', teacher: '', days: [], startTime: null, endTime: null, capacity: '' });
    setEditClassId(null);
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <Card style={styles.card}>
      <CardContent>
        <div style={styles.header}>
          <Typography variant="h5" gutterBottom style={styles.cardTitle}>
            Classroom Information
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddNewRoom}>
            Add New Room
          </Button>
        </div>
        <ul>
          {classes.map(room => (
            <li key={room.room_id} style={styles.listItem}>
              <Typography style={{ fontStyle: 'italic' }}>{room.course_name}</Typography>
              <Typography style={{ fontWeight: 'bold', color: 'black' }}>Taught by: {room.teacher_name}</Typography>
              <Typography style={{ color: 'black', fontSize: '1.0rem', fontWeight: 'bold' }}>
                Start Time: {new Date(room.start_time).toLocaleString('en-US', { timeZone: 'America/New_York' })}
              </Typography>
              <Typography style={{ color: 'black', fontSize: '1.0rem', fontWeight: 'bold' }}>
                End Time: {new Date(room.end_time).toLocaleString('en-US', { timeZone: 'America/New_York' })}
              </Typography>
              <Typography style={{ fontWeight: 'bold', color: 'black' }}>Capacity: {room.capacity}</Typography>
              <Button variant="outlined" color="secondary" onClick={() => handleEditClass(room)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteClass(room.room_id)}>
                Delete
              </Button>
              <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
            </li>
          ))}
        </ul>

        {showForm && (
          <div ref={formRef}>
            <Typography variant="h6" gutterBottom style={styles.cardTitle}>
              {editClassId ? 'Edit Class' : 'Add New Class'}
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
              label="Capacity"
              value={newClass.capacity}
              onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Days"
              value={newClass.days}
              onChange={(e) => setNewClass({ ...newClass, days: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Start Time"
              type="time"
              value={newClass.startTime}
              onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="End Time"
              type="time"
              value={newClass.endTime}
              onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSaveClass}>
              {editClassId ? 'Update Class' : 'Add Class'}
            </Button>
          </div>
        )}

        {successMessage && (
          <Typography style={{ color: 'green', marginTop: '20px' }}>
            {successMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const styles = {
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
};

export default Classroom;