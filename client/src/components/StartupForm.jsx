import React, { useState } from "react";
import { submitStartupForm } from "../services/api";

const StartupForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    founderName: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    stage: "",
    fundingAmount: "",
    description: "",
    location: "",
    teamSize: "",
    revenue: "",
    founded: "",
    linkedin: "",
    businessModel: "",
    targetMarket: "",
    useOfFunds: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Fintech",
    "E-commerce",
    "AI/ML",
    "SaaS",
    "Biotech",
    "CleanTech",
    "EdTech",
    "FoodTech",
    "Other",
  ];

  const stageOptions = [
    "Idea",
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Growth",
  ];

  const businessModelOptions = [
    "B2B",
    "B2C",
    "B2B2C",
    "Marketplace",
    "SaaS",
    "Subscription",
    "Freemium",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.founderName.trim())
      newErrors.founderName = "Founder name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.stage) newErrors.stage = "Stage is required";
    if (!formData.fundingAmount)
      newErrors.fundingAmount = "Funding amount is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const cleanFormData = (data) => {
    const cleaned = {};
    for (const key in data) {
      const value = data[key];
      cleaned[key] =
        typeof value === "string" && value.trim() === "" ? undefined : value;
    }
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const cleanedData = cleanFormData(formData); 
    setLoading(true);
    try {
      const response = await submitStartupForm(cleanedData);
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
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2 className="form-title">Startup Onboarding</h2>
        <p className="form-subtitle">
          Tell us about your startup and funding needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="onboarding-form">
        <div className="form-section">
          <h3 className="section-title">Company Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={errors.companyName ? "error" : ""}
                placeholder="Acme Inc."
              />
              {errors.companyName && (
                <span className="error-message">{errors.companyName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://acme.com"
              />
            </div>

            <div className="form-group">
              <label>Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={errors.industry ? "error" : ""}
              >
                <option value="">Select industry</option>
                {industryOptions.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <span className="error-message">{errors.industry}</span>
              )}
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="form-group">
              <label>Founded Year</label>
              <input
                type="number"
                name="founded"
                value={formData.founded}
                onChange={handleInputChange}
                placeholder="2023"
                min="1900"
                max="2025"
              />
            </div>

            <div className="form-group">
              <label>Team Size</label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                placeholder="5"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Founder Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Founder Name *</label>
              <input
                type="text"
                name="founderName"
                value={formData.founderName}
                onChange={handleInputChange}
                className={errors.founderName ? "error" : ""}
                placeholder="Jane Smith"
              />
              {errors.founderName && (
                <span className="error-message">{errors.founderName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                placeholder="jane@acme.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
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
                placeholder="https://linkedin.com/in/janesmith"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Business Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Business Model</label>
              <select
                name="businessModel"
                value={formData.businessModel}
                onChange={handleInputChange}
              >
                <option value="">Select business model</option>
                {businessModelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Annual Revenue ($)</label>
              <input
                type="number"
                name="revenue"
                value={formData.revenue}
                onChange={handleInputChange}
                placeholder="100000"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Target Market</label>
              <input
                type="text"
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleInputChange}
                placeholder="Small businesses, Enterprise, etc."
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Funding Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Stage *</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                className={errors.stage ? "error" : ""}
              >
                <option value="">Select stage</option>
                {stageOptions.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              {errors.stage && (
                <span className="error-message">{errors.stage}</span>
              )}
            </div>

            <div className="form-group">
              <label>Funding Amount Sought ($) *</label>
              <input
                type="number"
                name="fundingAmount"
                value={formData.fundingAmount}
                onChange={handleInputChange}
                className={errors.fundingAmount ? "error" : ""}
                placeholder="500000"
                min="0"
              />
              {errors.fundingAmount && (
                <span className="error-message">{errors.fundingAmount}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Company Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? "error" : ""}
              rows="4"
              placeholder="Describe your company, product, and mission..."
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label>Use of Funds</label>
            <textarea
              name="useOfFunds"
              value={formData.useOfFunds}
              onChange={handleInputChange}
              rows="3"
              placeholder="How will you use the funding? (hiring, marketing, R&D, etc.)"
            />
          </div>
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Complete Onboarding"}
        </button>
      </form>
    </div>
  );
};

export default StartupForm;
