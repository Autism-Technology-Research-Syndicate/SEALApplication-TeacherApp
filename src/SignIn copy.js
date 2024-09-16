import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import Logo from './components/Logo';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

// 验证规则
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

// 假数据（账号和密码）
const fakeUser = {
  email: 'test@example.com',
  password: 'password123',
};

// Sign In 组件
const SignIn = () => {
  const navigate = useNavigate(); // 使用 useNavigate 钩子来导航

  return (
    <div style={styles.container}>
      <Logo />
      <h2>Sign In</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          // 模拟登录验证
          if (values.email === fakeUser.email && values.password === fakeUser.password) {
            // 如果账号和密码匹配，跳转到管理页面
            navigate('/course-management');
          } else {
            // 如果验证失败，设置错误信息
            setErrors({ email: 'Invalid email or password' });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <ReCAPTCHA
              sitekey="your_site_key"
              onChange={(value) => console.log('Captcha value:', value)}
            />
            <button type="submit" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

// 样式
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default SignIn;
