import React, { useState } from 'react';

const VideoUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [processStatus, setProcessStatus] = useState('');
  const [outputVideoUrl, setOutputVideoUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('http://localhost:8080/api/video/upload', {
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
      const res = await fetch('http://localhost:8080/api/video/process');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setOutputVideoUrl(url);
      setProcessStatus('Processing complete.');
    } catch (err) {
      setProcessStatus('Processing failed.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Upload & Process Video</h2>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>

      <button onClick={handleProcess}>Process</button>
      <p>{processStatus}</p>

      {outputVideoUrl && (
        <div style={{ marginTop: '20px' }}>
          <h4>Anonymized Video Output</h4>
          <video width="480" controls>
            <source src={outputVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploadPage;
