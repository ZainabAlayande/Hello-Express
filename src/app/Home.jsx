"use client"; // Add this line at the top

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../app/module.css'; 

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [userId, setUserId] = useState('');
  const [fetchUserId, setFetchUserId] = useState('');
  const [updateUserId, setUpdateUserId] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:3000/api/register', { name, age });
      fetchUsers();
      setAlertMessage('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleFetchUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${fetchUserId}`);
      alert(`User found:\nName: ${response.data.name}\nAge: ${response.data.age}`);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      alert('User not found or error occurred.');
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3000/api/users/${updateUserId}`, { name: updatedName });
      fetchUsers();
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>User Management</h1>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <h2>Create User</h2>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <button className={styles.button} onClick={handleCreateUser}>Create</button>
        </div>

        <div className={styles.formGroup}>
          <h2>Get User by ID</h2>
          <input type="text" placeholder="User ID" value={fetchUserId} onChange={(e) => setFetchUserId(e.target.value)} />
          <button className={styles.button} onClick={handleFetchUserById}>Fetch User</button>
        </div>

        <div className={styles.formGroup}>
          <h2>Update User</h2>
          <input type="text" placeholder="User ID" value={updateUserId} onChange={(e) => setUpdateUserId(e.target.value)} />
          <input type="text" placeholder="New Name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <button className={styles.button} onClick={handleUpdateUser}>Update</button>
        </div>
      </form>

      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.age}) 
              <button className={styles.deleteButton} onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {alertMessage && (
        <div className={styles.alert}>
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
