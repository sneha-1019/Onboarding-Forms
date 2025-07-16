const { body, validationResult } = require('express-validator');

// Validation middleware for investors
const validateInvestor = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  
  body('investmentFocus')
    .isArray({ min: 1 })
    .withMessage('At least one investment focus must be selected'),
  
  body('minimumInvestment')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Minimum investment must be a positive number'),
  
  body('maximumInvestment')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Maximum investment must be a positive number'),
  
  body('preferredStage')
    .isIn(['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth'])
    .withMessage('Please select a valid preferred stage'),
  
  body('geography')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Geography must be less than 200 characters'),
  
  body('linkedin')
    .optional()
    .isURL()
    .withMessage('Please provide a valid LinkedIn URL'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio must be less than 1000 characters'),
  
  body('accreditedInvestor')
    .optional()
    .isBoolean()
    .withMessage('Accredited investor must be a boolean value'),
  
  // Custom validation to check if max > min investment
  body('maximumInvestment').custom((value, { req }) => {
    if (parseFloat(value) <= parseFloat(req.body.minimumInvestment)) {
      throw new Error('Maximum investment must be greater than minimum investment');
    }
    return true;
  }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation middleware for startups
const validateStartup = [
  body('companyName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('founderName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Founder name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  
  body('industry')
    .isIn(['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'AI/ML', 'SaaS', 'Biotech', 'CleanTech', 'EdTech', 'FoodTech', 'Other'])
    .withMessage('Please select a valid industry'),
  
  body('stage')
    .isIn(['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth'])
    .withMessage('Please select a valid stage'),
  
  body('fundingAmount')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Funding amount must be a positive number'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be less than 100 characters'),
  
  body('teamSize')
    .optional()
    .isNumeric()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Team size must be between 1 and 10000'),
  
  body('revenue')
    .optional()
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Revenue must be a positive number'),
  
  body('founded')
    .optional()
    .isNumeric()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Founded year must be between 1900 and current year'),
  
  body('linkedin')
    .optional()
    .isURL()
    .withMessage('Please provide a valid LinkedIn URL'),
  
  body('businessModel')
    .optional()
    .isIn(['B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'Subscription', 'Freemium', 'Other'])
    .withMessage('Please select a valid business model'),
  
  body('targetMarket')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Target market must be less than 300 characters'),
  
  body('useOfFunds')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Use of funds must be less than 1000 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateInvestor,
  validateStartup
};