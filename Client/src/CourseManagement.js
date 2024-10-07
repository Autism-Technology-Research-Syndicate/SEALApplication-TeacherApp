import React, { useState } from 'react';

// Simulate data
const initialCourses = [
  { id: 1, name: 'Math', description: 'Mathematics course' },
  { id: 2, name: 'Science', description: 'Science course' },
  { id: 3, name: 'History', description: 'History course' },
];

const CourseManagement = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description) {
      setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
      setNewCourse({ name: '', description: '' });
    }
  };

  const handleUpdateCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(course => (course.id === editingCourse.id ? editingCourse : course)));
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
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
            {course.name}: {course.description}
            <button
              onClick={() => setEditingCourse(course)}
              style={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCourse(course.id)}
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
