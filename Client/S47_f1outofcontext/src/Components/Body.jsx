
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

  // Display the first object
  const firstObject = data.length > 0 ? data[0] : null;

  return (
    <div>
      {firstObject ? (
        <Card
          Genre={firstObject.Genre}
          Explanation_of_Clip={firstObject.Explanation_of_Clip}
          Links_To_the_clips={firstObject.Links_To_the_clips}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Body;

