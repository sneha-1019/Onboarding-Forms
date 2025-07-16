import React from 'react'

const UserTypeSelector = ({ onSelect }) => {
  return (
    <div className="user-type-selector">
      <h2 className="section-title">Choose Your Profile Type</h2>
      <div className="type-cards">
        <div className="type-card investor-card" onClick={() => onSelect('investor')}>
          <div className="card-icon">👔</div>
          <h3>Investor</h3>
          <p>Looking for promising startups to invest in</p>
          <div className="card-features">
            <span>• Portfolio Management</span>
            <span>• Deal Flow</span>
            <span>• Due Diligence</span>
          </div>
          <button className="select-btn">Get Started</button>
        </div>

        <div className="type-card startup-card" onClick={() => onSelect('startup')}>
          <div className="card-icon">🚀</div>
          <h3>Startup</h3>
          <p>Seeking funding and strategic partnerships</p>
          <div className="card-features">
            <span>• Funding Opportunities</span>
            <span>• Mentor Network</span>
            <span>• Growth Support</span>
          </div>
          <button className="select-btn">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default UserTypeSelector