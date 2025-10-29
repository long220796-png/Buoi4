import React, { useState, useEffect } from 'react';
import axios from 'axios';

// -----------------------------------------------------------------
// ⚠️ QUAN TRỌNG: SỬA DÒNG NÀY ⚠️
// Link này PHẢI GIỐNG HỆT link trong file Register.jsx
const API_BASE_URL = "https://abc-123.ngrok-free.app"; // ⬅️ SỬA LINK NÀY
// -----------------------------------------------------------------

function Profile() {
  // State để lưu thông tin user
  const [user, setUser] = useState(null);
  // State cho form cập nhật
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // === HÀM TẠO AXIOS VỚI TOKEN ===
  // Đây là phần QUAN TRỌNG NHẤT của Buổi 5
  const getApiClient = () => {
    // 1. Lấy token đã lưu (từ Hoạt động 1)
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return null;
    }

    // 2. Tạo một 'instance' của axios
    // Nó sẽ tự động đính kèm token vào MỌI request
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${token}` // Đính kèm token vào header
      }
    });
  };

  // === HÀM LẤY THÔNG TIN PROFILE (VIEW) ===
  const fetchProfile = async () => {
    const api = getApiClient();
    if (!api) return;

    try {
      // Gọi API /api/profile của Sinh viên 1
      const response = await api.get('/api/profile'); 
      setUser(response.data);
      setName(response.data.name || ''); // Điền tên cũ vào form
    } catch (error) {
      console.error('Lỗi khi lấy profile:', error);
      alert('Không thể lấy thông tin. Vui lòng đăng nhập lại.');
      // Nếu token hết hạn, xóa token cũ
      localStorage.removeItem('userToken'); 
    }
  };

  // === CHẠY HÀM KHI COMPONENT MỞ ===
  // (Giống `fetchUsers` ở Buổi 4)
  useEffect(() => {
    fetchProfile();
  }, []); // [] nghĩa là chỉ chạy 1 lần lúc mở

  // === HÀM CẬP NHẬT PROFILE (UPDATE) ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    const api = getApiClient();
    if (!api) return;

    const updates = {};
    if (name) updates.name = name;
    if (newPassword) updates.password = newPassword;

    if (Object.keys(updates).length === 0) {
      alert('Bạn chưa nhập thông tin mới.');
      return;
    }

    try {
      // Gọi API /api/profile (PUT) của Sinh viên 1
      const response = await api.put('/api/profile', updates);
      alert('Cập nhật thành công!');
      setUser(response.data); // Cập nhật giao diện với thông tin mới
      setNewPassword(''); // Xóa ô mật khẩu
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      alert('Cập nhật thất bại.');
    }
  };

  // Nếu chưa kịp tải xong, hiển thị "Loading..."
  if (!user) {
    return <div>Đang tải thông tin cá nhân...</div>;
  }

  // Giao diện (Render)
  return (
    <div style={{ border: '1px solid white', padding: '10px' }}>
      <h2>Thông tin cá nhân (Profile)</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Tên hiện tại:</strong> {user.name || '(Chưa có tên)'}</p>
      
      <hr />

      <form onSubmit={handleUpdate}>
        <h3>Cập nhật thông tin</h3>
        <div>
          <label>Tên mới: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label>Mật khẩu mới: </label>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Để trống nếu không đổi"
          />
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default Profile;