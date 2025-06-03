// src/AuthPage.tsx
import React, { Component } from 'react';
import './App.css';       // Eğer bu dosyada auth’a özel CSS varsa, vb.
import Register from './components/Register';
import Login from './components/Login';

import Header from './components/Header';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// AuthPage’i fonksiyonel bileşen olarak yazmak kolay olur:
const AuthPage: React.FC = () => {
  // AuthPage içinde login/register durumunu izleyeceğiz
  const [registerData, setRegisterData] = React.useState<{ username: string; password: string }>({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = React.useState<string>('');
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [isRegister, setIsRegister] = React.useState<boolean>(true);

  // Başarılı login sonrası yönlendirme için navigate
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await response.text();
      alert(data);
      // Kayıt başarılı ise isRegister false yapıp login ekranına geçilebilir
      setIsRegister(false);
    } catch (error) {
      alert('Registration failed!');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await response.text();
      // Örneğin backend “Login successful!” döndürecek
      if (response.ok) {
        setLoginStatus('');      // Hata yok
        setLoggedIn(true);       // Giriş başarılı
        // Giriş başarılı olduktan hemen sonra "/app/home" sayfasına geç:
        navigate('/app/home');
      } else {
        setLoginStatus(data || 'Login failed');
      }
    } catch (error) {
      setLoginStatus('Login failed!');
    }
  };

  // Eğer kullanıcı zaten loggedIn ise ekstra birşey yapmayalım (zaten yönlendirme oldu).
  // Aksi halde, ekranda başta sadece Header + form gösterilecek:

  return (
    <div className="App">
      {/* Üstte sabit bir header da göstermek isterseniz: */}
      <Header title="Secure Image Masking Algorithm" logoUrl="/logo.jpg" />

      {!loggedIn && (
        <div className="auth-container">
          {/* Kayıt / Giriş arası toggle */}
          <div className="auth-toggle">
            <button
              onClick={() => setIsRegister(true)}
              className={isRegister ? 'active' : ''}
            >
              Register
            </button>
            <button
              onClick={() => setIsRegister(false)}
              className={!isRegister ? 'active' : ''}
            >
              Login
            </button>
          </div>

          <div className="auth-content">
            {isRegister ? (
              <Register
                registerData={registerData}
                setRegisterData={setRegisterData}
                handleRegister={handleRegister}
              />
            ) : (
              <Login
                loginData={registerData}
                setLoginData={setRegisterData}
                handleLogin={handleLogin}
                loginStatus={loginStatus}
              />
            )}
          </div>
        </div>
      )}

      {/* loggedIn true olduğunda aslında bu bileşen yeniden mount edilmeyecek,
          çünkü navigate('/app/home') komutuyla yönlendirme gerçekleşir */}
    </div>
  );
};

export default AuthPage;
