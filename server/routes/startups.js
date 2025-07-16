const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const { validateStartup } = require('../middleware/validation');

// POST /api/startups - Create new startup
router.post('/', validateStartup, async (req, res) => {
  try {
    const startup = new Startup(req.body);
    const savedStartup = await startup.save();
    
    res.status(201).json({
      message: 'Startup profile created successfully',
      startup: savedStartup
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A startup with this email already exists'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors
      });
    }
    
    console.error('Error creating startup:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// GET /api/startups - Get all startups (optional for admin)
router.get('/', async (req, res) => {
  try {
    const startups = await Startup.find({ isActive: true })
      .select('-__v')
      .sort({ createdAt: -1 });
    
    res.json({
      message: 'Startups retrieved successfully',
      startups: startups
    });
  } catch (error) {
    console.error('Error fetching startups:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// GET /api/startups/:id - Get startup by ID
router.get('/:id', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id).select('-__v');
    
    if (!startup) {
      return res.status(404).json({
        message: 'Startup not found'
      });
    }
    
    res.json({
      message: 'Startup retrieved successfully',
      startup: startup
    });
  } catch (error) {
    console.error('Error fetching startup:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

module.exports = router;