import React, { useState, useEffect } from 'react';
import Card from './Card';
const backendUrl = import.meta.env.VITE_backend_URI
const ContentSpace = () => {
  const [data, setData] = useState([]);
  const [newEntity, setNewEntity] = useState({ Explanation_of_Clip: '', genre: '', Links_To_the_clips: '', created_by: '' });
  const [selectedUser, setSelectedUser] = useState('');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendUrl}/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEntity = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/addEntity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntity),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchData();
      setNewEntity({ Explanation_of_Clip: '', genre: '', Links_To_the_clips: '', created_by: '' });
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  };

  const handleDeleteEntity = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/deleteEntity/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchData();
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  const uniqueUsers = Array.from(new Set(data.map(item => item.created_by))).filter(Boolean);

  const filteredData = selectedUser
    ? data.filter(item => item.created_by === selectedUser)
    : data;

  return (
    <div className='flex justify-center'>
      <div>
        <div className="p-4">
          <input
            className="p-2 m-2 border rounded"
            type="text"
            placeholder="Explanation_of_Clip"
            value={newEntity.Explanation_of_Clip}
            onChange={(e) => setNewEntity({ ...newEntity, Explanation_of_Clip: e.target.value })}
          />
          <input
            className="p-2 m-2 border rounded"
            type="text"
            placeholder="Genre"
            value={newEntity.genre}
            onChange={(e) => setNewEntity({ ...newEntity, genre: e.target.value })}
          />
          <input
            className="p-2 m-2 border rounded"
            type="text"
            placeholder="Links_To_the_clips"
            value={newEntity.Links_To_the_clips}
            onChange={(e) => setNewEntity({ ...newEntity, Links_To_the_clips: e.target.value })}
          />
          <input
            className="p-2 m-2 border rounded"
            type="text"
            placeholder="Created_by"
            value={newEntity.created_by}
            onChange={(e) => setNewEntity({ ...newEntity, created_by: e.target.value })}
          />
          <button
            className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleAddEntity}
          >
            Add Entity
          </button>
        </div>

        <select
          name="user"
          id="user-select"
          className="m-2 p-2 border rounded"
          value={selectedUser}
          onChange={e => setSelectedUser(e.target.value)}
        >
          <option value="">Select user</option>
          {uniqueUsers.map(user => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>

        <div className="flex flex-col space-y-4 p-4">
          {filteredData.map((item) => (
            <Card
              key={item._id}
              _id={item._id}
              genre={item.genre}
              Explanation_of_Clip={item.Explanation_of_Clip}
              Links_To_the_clips={item.Links_To_the_clips}
              created_by={item.created_by}
              onDelete={handleDeleteEntity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSpace;