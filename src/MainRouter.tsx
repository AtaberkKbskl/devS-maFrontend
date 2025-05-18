import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import ImageUploadPage from './pages/ImageUploadPage';
import VideoUploadPage from './pages/VideoUploadPage';
import CameraLivePage from './pages/CameraLivePage';



const MainRouter: React.FC = () => {
  return (
    <Router>
      <nav style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '0 15px' }}>Home</Link>
        <Link to="/image" style={{ margin: '0 15px' }}>Image Upload</Link>
        <Link to="/video" style={{ margin: '0 15px' }}>Video Upload</Link>
        <Link to="/camera" style={{ margin: '0 15px' }}>Live Camera</Link>


        {/* Video ve Kamera linkleri de buraya gelecek */}
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/image" element={<ImageUploadPage />} />
        <Route path="/video" element={<VideoUploadPage />} />
        <Route path="/camera" element={<CameraLivePage />} />


      </Routes>
    </Router>
  );
};

export default MainRouter;
