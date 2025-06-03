// src/pages/CameraLivePage.tsx
import React, { useEffect, useRef, useState } from "react";
import "./CameraLivePage.css";
import StarRating from "../components/StarRating";
import FeedbackForm from "../components/FeedbackForm";
import { postFeedback } from "../api";

const CameraLivePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  // Sabit userName kaldırıldı
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Kamera erişim isteği
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        alert("Kamera erişimi reddedildi veya hata oluştu: " + err.message);
      });

    // Her 2 saniyede bir işle
    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/jpeg");
    try {
      const response = await fetch("http://localhost:8080/api/camera/frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });
      const result = await response.json(); // { image: "data:image/jpeg;base64,..." }
      setProcessedImage(result.image);
    } catch (err) {
      console.error("Çerçeve işlenemedi:", err);
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
    <div className="camera-page-wrapper">
      {/* Sayfa Başlığı */}
      <h1 className="page-title">Real-Time Camera Face Anonymization</h1>

      {/* 1) Canlı Kamera Kartı */}
      <div className="card camera-card">
        <video ref={videoRef} className="live-video" />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {processedImage && (
          <div className="processed-image-container">
            <h2 className="card-title">Anonymous Frame</h2>
            <img
              src={processedImage}
              alt="Processed"
              className="processed-img"
            />
          </div>
        )}
      </div>

      {/* 2) Rating + Feedback Kartı */}
      <div className="card feedback-card">
        <h2 className="card-title">Oy ver (camera):</h2>
        <StarRating
          type="camera"
          userName=""  // boş string
          onRate={handleRate}
          isSubmitting={isSubmitting}
        />
        <FeedbackForm
          type="camera"
          rating={rating}
          isSubmitting={isSubmitting}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </div>
    </div>
  );
};

export default CameraLivePage;
