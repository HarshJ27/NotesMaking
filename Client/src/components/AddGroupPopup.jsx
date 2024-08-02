import React, { useRef, useEffect, useState } from 'react';

const colors = [
    '#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'
  ];

const AddGroupPopup = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('');
  const popupRef = useRef(null);

  const handleCreateGroup = () => {
    if (!groupName || !groupColor) return;

    onCreateGroup({ name: groupName, color: groupColor });
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Create New Group</h2>
        <div className="mb-4 flex items-center gap-8 w-full">
          <label htmlFor="groupName" className="block text-sm font-bold  mb-1">GroupName</label>
          <input
            id="groupName"
            type="text"
            placeholder="Group Name"
            className="p-2 border border-gray-300 rounded-2xl w-full"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center gap-8 w-full">
          <label htmlFor="groupColor" className="block text-sm font-bold  mb-1">Choose Color</label>
          <div id="groupColor" className="flex gap-2">
            {colors.map(color => (
              <div
                key={color}
                onClick={() => setGroupColor(color)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${groupColor === color ? 'border-black' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className='flex justify-end'>
        <button
          className="px-10 py-1 text-white rounded-lg"
          style={{backgroundColor: "#001F8B"}}
          onClick={handleCreateGroup}
        >
          Create
        </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupPopup;
