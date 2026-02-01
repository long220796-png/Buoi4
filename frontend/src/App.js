import React, { useState, useEffect } from 'react';
import './App.css';

// === CHỈ IMPORT NHỮNG FILE BẠN CÓ ===
import Login from './components/Login';       // Import HĐ 1
import Profile from './components/Profile';   // Import HĐ 2
import ForgotPassword from './components/ForgotPassword'; // Import HĐ 4

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    setIsLoggedIn(false); 
    alert('Đã đăng xuất!');
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Buổi 5 - Test Hoạt Động 4</h1>
        {isLoggedIn ? (
          // NẾU ĐÃ ĐĂNG NHẬP
          <>
            <Profile /> 
            <button onClick={handleLogout} style={{ marginTop: '20px', backgroundColor: 'red' }}>
              Đăng Xuất (Logout)
            </button>
          </>
        ) : (
          // NẾU CHƯA ĐĂNG NHẬP
          <>
            <Login onLoginSuccess={onLoginSuccess} /> 
            <hr />
            {/* Chúng ta vẫn cần file ForgotPassword.jsx */}
            <ForgotPassword />
          </>
        )}
      </header>
    </div>
  );
}
export default App;