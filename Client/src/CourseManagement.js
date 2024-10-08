import React, { useState, useEffect } from 'react';
import axios from './axiosInstance'; // Use custom Axios instance

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ name: '' });

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
    if (newCourse.name && newCourse.description) {
      try {
        const response = await axios.post('/courses/insert', newCourse);
        setCourses([...courses, response.data]);
        setNewCourse({ name: ''});
      } catch (error) {
        console.error('Error adding course:', error);
      }
    }
  };

  const handleUpdateCourse = async () => {
    if (editingCourse) {
      try {
        await axios.put(`/courses/update/${editingCourse.id}`, editingCourse);
        setCourses(courses.map(course => (course.id === editingCourse.id ? editingCourse : course)));
        setEditingCourse(null);
      } catch (error) {
        console.error('Error updating course:', error);
      }
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/courses/delete/${courseId}`);
      setCourses(courses.filter(course => course.course_id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Course Management</h2>
      
      <div style={styles.formContainer}>
        <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={editingCourse ? editingCourse.name : newCourse.name}
          onChange={(e) => {
            if (editingCourse) {
              setEditingCourse({ ...editingCourse, name: e.target.value });
            } else {
              setNewCourse({ ...newCourse, name: e.target.value });
            }
          }}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Course Description"
          value={editingCourse ? editingCourse.description : newCourse.description}
          onChange={(e) => {
            if (editingCourse) {
              setEditingCourse({ ...editingCourse, description: e.target.value });
            } else {
              setNewCourse({ ...newCourse, description: e.target.value });
            }
          }}
          style={styles.input}
        />
        <button
          onClick={editingCourse ? handleUpdateCourse : handleAddCourse}
          style={styles.button}
        >
          {editingCourse ? 'Update Course' : 'Add Course'}
        </button>
      </div>
      
      <ul style={styles.courseList}>
        {courses.map(course => (
          <li key={course.id} style={styles.courseItem}>
            <strong>{course.course_name}</strong>: {course.description}
            {/* Display additional course information if available */}
            {course.instructor && <div>Instructor: {course.instructor}</div>}
            {course.duration && <div>Duration: {course.duration} hours</div>}
            {course.credits && <div>Credits: {course.credits}</div>}
            {course.schedule && <div>Schedule: {course.schedule}</div>}
            <button
              onClick={() => setEditingCourse(course)}
              style={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCourse(course.course_id)}
              style={styles.deleteButton}
            >
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