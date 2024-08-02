import React from 'react';

const Sidebar = ({ groups, onSelectGroup, onAddGroupClick }) => {
  return (
    <div className="w-1/4 bg-white px-4 py-5 flex flex-col h-screen">
      <div className="sticky top-0 bg-white py-4 z-10">
        <h1 className="text-3xl text-center font-bold mb-4">Pocket Notes</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col items-center justify-center gap-5">
          {groups?.map(group => (
            <li
              key={group._id}
              className="flex items-center mb-2 cursor-pointer w-full"
              onClick={() => onSelectGroup(group._id)}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: group.color }}
              >
                {group.name.charAt(0).toUpperCase()}
              </div>
              <span className="ml-2">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative sticky bottom-0 bg-white py-4 z-10">
        <button
          className="absolute bottom-0 right-0 mb-4 mr-4 p-4 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          onClick={onAddGroupClick}
          style={{backgroundColor: "#16008B"}}
        >
          +
        </button>
        
      </div>
    </div>
  );
};

export default Sidebar;
