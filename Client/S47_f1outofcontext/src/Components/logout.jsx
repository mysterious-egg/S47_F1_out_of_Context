// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// navigate('/login');

//     console.log('Logout successful!');
//   };

//   return (
//     <div className="container flex justify-center items-center mt-[10%]">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-4">Logout</h2>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Logout;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');

    // Redirect to the login page
    navigate('/');

    console.log('Logout successful!');
  };

  return (
    <div className="container flex justify-center items-center mt-[10%]">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Logout</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
