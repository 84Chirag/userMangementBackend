const { cities, educationOptions } = require('../data/seedData');

// @desc    Get cities
// @route   GET /api/options/cities
// @access  Public
exports.getCities = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: cities
  });
};

// @desc    Get education options
// @route   GET /api/options/education
// @access  Public
exports.getEducationOptions = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: educationOptions
  });
}; 