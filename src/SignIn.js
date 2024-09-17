import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import Logo from './components/Logo';
import { useNavigate } from 'react-router-dom'; // For navigation
import backgroundImage from './components/background.png'; // Import the new background

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

// Fake API function to simulate login
const fakeLoginAPI = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email === 'test@example.com' && values.password === 'password123') {
        resolve({ success: true });
      } else {
        reject({ message: 'Invalid email or password' });
      }
    }, 2000); // Simulate 2-second network delay
  });
};

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <Logo />
        <h2 style={styles.title}>Sign In</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              // Call the fake login API
              const response = await fakeLoginAPI(values);
              if (response.success) {
                navigate('/dashboard'); // Redirect to dashboard on success
              }
            } catch (error) {
              setErrors({ email: error.message }); // Set form error
            } finally {
              setSubmitting(false); // Stop the loading spinner
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <Field type="email" name="email" style={styles.input} />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <Field type="password" name="password" style={styles.input} />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>
              <ReCAPTCHA
                sitekey="your_site_key"
                onChange={(value) => console.log('Captcha value:', value)}
                style={styles.recaptcha}
              />
              <button type="submit" disabled={isSubmitting} style={styles.button}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
        <p style={styles.signUpText}>Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link></p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '5px',
    display: 'block',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '5px',
  },
  recaptcha: {
    margin: '20px 0',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
  },
  signUpText: {
    marginTop: '20px',
    fontSize: '0.9rem',
    color: '#333',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default SignIn;