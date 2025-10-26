import React, { useState } from 'react';
import axios from 'axios';

// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
const API_URL = "http://192.168.1.2:3000/api/users"


function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // HÀM NÀY ĐÃ ĐƯỢC THÊM VALIDATION (HĐ 8)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // === PHẦN VALIDATION MỚI (TỪ HĐ 8) ===
    if (!name.trim()) {
      alert("Tên (Name) không được để trống");
      return; // Dừng lại, không gửi
    }
    // Regex kiểm tra email
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ (ví dụ: test@gmail.com)");
      return; // Dừng lại, không gửi
    }
    // === HẾT PHẦN VALIDATION ===

    // Phần code gửi đi (từ HĐ 6 & 7)
    try {
      const newUser = { name, email };
      
      // Gửi request đến link API_URL đã khai báo ở trên
      const response = await axios.post(API_URL, newUser); 
      
      alert('Thêm user thành công!');
      setName('');
      setEmail('');
      onUserAdded(response.data); // Báo cho UserList cập nhật

    } catch (error) {
      console.error('Lỗi khi thêm user:', error);
      // Lỗi này sẽ hiện nếu link ngrok sai hoặc SV1 tắt server
      alert('Có lỗi xảy ra khi thêm user.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm User Mới</h2>
      <div>
        <label>Tên: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddUser;