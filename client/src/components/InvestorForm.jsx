import React, { useState } from 'react'
import { submitInvestorForm } from '../services/api'

const InvestorForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    investmentFocus: [],
    minimumInvestment: '',
    maximumInvestment: '',
    preferredStage: '',
    geography: '',
    linkedin: '',
    bio: '',
    accreditedInvestor: false
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const investmentFocusOptions = [
    'Technology', 'Healthcare', 'Fintech', 'E-commerce', 'AI/ML', 
    'SaaS', 'Biotech', 'CleanTech', 'EdTech', 'FoodTech'
  ]

  const stageOptions = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCheckboxChange = (focus) => {
    setFormData(prev => ({
      ...prev,
      investmentFocus: prev.investmentFocus.includes(focus)
        ? prev.investmentFocus.filter(f => f !== focus)
        : [...prev.investmentFocus, focus]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.minimumInvestment) newErrors.minimumInvestment = 'Minimum investment is required'
    if (!formData.maximumInvestment) newErrors.maximumInvestment = 'Maximum investment is required'
    if (!formData.preferredStage) newErrors.preferredStage = 'Preferred stage is required'
    if (formData.investmentFocus.length === 0) newErrors.investmentFocus = 'Please select at least one investment focus'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const cleanFormData = (data) => {
  const cleaned = {};
  for (const key in data) {
    const value = data[key];
    cleaned[key] =
      typeof value === 'string' && value.trim() === '' ? undefined : value;
  }
  return cleaned;
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const cleanedData = cleanFormData(formData); 

  setLoading(true);
  try {
    const response = await submitInvestorForm(cleanedData);
    onSubmit(response.data);
  } catch (error) {
  if (error.response) {
    console.error('Backend validation failed:', error.response.data);

    if (Array.isArray(error.response.data.errors)) {
      error.response.data.errors.forEach((err, index) => {
        console.error(`Error ${index + 1}:`, err.param, '-', err.msg);
      });

      const backendErrors = {};
      error.response.data.errors.forEach(err => {
        backendErrors[err.param] = err.msg;
      });
      setErrors(backendErrors);
    } else {
      console.error('Unexpected validation format:', error.response.data);
      setErrors({ submit: error.response.data.message || 'Submission failed' });
    }
  } else {
    console.error('Submission error:', error);
    setErrors({ submit: 'Something went wrong. Please try again.' });
  }
}
 finally {
    setLoading(false);
  }
};


  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2 className="form-title">Investor Onboarding</h2>
        <p className="form-subtitle">Tell us about your investment preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="onboarding-form">
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="John Doe"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Professional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Company/Fund *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={errors.company ? 'error' : ''}
                placeholder="Acme Ventures"
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Managing Partner"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Investment Preferences</h3>
          
          <div className="form-group">
            <label>Investment Focus *</label>
            <div className="checkbox-grid">
              {investmentFocusOptions.map(focus => (
                <label key={focus} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.investmentFocus.includes(focus)}
                    onChange={() => handleCheckboxChange(focus)}
                  />
                  <span className="checkbox-text">{focus}</span>
                </label>
              ))}
            </div>
            {errors.investmentFocus && <span className="error-message">{errors.investmentFocus}</span>}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Minimum Investment ($) *</label>
              <input
                type="number"
                name="minimumInvestment"
                value={formData.minimumInvestment}
                onChange={handleInputChange}
                className={errors.minimumInvestment ? 'error' : ''}
                placeholder="10000"
              />
              {errors.minimumInvestment && <span className="error-message">{errors.minimumInvestment}</span>}
            </div>

            <div className="form-group">
              <label>Maximum Investment ($) *</label>
              <input
                type="number"
                name="maximumInvestment"
                value={formData.maximumInvestment}
                onChange={handleInputChange}
                className={errors.maximumInvestment ? 'error' : ''}
                placeholder="1000000"
              />
              {errors.maximumInvestment && <span className="error-message">{errors.maximumInvestment}</span>}
            </div>

            <div className="form-group">
              <label>Preferred Stage *</label>
              <select
                name="preferredStage"
                value={formData.preferredStage}
                onChange={handleInputChange}
                className={errors.preferredStage ? 'error' : ''}
              >
                <option value="">Select stage</option>
                {stageOptions.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
              {errors.preferredStage && <span className="error-message">{errors.preferredStage}</span>}
            </div>

            <div className="form-group">
              <label>Geographic Focus</label>
              <input
                type="text"
                name="geography"
                value={formData.geography}
                onChange={handleInputChange}
                placeholder="North America, Europe, Global"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              placeholder="Tell us about your investment philosophy and experience..."
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="accreditedInvestor"
                checked={formData.accreditedInvestor}
                onChange={handleInputChange}
              />
              <span className="checkbox-text">I am an accredited investor</span>
            </label>
          </div>
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Complete Onboarding'}
        </button>
      </form>
    </div>
  )
}

export default InvestorForm
