import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Add a new note entry to a group's notes
router.post('/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params;
      const { content } = req.body;
  
      if (!content) {
        return res.status(400).json({ error: 'Note content is required' });
      }
  
      let noteDocument = await Note.findOne({ groupId });
  
      if (!noteDocument) {
        noteDocument = new Note({
          groupId,
          contents: [{ content, timestamp: new Date() }],
        });
      } else {
        noteDocument.contents.push({ content, timestamp: new Date() });
      }
  
      await noteDocument.save();
      res.status(201).json(noteDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all notes for a group
  router.get('/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params;
      const noteDocument = await Note.findOne({ groupId });
  
      if (!noteDocument) {
        return res.status(404).json({ error: 'No notes found for this group' });
      }
  
      res.status(200).json(noteDocument.contents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a note entry from a group's notes
  router.delete('/:groupId/:noteId', async (req, res) => {
    try {
      const { groupId, noteId } = req.params;
      const noteDocument = await Note.findOne({ groupId });
  
      if (!noteDocument) {
        return res.status(404).json({ error: 'No notes found for this group' });
      }
  
      const noteIndex = noteDocument.contents.findIndex(note => note._id.toString() === noteId);
  
      if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note entry not found' });
      }
  
      noteDocument.contents.splice(noteIndex, 1);
      await noteDocument.save();
  
      res.status(200).json({ message: 'Note entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
