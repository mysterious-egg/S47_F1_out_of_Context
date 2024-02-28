import React from 'react';

const Card = ({ Genre = 'Default Genre', Explanation_of_Clip = 'Default Explanation_of_Clip', Links_To_the_clips = 'Default Links_To_the_clips' }) => {
  return (
    <div className='inline-block border border-black p-4 rounded'>
      
      <p>{Explanation_of_Clip}</p>
      <p>Genre:{Genre}</p>
      <a
        href={Links_To_the_clips}
        target="_blank"
        rel="noopener noreferrer"
        className='text-blue-500 underline font-bold'
      >
        Visit Clip
      </a>
    </div>
  );
};

export default Card;
