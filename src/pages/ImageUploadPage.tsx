import React, { useState } from 'react';

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Upload & Process Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>

      <button onClick={handleProcess}>Process</button>
      <p>{processStatus}</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '20px' }}>
        {previewUrl && (
          <div>
            <h4>Original Image</h4>
            <img src={previewUrl} alt="Original" width="200" />
          </div>
        )}
        {outputUrl && (
          <div>
            <h4>Anonymized Image</h4>
            <img src={outputUrl} alt="Anonymized" width="200" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPage;
