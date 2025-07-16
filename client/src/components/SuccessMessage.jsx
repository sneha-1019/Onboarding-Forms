import React from 'react'

const SuccessMessage = ({ userType, data, onReset }) => {
  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Welcome aboard!</h2>
        <p className="success-message">
          Your {userType} profile has been successfully created and submitted.
        </p>
        
        <div className="success-details">
          <h3>What's next?</h3>
          <ul>
            <li>Our team will review your profile within 24 hours</li>
            <li>You'll receive an email confirmation shortly</li>
            <li>We'll start matching you with relevant {userType === 'investor' ? 'startups' : 'investors'}</li>
            <li>Access to our platform will be granted once approved</li>
          </ul>
        </div>

        <div className="success-summary">
          <h4>Profile Summary:</h4>
          <div className="summary-grid">
            {userType === 'investor' ? (
              <>
                <div className="summary-item">
                  <strong>Name:</strong> {data.investor.name}
                </div>
                <div className="summary-item">
                  <strong>Company:</strong> {data.investor.company}
                </div>
                <div className="summary-item">
                  <strong>Investment Range:</strong> ${data.investor.minimumInvestment.toLocaleString()} - ${data.investor.maximumInvestment.toLocaleString()}
                </div>
                <div className="summary-item">
                  <strong>Preferred Stage:</strong> {data.investor.preferredStage}
                </div>
                <div className="summary-item">
                  <strong>Investment Focus:</strong> {data.investor.investmentFocus.join(', ')}
                </div>
              </>
            ) : (
              <>
                <div className="summary-item">
                  <strong>Company:</strong> {data.startup.companyName}
                </div>
                <div className="summary-item">
                  <strong>Founder:</strong> {data.startup.founderName}
                </div>
                <div className="summary-item">
                  <strong>Industry:</strong> {data.startup.industry}
                </div>
                <div className="summary-item">
                  <strong>Stage:</strong> {data.startup.stage}
                </div>
                <div className="summary-item">
                  <strong>Funding Sought:</strong> ${parseInt(data.startup.fundingAmount).toLocaleString()}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="success-actions">
          <button className="primary-btn" onClick={onReset}>
            Create Another Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage