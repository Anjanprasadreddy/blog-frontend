import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function AdminAccess(){

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users',{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      await API.put(`/users/${userId}/makeadmin`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // Refresh after updating
    } catch (error) {
      console.error('Error making user admin', error);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>Admin Access Panel</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => makeAdmin(user._id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: user.role === 'admin' ? 'red' : '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  };
  
  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

export default AdminAccess;
