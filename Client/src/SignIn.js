import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from './components/Logo';
import backgroundImage from './components/background.png'; // Import the new background
import axios from 'axios'; // Import Axios for API calls

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

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
              // 调用实际的登录 API
              const response = await axios.post('http://localhost:3001/api/teachers/login', values, {
                headers: {
                  'Content-Type': 'application/json', // 设置正确的头部信息
                },
                withCredentials: true, // 如果你的API需要跨域携带cookie
              });
              
              // 登录成功，存储 token 并重定向
              if (response.data.token) {
                localStorage.setItem('token', response.data.token); // 可以存储 token 以备后续使用
                navigate('/dashboard'); // 登录成功后重定向
              }
            } catch (error) {
              // 错误处理
              if (error.response) {
                setErrors({ email: error.response.data.message }); // 使用 API 返回的错误消息
              } else {
                setErrors({ email: 'An unexpected error occurred' }); // 处理未知错误
              }
            } finally {
              setSubmitting(false); // 停止加载状态
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
              <button type="submit" disabled={isSubmitting} style={styles.button}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
        <p style={styles.signUpText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
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
