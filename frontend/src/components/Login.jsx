import React, { useState } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Dán link ngrok (hoặc IP chung Wi-Fi) của Sinh viên 1 vào đây
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------


// Thêm { onLoginSuccess } vào đây
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      alert('Vui lòng nhập cả Email và Password');
      return;
    }
    try {
      const userCredentials = { email, password };
      const response = await axios.post(`${API_BASE_URL}/api/login`, userCredentials); 
      const token = response.data.token;
      localStorage.setItem('userToken', token); 
      alert('Đăng nhập thành công!');
      if (onLoginSuccess) {
        onLoginSuccess(); 
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      alert('Có lỗi xảy ra khi đăng nhập.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '10px' }}>
      <h2>Đăng Nhập (Login)</h2>
      <div><label>Email: </label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div><label>Password: </label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <button type="submit">Đăng Nhập</button>
    </form>
  );
}
export default Login;