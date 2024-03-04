// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate form data
//     if (!validatePassword()) {
//       alert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character');
//       return;
//     }

//     // Save data to cookie (not recommended for sensitive data)
//     document.cookie = `email=${formData.email}; path=/`;
//     document.cookie = `password=${formData.confirmPassword}; path=/`;
//     // Avoid storing passwords in cookies for security reasons

//     // You should send this data to the server for proper storage and handling
//     // Here, you would typically make an AJAX request to your server

//     navigate('/');
//   };

//   const validatePassword = () => {
//     const { password, confirmPassword } = formData;

//     // Password criteria
//     const minLength = 8;
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);

//     return (
//       password.length >= minLength &&
//       hasSpecialChar &&
//       hasUpperCase &&
//       hasLowerCase &&
//       hasNumber &&
//       password === confirmPassword
//     );
//   };

//   return (
//     <div className="container flex justify-center items-center mt-[10%]">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-4">Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               placeholder="Confirm your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validatePassword()) {
      alert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    try {
      // Send data to the server
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to signup');
      }

      // Parse the JWT from the server response
      const { token } = await response.json();

      // Save the JWT to a secure location (e.g., localStorage)
      localStorage.setItem('jwt', token);

      // Navigate to the desired route
      navigate('/content');
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;

    // Password criteria
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return (
      password.length >= minLength &&
      hasSpecialChar &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      password === confirmPassword
    );
  };

  return (
    <div className="container flex justify-center items-center mt-[10%]">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
