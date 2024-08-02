import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

// Create a new group
router.post('/', async (req, res) => {
  try {
    const { name, color } = req.body;
    const newGroup = new Group({ name, color });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
