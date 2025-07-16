# Startup Investor Onboarding Platform

A comprehensive MERN stack application for connecting startups with investors through a streamlined onboarding process.

## Features

- **Dual User Types**: Separate onboarding flows for investors and startups
- **Modern UI/UX**: Clean, responsive design with gradient backgrounds and smooth animations
- **Form Validation**: Client-side and server-side validation for data integrity
- **MongoDB Integration**: Structured data storage with proper schemas
- **RESTful API**: Well-structured backend with proper error handling
- **Rate Limiting**: Built-in protection against abuse
- **Security**: Helmet.js integration for security headers

## Tech Stack

### Frontend
- React 18 with Vite
- Vanilla CSS with modern features
- Axios for API calls
- Responsive design

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Express Validator for validation
- Helmet for security
- CORS for cross-origin requests
- Rate limiting

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd startup-investor-onboarding
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Set up the client**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or start MongoDB service
   sudo systemctl start mongod
   ```

### Environment Variables

#### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/startup-investor-onboarding
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret
CORS_ORIGIN=http://localhost:3000
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Startup Investor Onboarding
VITE_NODE_ENV=development
```

## API Endpoints

### Investors
- `POST /api/investors` - Create new investor profile
- `GET /api/investors` - Get all investors
- `GET /api/investors/:id` - Get investor by ID

### Startups
- `POST /api/startups` - Create new startup profile
- `GET /api/startups` - Get all startups
- `GET /api/startups/:id` - Get startup by ID

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
startup-investor-onboarding/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── InvestorForm.jsx
│   │   │   ├── StartupForm.jsx
│   │   │   ├── UserTypeSelector.jsx
│   │   │   └── SuccessMessage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express backend
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── validation.js
│   ├── models/
│   │   ├── Investor.js
│   │   └── Startup.js
│   ├── routes/
│   │   ├── investors.js
│   │   └── startups.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

## Data Models

### Investor Schema
- Personal information (name, email, phone, company, title)
- Investment preferences (focus areas, amount range, preferred stage)
- Additional details (geography, LinkedIn, bio, accredited status)

### Startup Schema
- Company information (name, website, industry, location, founding year)
- Founder information (name, email, phone, LinkedIn)
- Business details (stage, funding amount, description, business model)
- Additional metrics (team size, revenue, target market)

## Features in Detail

### User Experience
- Clean, modern interface with intuitive navigation
- Responsive design that works on all devices
- Progressive form validation with real-time feedback
- Success confirmation with profile summary

### Security
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration for secure API access
- Helmet.js for security headers

### Performance
- Efficient MongoDB queries with proper indexing
- Optimized React components
- Vite for fast development and building
- Lazy loading and code splitting ready

## Development

### Running in Development
```bash
# Start MongoDB
mongod

# Start server (Terminal 1)
cd server
npm run dev

# Start client (Terminal 2)
cd client
npm run dev
```

### Building for Production
```bash
# Build client
cd client
npm run build

# Start server in production mode
cd server
NODE_ENV=production npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue in the GitHub repository or contact the development team.