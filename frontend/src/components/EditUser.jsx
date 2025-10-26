import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://192.168.1.8:5000/api/users"; // ⚠️ SỬA DÒNG NÀY

function EditUser({ user, onUpdateDone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Vui lòng nhập cả tên và email');
      return;
    }

    try {
      const updatedUser = { name, email };

      await axios.put(`${API_URL}/${user._id}`, updatedUser);
      
      alert('Cập nhật user thành công!');
      onUpdateDone(); 

    } catch (error) {
      console.error('Lỗi khi cập nhật user:', error);
      alert('Có lỗi xảy ra khi cập nhật user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '10px', marginTop: '15px' }}>
      <h3>Sửa User: {user.name}</h3>
      <div>
        <label>Tên mới: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email mới: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Lưu thay đổi</button>
      {/* Nút này để đóng form mà không lưu */}
      <button type="button" onClick={onUpdateDone} style={{ marginLeft: '10px' }}>
        Hủy
      </button>
    </form>
  );
}

export default EditUser;