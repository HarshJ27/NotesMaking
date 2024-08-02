import React, { useState } from 'react';
import axios from 'axios';

function NewGroupModal({ setShowModal }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const createGroup = () => {
    if (!name) return;
    axios.post('http://localhost:5002/api/groups', { name, color })
      .then(() => setShowModal(false))
      .catch(error => console.error('Error creating group:', error));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-bold mb-4">New Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 mb-4"
        />
        <div className="flex justify-end">
          <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={createGroup}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGroupModal;
