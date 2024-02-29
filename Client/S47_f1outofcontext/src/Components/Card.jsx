
import React from 'react';

const Card = ({ _id, Genre = "Default Genre", Explanation_of_Clip = "Default Explanation_of_Clip", Links_To_the_clips = "Default Links_To_the_clips", onDelete }) => {
  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <div className='w-auto h-auto border-2 border-black rounded p-4 flex flex-col'>
      <p className="mb-2">{Genre}</p>
      <p className="mb-2">{Explanation_of_Clip}</p>
      <a href={Links_To_the_clips} target="_blank" rel="noopener noreferrer" className="mb-4 text-blue-500 font-bold underline">
        Visit Clip
      </a>
      <button className="bg-red-500 w-[70px] text-white p-2" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Card;
