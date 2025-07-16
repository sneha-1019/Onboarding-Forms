import React, { useState } from 'react'
import UserTypeSelector from './components/UserTypeSelector'
import InvestorForm from './components/InvestorForm'
import StartupForm from './components/StartupForm'
import SuccessMessage from './components/SuccessMessage'

function App() {
  const [userType, setUserType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    setIsSubmitted(false)
  }

  const handleFormSubmit = (data) => {
    setSubmittedData(data)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setUserType('')
    setIsSubmitted(false)
    setSubmittedData(null)
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="gradient-text">Startup</span> & <span className="gradient-text">Investor</span> Onboarding
          </h1>
          <p className="subtitle">Join our platform to connect with the right opportunities</p>
        </header>

        <main className="main-content">
          {!userType && !isSubmitted && (
            <UserTypeSelector onSelect={handleUserTypeSelect} />
          )}

          {userType === 'investor' && !isSubmitted && (
            <InvestorForm onSubmit={handleFormSubmit} onBack={() => setUserType('')} />
          )}

          {userType === 'startup' && !isSubmitted && (
            <StartupForm onSubmit={handleFormSubmit} onBack={() => setUserType('')} />
          )}

          {isSubmitted && (
            <SuccessMessage 
              userType={userType} 
              data={submittedData}
              onReset={handleReset}
            />
          )}
        </main>

        <footer className="footer">
          <p>&copy; 2025 Startup Investor Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App