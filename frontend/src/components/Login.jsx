import React, { useState } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Link này PHẢI GIỐNG HỆT link trong file Register.jsx
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------

// === SỬA 1: Thêm { onLoginSuccess } vào đây ===
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trang web tải lại

    if (!email || !password) {
      alert('Vui lòng nhập cả Email và Password');
      return;
    }

    try {
      const userCredentials = { email, password };
      
      // Gọi API Đăng nhập của Sinh viên 1
      const response = await axios.post(`${API_BASE_URL}/api/login`, userCredentials); 
      
      // === PHẦN QUAN TRỌNG NHẤT (BUỔI 5) ===
      // Lấy "token" từ server trả về
      const token = response.data.token;
      
      // Lưu token vào trình duyệt (localStorage)
      localStorage.setItem('userToken', token); 
      // === HẾT PHẦN QUAN TRỌNG ===

      alert('Đăng nhập thành công!');

      // === SỬA 2: Dán code của bạn vào đây ===
      if (onLoginSuccess) {
        onLoginSuccess(); // Báo cho App.js biết là đã đăng nhập
      }
      // ===================================
      
      console.log('Token đã được lưu:', token);
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      if (error.response && error.response.data.message) {
        alert(`Lỗi: ${error.response.data.message}`); // Ví dụ: "Sai mật khẩu"
      } else {
        alert('Có lỗi xảy ra khi đăng nhập.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '10px' }}>
      <h2>Đăng Nhập (Login)</h2>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.value)} 
          placeholder="test@gmail.com"
        />
      </div>
      <div>
        <label>Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.value)} 
          placeholder="Mật khẩu"
        />
      </div>
      <button type="submit">Đăng Nhập</button>
    </form>
  );
}

export default Login;