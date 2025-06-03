// src/pages/ImageUploadPage.tsx
import React, { useState } from "react";
import "./ImageUploadPage.css";
import StarRating from "../components/StarRating";
import FeedbackForm from "../components/FeedbackForm";
import { postFeedback } from "../api";

const ImageUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [processStatus, setProcessStatus] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  // Artık sabit userName yok; kullanıcı ismi FeedbackForm içinde alınacak
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Eğer daha önce bir çıktı varsa temizle
      setOutputUrl(null);
      setUploadStatus("");
      setProcessStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:8080/api/image/upload", {
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
      const res = await fetch("http://localhost:8080/api/image/process");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setProcessStatus("İşleme tamamlandı.");
    } catch (err) {
      setProcessStatus("İşleme başarısız.");
    }
  };

  // Yıldız puanını StarRating'ten alıyoruz
  const handleRate = (stars: number) => {
    setRating(stars);
  };

  // Feedback formu gönderildiğinde çağrılacak
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
    <div className="image-page-wrapper">
      {/* Sayfa Başlığı */}
      <h1 className="page-title">Upload &amp; Process Image</h1>

      {/* 1) Dosya Yükleme ve İşleme Kartı */}
      <div className="card upload-card">
        <p className="sub-text">
          Lütfen bir fotoğraf seçin ve ardından "Upload" butonuna tıklayın.
        </p>

        <div className="file-input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <span className="file-name">
            {selectedFile ? selectedFile.name : "Henüz dosya seçilmedi"}
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

      {/* 2) Önizleme Kartı */}
      {previewUrl && (
        <div className="card preview-card">
          <h2 className="card-title">Original Image</h2>
          <img src={previewUrl} alt="Original" className="preview-img" />
        </div>
      )}

      {outputUrl && (
        <div className="card preview-card">
          <h2 className="card-title">Anonymized Image</h2>
          <img src={outputUrl} alt="Anonymized" className="preview-img" />
        </div>
      )}

      {/* 3) Rating + Feedback Kartı */}
      <div className="card feedback-card">
        <h2 className="card-title">Oy ver (image):</h2>
        <StarRating
          type="image"
          userName=""  // StarRating prop imzası gereği, ancak form içinden kullanıcı adı alınacak
          onRate={handleRate}
          isSubmitting={isSubmitting}
        />
        <FeedbackForm
          type="image"
          rating={rating}
          isSubmitting={isSubmitting}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </div>
    </div>
  );
};

export default ImageUploadPage;
