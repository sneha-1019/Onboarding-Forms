const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxLength: 20
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  title: {
    type: String,
    trim: true,
    maxLength: 100
  },
  investmentFocus: [{
    type: String,
    enum: ['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'AI/ML', 'SaaS', 'Biotech', 'CleanTech', 'EdTech', 'FoodTech']
  }],
  minimumInvestment: {
    type: Number,
    required: true,
    min: 0
  },
  maximumInvestment: {
    type: Number,
    required: true,
    min: 0
  },
  preferredStage: {
    type: String,
    required: true,
    enum: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth']
  },
  geography: {
    type: String,
    trim: true,
    maxLength: 200
  },
  linkedin: {
    type: String,
    trim: true,
    maxLength: 200
  },
  bio: {
    type: String,
    trim: true,
    maxLength: 1000
  },
  accreditedInvestor: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
investorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Validate investment range
investorSchema.pre('save', function(next) {
  if (this.minimumInvestment >= this.maximumInvestment) {
    next(new Error('Maximum investment must be greater than minimum investment'));
  } else {
    next();
  }
});

// Index for better query performance
//investorSchema.index({ email: 1 });
investorSchema.index({ investmentFocus: 1 });
investorSchema.index({ preferredStage: 1 });
investorSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Investor', investorSchema);