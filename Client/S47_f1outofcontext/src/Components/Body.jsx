

import React, { useState, useEffect } from 'react';
import Card from './Card';

const Body = () => {
  const [data, setData] = useState([]);
  const [newEntity, setNewEntity] = useState({ Explanation_of_Clip: '', Genre: '',Links_To_the_clips:'' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddEntity = async () => {
    try {
      const response = await fetch('http://localhost:3000/addEntity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntity),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Fetch updated data after adding the entity
      fetchData();
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-4">
        <button onClick={handleAddEntity}>Contribute</button>
        <input
          type="text"
          placeholder="Explanation_of_Clip"
          value={newEntity.Explanation_of_Clip}
          onChange={(e) => setNewEntity({ ...newEntity, Explanation_of_Clip: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newEntity.Genre}
          onChange={(e) => setNewEntity({ ...newEntity, Genre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Links_To_the_clips"
          value={newEntity.Links_To_the_clips}
          onChange={(e) => setNewEntity({ ...newEntity, Links_To_the_clips: e.target.value })}
        />
      </div>
      <div className=' flex justify-center'>

      <div className="flex  flex-col space-y-4">
        {data.map((item) => (
          <Card
            key={item._id}
            Genre={item.Genre}
            Explanation_of_Clip={item.Explanation_of_Clip}
            Links_To_the_clips={item.Links_To_the_clips}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default Body;
