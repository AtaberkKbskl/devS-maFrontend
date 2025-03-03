import React, { Component } from 'react';
import './ProcessImage.css';

interface ProcessImageProps {
  handleProcess: () => void;
  processStatus: string;
}

class ProcessImage extends Component<ProcessImageProps> {
  render() {
    const { handleProcess, processStatus } = this.props;
    return (
      <section>
        <h2>Process Image</h2>
        <button onClick={handleProcess}>Process</button>
        <p>{processStatus}</p>
      </section>
    );
  }
}

export default ProcessImage;
