import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import NotesPage from './components/NotesPage';
import AddGroupPopup from './components/AddGroupPopup';
import axios from 'axios';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAddGroupPopupOpen, setAddGroupPopupOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
  };

  const handleAddGroupClick = () => {
    setAddGroupPopupOpen(true);
  };

  const handleClosePopup = () => {
    setAddGroupPopupOpen(false);
  };

  const handleCreateGroup = async (newGroup) => {
    try {
      const response = await axios.post('http://localhost:5002/api/groups', newGroup);
      setGroups([...groups, response.data]);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        groups={groups}
        onSelectGroup={handleSelectGroup}
        onAddGroupClick={handleAddGroupClick}
      />
      {selectedGroup ? (
        <NotesPage groupId={selectedGroup} />
      ) : (
        <MainPage />
      )}
      {isAddGroupPopupOpen && (
        <AddGroupPopup
          onClose={handleClosePopup}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default App;
