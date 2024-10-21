import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Button, TextField, CircularProgress } from '@mui/material';
import axios from './axiosInstance';

const Classroom = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    courseName: '',
    teacherName: '',
    startTime: '', // Initialize as a string
    endTime: '',   // Initialize as a string
    capacity: '',
  });
  const [editClassId, setEditClassId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  // Fetch classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/rooms/search');
        console.log('Fetched classes:', response.data);
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Handle saving a new or edited class
  const handleSaveClass = async () => {
    if (!newClass.courseName || !newClass.teacherName || !newClass.capacity || !newClass.startTime || !newClass.endTime) {
      alert('Please fill in all fields.');
      return;
    }

    if (new Date(newClass.startTime) >= new Date(newClass.endTime)) {
      alert('Start time must be before end time.');
      return;
    }

    setLoading(true);
    try {
      const formattedClass = {
        ...newClass,
        startTime: new Date(newClass.startTime).toISOString().slice(0, 19),
        endTime: new Date(newClass.endTime).toISOString().slice(0, 19),
      };

      if (editClassId) {
        await axios.put(`/rooms/update/${editClassId}`, formattedClass);
        setSuccessMessage('Successfully updated the room.');
      } else {
        const response = await axios.post('/rooms/insert', formattedClass);
        const newRoom = response.data; // API returns the newly created room data
        console.log('New Room Data:', response.data);
        setClasses(prevClasses => [...prevClasses, newRoom]); // Add the new room to the list
        setSuccessMessage('Successfully added the room.');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving class:', error);
      alert('Error saving class. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000); // Reset message after 3 seconds
    }
  };

  // Reset the form state
  const resetForm = () => {
    setNewClass({ courseName: '', teacherName: '', startTime: '', endTime: '', capacity: '' });
    setEditClassId(null);
    setShowForm(false);
  };

  // Handle editing a class
  const handleEditClass = (room) => {
    setNewClass({
      courseName: room.course_name,
      teacherName: room.teacher_name,
      startTime: room.start_time,
      endTime: room.end_time,
      capacity: room.capacity,
    });
    setEditClassId(room.room_id);
    setShowForm(true);
    scrollToForm();
  };

  // Scroll to the form
  const scrollToForm = () => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  // Handle deleting a class
  const handleDeleteClass = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setLoading(true);
      try {
        await axios.delete(`/rooms/delete/${classId}`);
        setClasses(classes.filter(room => room.room_id !== classId)); // Remove deleted room from state
      } catch (error) {
        console.error('Error deleting class:', error);
        alert('Error deleting class. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle adding a new room
  const handleAddNewRoom = () => {
    resetForm();
    setShowForm(true);
    scrollToForm();
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <ul>
              {Array.isArray(classes) && classes.length > 0 ? (
                classes.map(room => (
                  <li key={room.room_id} style={styles.listItem}>
                    <Typography style={{ fontStyle: 'italic' }}>{room.course_name}</Typography>
                    <Typography style={{ fontWeight: 'bold', color: 'black' }}>
                      Taught by: {room.teacher_name}
                    </Typography>
                    <Typography style={{ color: 'black', fontSize: '1.0rem', fontWeight: 'bold' }}>
                      Start Time: {new Date(room.start_time).toLocaleString('en-US', { timeZone: 'America/New_York' })}
                    </Typography>
                    <Typography style={{ color: 'black', fontSize: '1.0rem', fontWeight: 'bold' }}>
                      End Time: {new Date(room.end_time).toLocaleString('en-US', { timeZone: 'America/New_York' })}
                    </Typography>
                    <Typography style={{ fontWeight: 'bold', color: 'black' }}>
                      Capacity: {room.capacity}
                    </Typography>
                    <Typography style={{ fontWeight: 'bold', color: 'black' }}>
                      Port: {room.port || 'N/A'} {/* Display the port */}
                    </Typography>
                    <img src={room.qr_code_data_url || ''} alt="QR Code" style={styles.qrCodeImage} /> {/* Display QR Code */}
                    <Button variant="outlined" color="secondary" onClick={() => handleEditClass(room)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteClass(room.room_id)}>
                      Delete
                    </Button>
                    <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
                  </li>
                ))
              ) : (
                <Typography style={{ color: 'black' }}>
                  No classes available. Please add a new class.
                </Typography>
              )}
            </ul>
            {showForm || classes.length === 0 ? (
              <div ref={formRef}>
                <Typography variant="h6" gutterBottom style={styles.cardTitle}>
                  {editClassId ? 'Edit Class' : 'Add New Class'}
                </Typography>
                <TextField
                  label="Class Name"
                  value={newClass.courseName}
                  onChange={(e) => setNewClass({ ...newClass, courseName: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Teacher's Name"
                  value={newClass.teacherName}
                  onChange={(e) => setNewClass({ ...newClass, teacherName: e.target.value })}
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
                  label="Start Time"
                  type="datetime-local" // Use datetime-local to allow manual input of date and time
                  value={newClass.startTime.substring(0, 16)} // Keep to minutes
                  onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="End Time"
                  type="datetime-local" // Use datetime-local to allow manual input of date and time
                  value={newClass.endTime.substring(0, 16)} // Keep to minutes
                  onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSaveClass}>
                  {editClassId ? 'Update Class' : 'Add Class'}
                </Button>
                {successMessage && <Typography style={{ color: 'green' }}>{successMessage}</Typography>}
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    margin: '20px',
    padding: '20px',
  },
  cardTitle: {
    marginBottom: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItem: {
    margin: '10px 0',
  },
  qrCodeImage: {
    width: '100px',
    height: '100px',
    margin: '10px 0',
  },
};

export default Classroom;
