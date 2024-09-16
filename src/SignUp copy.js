import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import Logo from './components/Logo';
import backgroundImage from './components/background.png'; // Your background image

// Fake API function to simulate a network request
const fakeRegisterAPI = (data) => {
  return new Promise((resolve, reject) => {
    // Simulate network latency
    setTimeout(() => {
      // Simulate success response 80% of the time
      if (Math.random() < 0.8) {
        resolve({ message: 'Registration successful!' });
      } else {
        reject({ message: 'Something went wrong. Please try again.' });
      }
    }, 2000); // 2-second delay
  });
};

// Validation schema for the form
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigate function for redirection

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <Logo />
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Create Account</h2>
        <Formik
          initialValues={{ name: '', email: '', phone: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
            setStatus(null); // Reset status messages
            try {
              // Call the fake API
              const response = await fakeRegisterAPI(values);
              setStatus({ success: response.message });

              // Show success message for 3 seconds and then navigate to login page
              setTimeout(() => {
                navigate('/signin'); // Redirect to login page after 3 seconds
              }, 3000);

              resetForm();
            } catch (error) {
              setStatus({ error: error.message || 'Registration failed.' });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <Field type="text" name="name" style={styles.input} />
                <ErrorMessage name="name" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <Field type="email" name="email" style={styles.input} />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="phone" style={styles.label}>Phone</label>
                <Field type="text" name="phone" style={styles.input} />
                <ErrorMessage name="phone" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <Field type="password" name="password" style={styles.input} />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
                <Field type="password" name="confirmPassword" style={styles.input} />
                <ErrorMessage name="confirmPassword" component="div" style={styles.error} />
              </div>

              <ReCAPTCHA
                sitekey="your_site_key"
                onChange={(value) => console.log('Captcha value:', value)}
                style={styles.captcha}
              />

              {status && status.success && (
                <div style={styles.successMessage}>
                  {status.success} <br />
                  Redirecting to login page...
                </div>
              )}
              {status && status.error && (
                <div style={styles.errorMessage}>{status.error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting ? styles.submitButtonDisabled : {}),
                }}
              >
                {isSubmitting ? 'Registering...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <p style={styles.footerText}>
          Already have an account? <Link to="/signin" style={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '0 20px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for contrast
    zIndex: 1,
  },
  formWrapper: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slight transparency for the background effect
    padding: '50px 40px',
    borderRadius: '15px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
    backdropFilter: 'blur(10px)', // Frosted glass effect
  },
  heading: {
    fontSize: '2.8rem',
    color: '#333',
    marginBottom: '25px',
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#444',
    fontFamily: "'Roboto', sans-serif",
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
  },
  error: {
    color: '#e74c3c',
    marginTop: '5px',
    fontSize: '0.9rem',
  },
  captcha: {
    margin: '20px 0',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Vibrant gradient
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background 0.3s ease',
    fontFamily: "'Poppins', sans-serif",
  },
  submitButtonDisabled: {
    background: 'gray',
    cursor: 'not-allowed',
  },
  successMessage: {
    color: '#27ae60',
    marginBottom: '15px',
    fontSize: '0.9rem',
  },
  errorMessage: {
    color: '#e74c3c',
    marginBottom: '15px',
    fontSize: '0.9rem',
  },
  footerText: {
    marginTop: '20px',
    fontSize: '0.9rem',
  },
  link: {
    color: '#2980b9',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SignUp;
