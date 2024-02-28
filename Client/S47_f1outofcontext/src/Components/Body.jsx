import React, { useState, useEffect } from 'react';
import Card from './Card';

const Body = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="flex flex-col space-y-4">
      {data.map((item) => (
        <Card
          key={item._id}
          Genre={item.Genre}
          Explanation_of_Clip={item.Explanation_of_Clip}
          Links_To_the_clips={item.Links_To_the_clips}
        />
      ))}
    </div>
  );
};

export default Body;
