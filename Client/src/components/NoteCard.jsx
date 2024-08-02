import React from 'react';

function NoteCard({ note }) {
  return (
    <div className="bg-white p-4 mb-4 rounded shadow">
      <p>{note.content}</p>
      <small className="text-gray-500">{new Date(note.timestamp).toLocaleString()}</small>
    </div>
  );
}

export default NoteCard;
