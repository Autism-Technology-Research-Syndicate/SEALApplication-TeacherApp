import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ThankYouPage from './ThankYouPage';
import Dashboard from './Dashboard';
import CourseManagement from './CourseManagement';
import Profile from './Profile';

const App = () => (
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course-management" element={<CourseManagement />} /> {/* Course Management page */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<SignIn />} /> {/* Default route */}
    </Routes>
  </Router>
);

export default App;
