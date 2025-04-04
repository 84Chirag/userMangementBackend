const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

// Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const optionsRoutes = require('./routes/options');

// Initialize app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS - simplified configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://user-mangement-frontend.vercel.app', process.env.FRONTEND_URL] 
    : 'http://localhost:3000',
  credentials: true // Allow credentials
}));

// Add additional CORS headers for preflight requests
app.use((req, res, next) => {
  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://user-mangement-frontend.vercel.app', process.env.FRONTEND_URL]
    : ['http://localhost:3000'];
    
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  
  next();
});

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/options', optionsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'production') {
        console.log(`Server running in production mode on port ${PORT}`);
      } else {
        console.log(`Server running at http://127.0.0.1:${PORT}`);
      }
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
}); 