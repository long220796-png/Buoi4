import React from 'react';
import './App.css';
import Register from './components/Register'; // Import component Đăng ký
import Login from './components/Login';     // Import component Đăng nhập

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Buổi 5 - Authentication</h1>
        
        {/* Hiển thị Form Đăng Ký */}
        <Register />

        <hr style={{ width: '50%' }} /> 

        {/* Hiển thị Form Đăng Nhập */}
        <Login />

      </header>
    </div>
  );
}

export default App;