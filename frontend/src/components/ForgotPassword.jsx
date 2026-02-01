import React, { useState } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Dán link ngrok (hoặc IP chung Wi-Fi) của Sinh viên 1 vào đây
// Link này PHẢI GIỐNG HỆT link trong file Login.jsx
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Vui lòng nhập email');
      return;
    }
    try {
      // Gọi API /api/forgot-password của Sinh viên 1
      await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
      alert('Nếu email có tồn tại, một link reset mật khẩu đã được gửi.');
      setEmail('');
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu reset:', error);
      alert('Có lỗi xảy ra.');
    }
  };

  return (
    <div style={{ border: '1px solid cyan', padding: '10px', marginTop: '20px' }}>
      <h3>Quên mật khẩu?</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nhập Email của bạn: </label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="test@gmail.com"
          />
        </div>
        <button type="submit">Gửi link Reset</button>
      </form>
    </div>
  );
}

export default ForgotPassword;