// src/pages/VideoUploadPage.tsx
import React, { useState } from "react";
import "./VideoUploadPage.css";
import StarRating from "../components/StarRating";
import FeedbackForm from "../components/FeedbackForm";
import { postFeedback } from "../api";

const VideoUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [processStatus, setProcessStatus] = useState<string>("");
  const [outputVideoUrl, setOutputVideoUrl] = useState<string | null>(null);

  // Rating + feedback işlemleri için state
  const [userName] = useState<string>("GuestUser");
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:8080/api/video/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.text();
      setUploadStatus(data);
    } catch (err) {
      setUploadStatus("Upload failed.");
    }
  };

  const handleProcess = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/video/process");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setOutputVideoUrl(url);
      setProcessStatus("Processing complete.");
    } catch (err) {
      setProcessStatus("Processing failed.");
    }
  };

  // Kullanıcının StarRating bileşeninden gelen yıldız puanını kaydet
  const handleRate = (stars: number) => {
    setRating(stars);
  };

  // Geri bildirim formu submit edildiğinde çağrılacak
  const handleSubmitFeedback = async (info: {
    username: string;
    type: string;
    rating: number;
    comment: string;
  }) => {
    setIsSubmitting(true);
    try {
      await postFeedback(info);
      alert("Geri bildiriminiz kaydedildi, teşekkürler!");
    } catch (err) {
      console.error(err);
      alert("Geri bildirim gönderilirken hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="video-page">
      <h2>Upload &amp; Process Video</h2>
      <div className="video-section">
        <p className="notice-text">
          Bir video seçin ve "Upload" butonuna basarak yükleyin.
        </p>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <p className="status-message">{uploadStatus}</p>
        <button onClick={handleProcess}>Process</button>
        <p className="status-message">{processStatus}</p>
      </div>

      {outputVideoUrl && (
        <div className="video-preview">
          <h4>Anonymized Video Output</h4>
          <video width="480" controls>
            <source src={outputVideoUrl} type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      )}

      {/* ───── Rating + Feedback Bölümü ───── */}
      <StarRating
        type="video"
        userName={userName}
        onRate={handleRate}
        isSubmitting={isSubmitting}
      />

      <FeedbackForm
        type="video"
        userName={userName}
        rating={rating}
        isSubmitting={isSubmitting}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};

export default VideoUploadPage;
