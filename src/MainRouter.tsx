// src/MainRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import HomePage from "./layouts/HomePage";
import ImageUploadPage from "./pages/ImageUploadPage";
import VideoUploadPage from "./pages/VideoUploadPage";
import CameraLivePage from "./pages/CameraLivePage";
import FeedbackListPage from "./pages/FeedbackListPage";

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="image" element={<ImageUploadPage />} />
          <Route path="video" element={<VideoUploadPage />} />
          <Route path="camera" element={<CameraLivePage />} />
          <Route path="feedbacks" element={<FeedbackListPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRouter;
