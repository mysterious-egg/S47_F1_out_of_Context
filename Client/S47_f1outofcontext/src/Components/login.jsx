
import React from 'react';
import {  useNavigate,Navigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Retrieve values from input fields
    const email = emailInput.value;
    const password = passwordInput.value;

    // Set cookies with the values
    document.cookie = `email=${email}; path=/`;
    document.cookie = `password=${password}; path=/`;
    

    // Additional login logic if needed

    console.log('Login successful!');
    // return <Navigate to="/" />;
    navigate('/')
    
  };
  // const homeNavigation=()=>{
  //   Navigate('/')
  // }
 

  return (
    <div className="container   flex justify-center items-center mt-[10%]">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

