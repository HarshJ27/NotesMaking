import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Notes App</h1>
      <div>
        <span className="mr-4">User Profile</span>
        <button className="bg-blue-500 px-4 py-2 rounded">Log Out</button>
      </div>
    </header>
  );
}

export default Header;
