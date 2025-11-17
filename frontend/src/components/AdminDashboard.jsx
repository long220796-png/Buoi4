import React, { useState, useEffect } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Link này PHẢI GIỐNG HỆT link trong file Login.jsx
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------

// Hàm này TÁI SỬ DỤNG từ Hoạt động 2
const getApiClient = () => {
  const token = localStorage.getItem('userToken');
  if (!token) { return null; }
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` } // Đính kèm token
  });
};

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // === HÀM LẤY DANH SÁCH USER (ADMIN GET) ===
  const fetchAllUsers = async () => {
    const api = getApiClient();
    if (!api) {
      setError('Bạn chưa đăng nhập.');
      return;
    }
    try {
      const response = await api.get('/api/users'); 
      setUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Lỗi khi lấy danh sách user:', error);
      if (error.response && error.response.status === 403) {
        setError('Lỗi: Bạn không có quyền Admin để xem trang này.');
      } else {
        setError('Không thể tải danh sách user.');
      }
    }
  };

  // Chạy 1 lần khi component mở
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // === HÀM XÓA USER (ADMIN DELETE) ===
  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa user này?')) {
      const api = getApiClient();
      if (!api) return;
      try {
        await api.delete(`/api/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
        alert('Xóa user thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa user:', error);
        alert('Lỗi: Xóa user thất bại.');
      }
    }
  };

  return (
    <div style={{ border: '1px solid yellow', padding: '10px', marginTop: '20px' }}>
      <h2>Trang Quản Trị (Admin Dashboard)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user._id} style={{ marginBottom: '10px', borderBottom: '1px solid gray' }}>
            <p><strong>Email:</strong> {user.email} | <strong>Quyền:</strong> {user.role}</p>
            <button onClick={() => handleDelete(user._id)} style={{ backgroundColor: 'darkred' }}>
              Xóa User Này
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AdminDashboard;