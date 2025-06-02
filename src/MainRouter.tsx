// src/MainRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import App from "./App";
import ImageUploadPage from "./pages/ImageUploadPage";
import VideoUploadPage from "./pages/VideoUploadPage";
import CameraLivePage from "./pages/CameraLivePage";
import FeedbackListPage from "./pages/FeedbackListPage";

import "./MainRouter.css"; // CSS dosyanızı olduğu gibi bırakabilirsiniz

const MainRouter: React.FC = () => {
  return (
    <Router>
      <div className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/image">Image Upload</Link>
        <Link to="/video">Video Upload</Link>
        <Link to="/camera">Live Camera</Link>
        <Link to="/feedbacks">Feedback Listesi</Link> {/* Yeni eklenen link */}
      </div>

      <div style={{ marginLeft: "200px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/image" element={<ImageUploadPage />} />
          <Route path="/video" element={<VideoUploadPage />} />
          <Route path="/camera" element={<CameraLivePage />} />
          <Route path="/feedbacks" element={<FeedbackListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MainRouter;
