import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import ProfileInfo from './components/ProfileInfo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/" element={<Navigate to="/registration" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 