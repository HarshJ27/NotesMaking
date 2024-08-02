import React, { useState } from 'react';
import NoteCard from './NoteCard';
import axios from 'axios';

function MainContent({ selectedGroup, notes, setNotes }) {
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (!newNote) return;
    axios.post(`https://notesmaking-backend.onrender.com/api/notes/${selectedGroup._id}`, { content: newNote })
      .then(response => setNotes([...notes, response.data]))
      .catch(error => console.error('Error adding note:', error));
    setNewNote('');
  };

  return (
    <main className="p-4">
      {selectedGroup ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{selectedGroup.name}</h2>
          <div>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter a new note"
              className="flex-grow border p-2"
            />
            <button
              className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded ${!newNote ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={addNote}
              disabled={!newNote}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <p>Please select a group to view and add notes.</p>
      )}
    </main>
  );
}

export default MainContent;
