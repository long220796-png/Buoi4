import React, { useState, useEffect } from 'react';
import './App.css';

// === IMPORT CÁC COMPONENT CẦN THIẾT ===
import Register from './components/Register'; // Import HĐ 1
import Login from './components/Login';       // Import HĐ 1
import AdminDashboard from './components/AdminDashboard'; // Import HĐ 3

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token khi (re)load trang
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Hàm Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('userToken'); [cite_start]// Xóa token [cite: 15]
    setIsLoggedIn(false); // Cập nhật state
    alert('Đã đăng xuất!');
  };

  // Hàm báo cho App biết đã login thành công
  const onLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Buổi 5 - Test Hoạt Động 3 (Admin)</h1>
        {isLoggedIn ? (
          // Nếu ĐÃ ĐĂNG NHẬP (isLoggedIn = true)
          <>
            <AdminDashboard /> 
            <button onClick={handleLogout} style={{ marginTop: '20px', backgroundColor: 'red' }}>
              Đăng Xuất (Logout)
            </button>
          </>
        ) : (
          // Nếu CHƯA ĐĂNG NHẬP (isLoggedIn = false)
          <>
            <Register />
            <hr style={{ width: '50%' }} /> 
            <Login onLoginSuccess={onLoginSuccess} /> 
          </>
        )}
      </header>
    </div>
  );
}

export default App;