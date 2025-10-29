import React, { useState } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Link này PHẢI GIỐNG HỆT link trong file Login.jsx
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------

const getApiClient = () => {
  const token = localStorage.getItem('userToken');
  if (!token) { return null; }
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` } 
  });
};

function AvatarUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Bạn chưa chọn file.');
      return;
    }
    const api = getApiClient();
    if (!api) {
      alert('Bạn chưa đăng nhập.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile); 

    try {
      const response = await api.post('/api/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload avatar thành công!');
      window.location.reload(); 
    } catch (error) {
      console.error('Lỗi khi upload avatar:', error);
      alert('Upload thất bại.');
    }
  };

  return (
    <div style={{ border: '1px solid lightgreen', padding: '10px', marginTop: '15px' }}>
      <h4>Upload Avatar Mới</h4>
      <div><input type="file" onChange={handleFileChange} /></div>
      <button onClick={handleUpload} style={{ marginTop: '10px' }}>
        Upload Ảnh
      </button>
    </div>
  );
}
export default AvatarUpload;