const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { register, login, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filter image files
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: fileFilter
});

// Routes
router.post('/register', upload.array('images', 4), register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router; 