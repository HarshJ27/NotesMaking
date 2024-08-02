import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const NotesPage = ({ groupId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [groupDetails, setGroupDetails] = useState({});

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/groups/${groupId}`
        );
        setGroupDetails(response.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/notes/${groupId}`
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
      }
    };

    fetchGroupDetails();
    fetchNotes();
  }, [groupId]);

  const handleAddNote = async () => {
    if (!newNote) return;

    const noteWithTimestamp = {
      content: newNote,
      timestamp: new Date().toISOString(), // Add client-side timestamp
    };

    try {
      const response = await axios.post(
        `http://localhost:5002/api/notes/${groupId}`,
        noteWithTimestamp
      );
      setNotes([...notes, response.data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      console.log("Formatting timestamp:", timestamp); // Log the timestamp for debugging
      const date = new Date(timestamp);
      if (isNaN(date)) throw new Error("Invalid date");
      return `${format(date, "d MMM yyyy")} · ${format(date, "hh:mm a")}`;
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "";
    }
  };

  return (
    <div className="w-3/4 flex flex-col h-screen">
      <div
        className="sticky top-0 bg-white px-8 py-4 flex items-center z-10"
        style={{ backgroundColor: "#001F8B" }}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}
          style={{ backgroundColor: groupDetails.color }}
        >
          {groupDetails.name?.charAt(0).toUpperCase()}
        </div>
        <span className="ml-2 text-white text-xl font-bold">
          {groupDetails.name}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-4 bg-blue-100">
        {notes.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            No notes available in this group
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="mb-4 p-4 bg-gray-50 rounded-sm shadow"
            >
              <p>{note.content}</p>
              <div className="text-sm font-bold text-gray-500 text-right">
                {formatTimestamp(note.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
      <div
        className="sticky bottom-0 bg-white px-8 py-4 z-10"
        style={{ backgroundColor: "#001F8B" }}
      >
        <div className="mt-4 relative">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg h-36 resize-none"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your text here......"
          />
          <button
            className="absolute bottom-4 right-2 p-2 bg-blue-500 text-white rounded-full flex items-center justify-center"
            disabled={!newNote}
            onClick={handleAddNote}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
