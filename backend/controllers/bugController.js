import Bug from '../models/Bug.js';

// Helper validation function (unit tested)
export const validateBugInput = (data) => {
  const errors = [];
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  if (!data.description || data.description.trim() === '') {
    errors.push('Description is required');
  }
  if (!data.reportedBy || data.reportedBy.trim() === '') {
    errors.push('Reporter name is required');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

// @desc    Get all bugs
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new bug
export const createBug = async (req, res) => {
  const { title, description, reportedBy } = req.body;

  const validation = validateBugInput(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const bug = new Bug({
      title,
      description,
      reportedBy
    });

    const createdBug = await bug.save();
    res.status(201).json(createdBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update bug
export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    // Allow partial updates
    Object.keys(req.body).forEach(key => {
      bug[key] = req.body[key];
    });

    const updatedBug = await bug.save();
    res.json(updatedBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete bug
export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    await bug.deleteOne();
    res.json({ message: 'Bug removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};