import React, { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

function App() {
  const [latestUser, setLatestUser] = useState(null);

  const handleUserAdded = (user) => {
    setLatestUser(user);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản Lý User (Hoạt động 4)</h1>
        <AddUser onUserAdded={handleUserAdded} />
        <UserList newUser={latestUser} />
      </header>
    </div>
  );
}
export default App;