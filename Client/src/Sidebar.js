import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from './components/Logo.png'; // Adjust the path as necessary

const Sidebar = ({ selectedSection, onSectionChange }) => {
  return (
    <div style={styles.sidebar}>
      <div onClick={() => onSectionChange('home')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Company Logo" style={styles.logo} />
      </div>

      <div style={styles.sidebarMenu}>
        <Button
          style={selectedSection === 'home' ? styles.sidebarButtonActive : styles.sidebarButton}
          onClick={() => onSectionChange('home')}
        >
          Home
        </Button>

        <Button
          component={Link}
          to="/classroom"
          style={styles.sidebarButton}
        >
          Classroom
        </Button>
        <Button
          component={Link}
          to="/course-management"
          style={styles.sidebarButton}
        >
          Course Management
        </Button>
        <Button
          component={Link}
          to="/profile"
          style={styles.sidebarButton}
        >
          Personal Information
        </Button>
      </div>
    </div>
  );
};

const styles = {
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
    cursor: 'pointer',
  },
  sidebarButtonActive: {
    backgroundColor: '#e0e0e0',
    transform: 'scale(0.98)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
};

export default Sidebar;