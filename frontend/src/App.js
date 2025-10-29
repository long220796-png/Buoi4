import React, { useState, useEffect } from 'react';
import './App.css';
import Register from './components/Register'; // Import HĐ 1
import Login from './components/Login';       // Import HĐ 1
import Profile from './components/Profile';   // Import HĐ 2

function App() {
  // State để biết đã đăng nhập hay chưa
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token khi (re)load trang
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // [] = Chạy 1 lần khi mở App

  // Hàm Đăng xuất (Chức năng 3 của Buổi 5)
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Xóa token
    setIsLoggedIn(false); // Cập nhật state
    alert('Đã đăng xuất!');
  };

  // Hàm này được truyền cho <Login>
  // Khi Login thành công, nó sẽ tự gọi hàm này để cập nhật App
  const onLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Buổi 5 - Authentication & Profile</h1>

        {/* === LOGIC HIỂN THỊ === */}
        {isLoggedIn ? (
          // Nếu ĐÃ ĐĂNG NHẬP (isLoggedIn = true)
          <>
            <Profile />
            <button 
              onClick={handleLogout} 
              style={{ marginTop: '20px', backgroundColor: 'red' }}
            >
              Đăng Xuất (Logout)
            </button>
          </>
        ) : (
          // Nếu CHƯA ĐĂNG NHẬP (isLoggedIn = false)
          <>
            <Register />
            <hr style={{ width: '50%' }} /> 
            {/* Truyền hàm onLoginSuccess vào component Login */}
            {/* Bạn cần phải sửa file Login.jsx để gọi hàm này */}
            <Login /> 
          </>
        )}
        
      </header>
    </div>
  );
}

export default App;