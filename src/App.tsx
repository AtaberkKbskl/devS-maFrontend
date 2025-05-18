import React, { Component } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import UploadImage from './components/UploadImage';
import ProcessImage from './components/ProcessImage';
import Header from './components/Header';


interface AppState {
  registerData: {
    username: string;
    password: string;
  };
  loginStatus: string;
  selectedFile: File | null;
  uploadStatus: string;
  processStatus: string;
  loggedIn: boolean;
  isRegister: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      registerData: { username: '', password: '' },
      loginStatus: '',
      selectedFile: null,
      uploadStatus: '',
      processStatus: '',
      loggedIn: false,
      isRegister: true,
    };
  }

  handleRegister = async () => {
    const { registerData } = this.state;
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      alert('Registration failed!');
    }
  };

  handleLogin = async () => {
    const { registerData } = this.state;
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await response.text();
      this.setState({ loginStatus: data, loggedIn: true });
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
    }
  };

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      this.setState({ selectedFile: e.target.files[0] });
    }
  };

  handleUpload = async () => {
    const { selectedFile } = this.state;
    if (!selectedFile) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/api/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      this.setState({ uploadStatus: data });
    } catch (error) {
      alert('File upload failed!');
    }
  };

  handleProcess = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/image/process');
      const data = await response.text();
      this.setState({ processStatus: data });
    } catch (error) {
      alert('Image processing failed!');
    }
  };

  render() {
    const { registerData, loginStatus, uploadStatus, processStatus, loggedIn, isRegister } = this.state;

    return (
      <div className="App">
        <Header title="Secure Image Masking Algorithm" logoUrl="/logo.jpg" />
        {!loggedIn ? (
          <div className="auth-container">
            <div className="auth-toggle">
              <button
                onClick={() => this.setState({ isRegister: true })}
                className={isRegister ? 'active' : ''}
              >
                Register
              </button>
              <button
                onClick={() => this.setState({ isRegister: false })}
                className={!isRegister ? 'active' : ''}
              >
                Login
              </button>
            </div>
            <div className="auth-content">
              {isRegister ? (
                <Register
                  registerData={registerData}
                  setRegisterData={(data) => this.setState({ registerData: data })}
                  handleRegister={this.handleRegister}
                />
              ) : (
                <Login
                  loginData={registerData}
                  setLoginData={(data) => this.setState({ registerData: data })}
                  handleLogin={this.handleLogin}
                  loginStatus={loginStatus}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="dashboard">
            <UploadImage
              handleFileChange={this.handleFileChange}
              handleUpload={this.handleUpload}
              uploadStatus={uploadStatus}
            />
            <ProcessImage
              handleProcess={this.handleProcess}
              processStatus={processStatus}
            />
            <div className="output-section">
              <h3>Sample Output</h3>
              <img src="/sample.png" alt="Sample Output" className="output-image" />
              <p>{processStatus}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
