import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import ImageUploadPage from './pages/ImageUploadPage';
import VideoUploadPage from './pages/VideoUploadPage';
import CameraLivePage from './pages/CameraLivePage';
import './MainRouter.css'; // CSS dosyasını dahil et

const MainRouter: React.FC = () => {
  return (
    <Router>
      <div className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/image">Image Upload</Link>
        <Link to="/video">Video Upload</Link>
        <Link to="/camera">Live Camera</Link>
      </div>

      <div style={{ marginLeft: '200px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/image" element={<ImageUploadPage />} />
          <Route path="/video" element={<VideoUploadPage />} />
          <Route path="/camera" element={<CameraLivePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MainRouter;
