import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Path sesuai dengan lokasi LoginPage
import Home from './pages/Home';
import Form from './pages/Form';
import History from './pages/History';
import Profile from './pages/Profile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect ke halaman login */}
      </Routes>
    </Router>
  );
}

export default App;
