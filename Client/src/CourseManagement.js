import React, { useState, useEffect } from 'react';
import axios from './axiosInstance'; // Use custom Axios instance

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '' });
  const [editingCourse, setEditingCourse] = useState(null); // Tracks the course being edited
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  // Fetch courses from API when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses/search');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (newCourse.name) {
      try {
        const response = await axios.post('/courses/insert', { courseName: newCourse.name });
        setCourses([...courses, response.data]);
        resetForm(false); // Reset the form after adding a course
      } catch (error) {
        console.error('Error adding course:', error);
      }
    } else {
      alert('Please enter a course name.');
    }
  };

  const handleUpdateCourse = async () => {
    if (editingCourse) {
      try {
        await axios.put(`/courses/update/${editingCourse.course_id}`, { courseName: editingCourse.course_name });
        setCourses(courses.map(course => (course.course_id === editingCourse.course_id ? editingCourse : course)));
        resetForm(); // Reset after updating
      } catch (error) {
        console.error('Error updating course:', error);
      }
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/courses/delete/${courseId}`);
        setCourses(courses.filter(course => course.course_id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course); // Set the course being edited
    setShowForm(true); // Show the form when editing
  };

  const resetForm = (clearNewCourse = false) => {
    if (clearNewCourse) {
      setNewCourse({ name: '' });
    }
    setEditingCourse(null);
    setShowForm(false);
  };
  

  return (
    <div style={styles.container}>
      <h2>Course Management</h2>
      
      {!showForm && (
        <button onClick={() => setShowForm(true)} style={styles.addButton}>
          Add New Course
        </button>
      )}

      {showForm && (
        <div style={styles.formContainer}>
          <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
          <input
            type="text"
            placeholder="Course Name"
            value={editingCourse ? editingCourse.course_name : newCourse.name} // Show course_name when editing
            onChange={(e) => {
              if (editingCourse) {
                setEditingCourse({ ...editingCourse, course_name: e.target.value }); // Update course_name when editing
              } else {
                setNewCourse({ ...newCourse, name: e.target.value }); // Update newCourse name
              }
            }}
            style={styles.input}
          />
          <button
            onClick={editingCourse ? handleUpdateCourse : handleAddCourse} // Toggle between add and update
            style={styles.button}
          >
            {editingCourse ? 'Update Course' : 'Add Course'}
          </button>
          <button onClick={resetForm} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      )}

      <ul style={styles.courseList}>
        {courses.map(course => (
          <li key={course.course_id} style={styles.courseItem}>
            <strong>{course.course_name}</strong>
            <button onClick={() => handleEditCourse(course)} style={styles.editButton}>
              Edit
            </button>
            <button onClick={() => handleDeleteCourse(course.course_id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  formContainer: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  courseList: {
    listStyleType: 'none',
    padding: 0,
  },
  courseItem: {
    marginBottom: '10px',
  },
  editButton: {
    marginLeft: '10px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CourseManagement;
