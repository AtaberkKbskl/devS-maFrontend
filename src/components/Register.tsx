import React, { Component } from 'react';
import './Register.css';

interface RegisterProps {
  registerData: { username: string; password: string };
  setRegisterData: (data: { username: string; password: string }) => void;
  handleRegister: () => void;
}

class Register extends Component<RegisterProps> {
  render() {
    const { registerData, setRegisterData, handleRegister } = this.props;
    return (
      <section>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <button onClick={handleRegister}>Register</button>
      </section>
    );
  }
}

export default Register;
