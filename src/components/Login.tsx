import React, { Component } from 'react';
import './Login.css';

interface LoginProps {
  handleLogin: () => void;
  loginStatus: string;
  loginData: { username: string; password: string };
  setLoginData: (data: { username: string; password: string }) => void;
}

class Login extends Component<LoginProps> {
  render() {
    const { handleLogin, loginStatus, loginData, setLoginData } = this.props;
    return (
      <section className="login-section">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
        <p>{loginStatus}</p>
      </section>
    );
  }
}

export default Login;
