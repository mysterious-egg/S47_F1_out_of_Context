
import React, { useState, useEffect } from 'react';
import Card from './Card';

const ContentSpace = () => {
  const [data, setData] = useState([]);
  const [newEntity, setNewEntity] = useState({ Explanation_of_Clip: '', genre: '', Links_To_the_clips: '',created_by:'' });

  useEffect(() => {
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
    fetchData();
  }, []);

  // const handleAddEntity = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/addEntity', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       ContentSpace: JSON.stringify(newEntity),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     // Fetch updated data after adding the entity
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error adding entity:', error);
  //   }
  // };
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

      const updatedResponse = await fetch('http://localhost:3000/data');
      if (!updatedResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedResult = await updatedResponse.json();
      setData(updatedResult);
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  };
  const handleDeleteEntity = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteEntity/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedResponse = await fetch('http://localhost:3000/data');
      if (!updatedResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedResult = await updatedResponse.json();
      setData(updatedResult);
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  return (
    <div className='flex justify-center'>
    <div>
      <div className="p-4">
        <input
          className="p-2 m-2 border rounded"
          type="text"
          placeholder="Explanation_of_Clip"
          value={newEntity.Explanation_of_Clip}
          onChange={(e) => setNewEntity({ ...newEntity, "Explanation_of_Clip": e.target.value })}
        />
        <input
          className="p-2 m-2 border rounded"
          type="text"
          placeholder="Genre"
          value={newEntity.genre}
          onChange={(e) => setNewEntity({ ...newEntity, "genre": e.target.value })}
        />
        <input
          className="p-2 m-2 border rounded"
          type="text"
          placeholder="Links_To_the_clips"
          value={newEntity.Links_To_the_clips}
          onChange={(e) => setNewEntity({ ...newEntity, "Links_To_the_clips": e.target.value })}
        />
        <input type="text"
        placeholder='Created_by'
        value={newEntity.created_by}
        onChange={(e)=>setNewEntity({...newEntity, "created_by":e.target.value})}
         />
        <button
          className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleAddEntity}
        >
          Add Entity
        </button>
      </div>

      <select name="" id="">
        <option value="">Select user</option>
        {data.map((item)=>{
          <option key={item.created_by} value={item.created_by}>
            {item.created_by}
          </option>
        })}
      </select>

      <div className="flex flex-col space-y-4 p-4">
        {data.map((item) => (
          <Card
            key={item._id}
            _id={item._id}  
            Genre={item.Genre}
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
