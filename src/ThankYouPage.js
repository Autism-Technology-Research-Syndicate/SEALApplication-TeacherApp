import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5); // Countdown state

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/signin'); // Redirect to sign-in page when countdown finishes
    }
  }, [seconds, navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thank You for Signing Up!</h1>
      <p style={styles.message}>You will be redirected to the login page in {seconds} seconds.</p>
      <button onClick={() => navigate('/signin')} style={styles.button}>
        Go to Login Page
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f9fc',
    padding: '0 20px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2575fc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default ThankYouPage;
