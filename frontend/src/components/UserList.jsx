import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList({ newUser }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (newUser) {
      setUsers([...users, newUser]);
    }
  }, [newUser]);

  return (
    <div>
      <h2>Danh Sách User</h2>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id || user.id}>{user.name} ({user.email})</li>
          ))
        ) : (
          <p>Chưa có user nào.</p>
        )}
      </ul>
    </div>
  );
}
export default UserList;