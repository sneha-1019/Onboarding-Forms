import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const submitInvestorForm = async (formData) => {
  try {
    const response = await api.post('/investors', formData)
    return response
  } catch (error) {
    throw error
  }
}

export const submitStartupForm = async (formData) => {
  try {
    const response = await api.post('/startups', formData)
    return response
  } catch (error) {
    throw error
  }
}

export default api