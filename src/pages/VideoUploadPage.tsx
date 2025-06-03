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

  // Sabit userName kaldırıldı; artık FeedbackForm içinden alınacak
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setOutputVideoUrl(null);
      setUploadStatus("");
      setProcessStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Lütfen önce bir video seçin!");
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
      setUploadStatus("Yükleme başarısız.");
    }
  };

  const handleProcess = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/video/process");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setOutputVideoUrl(url);
      setProcessStatus("İşleme tamamlandı.");
    } catch (err) {
      setProcessStatus("İşleme başarısız.");
    }
  };

  const handleRate = (stars: number) => {
    setRating(stars);
  };

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
    <div className="video-page-wrapper">
      {/* Sayfa Başlığı */}
      <h1 className="page-title">Upload &amp; Process Video</h1>

      {/* 1) Video Yükleme Kartı */}
      <div className="card upload-card">
        <p className="sub-text">
          Lütfen bir video seçin ve ardından “Upload” butonuna tıklayın.
        </p>
        <div className="file-input-container">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <span className="file-name">
            {selectedFile ? selectedFile.name : "Henüz video seçilmedi"}
          </span>
        </div>
        <div className="button-group">
          <button onClick={handleUpload} className="primary-btn">
            Upload
          </button>
          <button onClick={handleProcess} className="primary-btn">
            Process
          </button>
        </div>
        {uploadStatus && <p className="status-text">{uploadStatus}</p>}
        {processStatus && <p className="status-text">{processStatus}</p>}
      </div>

      {/* 2) Önizleme Video Kartı */}
      {outputVideoUrl && (
        <div className="card preview-card">
          <h2 className="card-title">Anonymized Video Output</h2>
          <video width="100%" controls className="preview-video">
            <source src={outputVideoUrl} type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      )}

      {/* 3) Rating + Feedback Kartı */}
      <div className="card feedback-card">
        <h2 className="card-title">Oy ver (video):</h2>
        <StarRating
          type="video"
          userName=""  // boş string, çünkü kullanıcı adı artık FeedbackForm içinde girilecek
          onRate={handleRate}
          isSubmitting={isSubmitting}
        />
        <FeedbackForm
          type="video"
          rating={rating}
          isSubmitting={isSubmitting}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </div>
    </div>
  );
};

export default VideoUploadPage;
