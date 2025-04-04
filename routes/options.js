const express = require('express');
const router = express.Router();
const { getCities, getEducationOptions } = require('../controllers/options');

// Routes
router.get('/cities', getCities);
router.get('/education', getEducationOptions);

module.exports = router; 