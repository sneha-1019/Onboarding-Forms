const express = require('express');
const router = express.Router();
const Investor = require('../models/Investor');
const { validateInvestor } = require('../middleware/validation');

// POST /api/investors - Create new investor
router.post('/', validateInvestor, async (req, res) => {
  try {
    const investor = new Investor(req.body);
    const savedInvestor = await investor.save();
    
    res.status(201).json({
      message: 'Investor profile created successfully',
      investor: savedInvestor
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'An investor with this email already exists'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors
      });
    }
    
    console.error('Error creating investor:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// GET /api/investors - Get all investors (optional for admin)
router.get('/', async (req, res) => {
  try {
    const investors = await Investor.find({ isActive: true })
      .select('-__v')
      .sort({ createdAt: -1 });
    
    res.json({
      message: 'Investors retrieved successfully',
      investors: investors
    });
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// GET /api/investors/:id - Get investor by ID
router.get('/:id', async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id).select('-__v');
    
    if (!investor) {
      return res.status(404).json({
        message: 'Investor not found'
      });
    }
    
    res.json({
      message: 'Investor retrieved successfully',
      investor: investor
    });
  } catch (error) {
    console.error('Error fetching investor:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

module.exports = router;