import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUser from './EditUser'; // Import component Sửa

const API_URL = "http://192.168.1.2:3000/api/users"; // ⚠️ SỬA DÒNG NÀY

function UserList({ newUser }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State để biết đang sửa user nào

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Cập nhật danh sách khi có user MỚI (từ AddUser)
  useEffect(() => {
    if (newUser) {
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
  }, [newUser]);

  // === HÀM XÓA (DELETE) ===
  const handleDelete = async (userId) => {
    // Hỏi xác nhận trước khi xóa
    if (window.confirm('Bạn có chắc chắn muốn xóa user này?')) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        
        // Cập nhật lại danh sách trên giao diện
        setUsers(users.filter(user => user._id !== userId));
        alert('Xóa user thành công!');

      } catch (error) {
        console.error('Lỗi khi xóa user:', error);
        alert('Lỗi khi xóa user.');
      }
    }
  };

  // === HÀM KHI SỬA XONG ===
  const handleUpdateDone = () => {
    setEditingUser(null); // Đóng form Sửa
    fetchUsers(); // Tải lại danh sách (để thấy user đã được cập nhật)
  };

  return (
    <div>
      <h2>Danh Sách User</h2>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              {user.name} ({user.email})
              
              {/* === NÚT SỬA VÀ XÓA === */}
              <button 
                onClick={() => setEditingUser(user)} 
                style={{ marginLeft: '10px' }}
              >
                Sửa
              </button>
              
              <button 
                onClick={() => handleDelete(user._id)} 
                style={{ marginLeft: '5px' }}
              >
                Xóa
              </button>
              {/* === HẾT NÚT === */}
            </li>
          ))
        ) : (
          <p>Chưa có user nào.</p>
        )}
      </ul>

      {/* === HIỂN THỊ FORM SỬA NẾU ĐANG SỬA === */}
      {editingUser && (
        <EditUser 
          user={editingUser} 
          onUpdateDone={handleUpdateDone}
        />
      )}
    </div>
  );
}

export default UserList;