import React, { useEffect, useRef, useState } from 'react';

const CameraLivePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  useEffect(() => {
    // Kamera başlat
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        alert("Kamera erişimi reddedildi veya hata oluştu: " + err.message);
      });

    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 2000); // her 2 saniyede bir kare gönder

    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/jpeg');

    try {
      const response = await fetch('http://localhost:8080/api/camera/frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      const result = await response.json(); // beklenen: { image: "data:image/jpeg;base64,..." }
      setProcessedImage(result.image);
    } catch (err) {
      console.error("Çerçeve işlenemedi:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Real-Time Camera Face Anonymization</h2>

      <video ref={videoRef} style={{ width: '480px' }} />

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {processedImage && (
        <div style={{ marginTop: '20px' }}>
          <h4>Anonymous Frame</h4>
          <img src={processedImage} alt="Processed" width="480" />
        </div>
      )}
    </div>
  );
};

export default CameraLivePage;
