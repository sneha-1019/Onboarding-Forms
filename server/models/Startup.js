const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  founderName: {
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
  website: {
    type: String,
    trim: true,
    maxLength: 200
  },
  industry: {
    type: String,
    required: true,
    enum: ['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'AI/ML', 'SaaS', 'Biotech', 'CleanTech', 'EdTech', 'FoodTech', 'Other']
  },
  stage: {
    type: String,
    required: true,
    enum: ['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth']
  },
  fundingAmount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 2000
  },
  location: {
    type: String,
    trim: true,
    maxLength: 100
  },
  teamSize: {
    type: Number,
    min: 1,
    max: 10000
  },
  revenue: {
    type: Number,
    min: 0
  },
  founded: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  linkedin: {
    type: String,
    trim: true,
    maxLength: 200
  },
  businessModel: {
    type: String,
    enum: ['B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'Subscription', 'Freemium', 'Other']
  },
  targetMarket: {
    type: String,
    trim: true,
    maxLength: 300
  },
  useOfFunds: {
    type: String,
    trim: true,
    maxLength: 1000
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
startupSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
//startupSchema.index({ email: 1 });
startupSchema.index({ industry: 1 });
startupSchema.index({ stage: 1 });
startupSchema.index({ createdAt: -1 });
startupSchema.index({ fundingAmount: 1 });

module.exports = mongoose.model('Startup', startupSchema);