import React, { useState } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Dán link ngrok (hoặc IP chung Wi-Fi) của Sinh viên 1 vào đây
// Link này KHÔNG có /api/users
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trang web tải lại

    // Kiểm tra validation đơn giản (giống HĐ 8 của Buổi 4)
    if (!email || !password) {
      alert('Vui lòng nhập cả Email và Password');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ (ví dụ: test@gmail.com)");
      return;
    }

    try {
      const newUser = { email, password };
      
      // Gọi API Đăng ký của Sinh viên 1
      const response = await axios.post(`${API_BASE_URL}/api/signup`, newUser); 
      
      alert('Đăng ký thành công! Vui lòng Đăng nhập.');
      console.log(response.data);
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      // Báo lỗi cụ thể từ server (nếu SV1 có cài đặt)
      if (error.response && error.response.data.message) {
        alert(`Lỗi: ${error.response.data.message}`); // Ví dụ: "Email đã tồn tại"
      } else {
        alert('Có lỗi xảy ra khi đăng ký.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '10px' }}>
      <h2>Đăng Ký (Sign Up)</h2>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="test@gmail.com"
        />
      </div>
      <div>
        <label>Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mật khẩu"
        />
      </div>
      <button type="submit">Đăng Ký</button>
    </form>
  );
}

export default Register;