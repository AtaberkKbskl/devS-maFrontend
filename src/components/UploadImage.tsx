import React, { Component } from 'react';
import './UploadImage.css';

interface UploadImageProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  uploadStatus: string;
}

class UploadImage extends Component<UploadImageProps> {
  render() {
    const { handleFileChange, handleUpload, uploadStatus } = this.props;
    return (
      <section>
        <h2>Upload Image</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <p>{uploadStatus}</p>
      </section>
    );
  }
}

export default UploadImage;
