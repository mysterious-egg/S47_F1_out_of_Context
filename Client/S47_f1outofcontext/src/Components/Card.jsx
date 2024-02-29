import React from 'react';

const Card = ({
  Genre = 'Default Genre',
  Explanation_of_Clip = 'Default Explanation_of_Clip',
  Links_To_the_clips = 'Visit Clip',
}) => {
  return (
    <div className='w-auto h-auto border border-black rounded p-4 mb-4'>
      <p className='text-xl font-bold mb-2'>{Genre}</p>
      <p className='mb-2'>{Explanation_of_Clip}</p>
      <a
        href={Links_To_the_clips}
        target="_blank"
        rel="noopener noreferrer"
        className='text-blue-500 underline font-bold'
      >
        {Links_To_the_clips}
      </a>
    </div>
  );
};

export default Card;
