import React, { useState } from 'react';
import './ImageUploadPage.css'; // <== BU IMPORT MUTLAKA EN ÜSTE EKLENMELİ

const ImageUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [processStatus, setProcessStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('http://localhost:8080/api/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.text();
      setUploadStatus(data);
    } catch (err) {
      setUploadStatus('Upload failed.');
    }
  };

  const handleProcess = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/image/process');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setProcessStatus('Processing complete.');
    } catch (err) {
      setProcessStatus('Processing failed.');
    }
  };

  return (
    <div className="image-page">
      <h2>Upload & Process Image</h2>

      <div className="file-section">
        <p className="notice-text">Lütfen bir fotoğraf seçin ve ardından "Upload" butonuna tıklayın.</p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <p className="status-message">{uploadStatus}</p>
        <button onClick={handleProcess}>Process</button>
        <p className="status-message">{processStatus}</p>
      </div>

      <div className="result-container">
        {previewUrl && (
          <div className="image-box">
            <h4>Original Image</h4>
            <img src={previewUrl} alt="Original" />
          </div>
        )}
        {outputUrl && (
          <div className="image-box">
            <h4>Anonymized Image</h4>
            <img src={outputUrl} alt="Anonymized" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPage;
