import React from 'react'
// import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
    <div className="container mx-auto flex items-center justify-between">
      {/* Side Logo */}
      <div className="flex items-center">
        <img
          className="rounded-full h-16 w-16"
          src="https://i.pinimg.com/736x/29/a7/97/29a797972ea730a4ff4b26855e6afa3f.jpg"  
          alt="Logo"
        />
      </div>

      {/* Middle Section - Image and Text */}
      <div className="flex items-center">
        <img
          className="h-8 w-15 mr-2"  // Adjust size as needed
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/2560px-F1.svg.png"  // Replace with the actual URL or import statement for your image
          alt="Image"
        />
        <span className="text-black font-semibold italic text-3xl font-black mr-4">out of context</span>
      </div>

      {/* Buttons on the right */}
      <div className="flex items-center space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-full">Login</button>
      </div>
    </div>
  </nav>

  )
}

export default Navbar