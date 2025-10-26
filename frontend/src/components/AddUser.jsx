import React, { useState } from 'react';
import axios from 'axios';

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Vui lòng nhập cả tên và email');
      return;
    }
  try {
  const newUser = { name, email };
  const response = await axios.post("http://192.168.1.8:5000/api/users", newUser);

  alert('Thêm user thành công!');
  setName(''); // 
  setEmail('');
  onUserAdded(response.data);
} catch (error) { //
      console.error('Lỗi khi thêm user:', error);
      alert('Có lỗi xảy ra khi thêm user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm User Mới</h2>
      <div><label>Tên: </label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
      <div><label>Email: </label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <button type="submit">Thêm</button>
    </form>
  );
}
export default AddUser;