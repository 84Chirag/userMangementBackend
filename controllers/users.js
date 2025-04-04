const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is accessing their own data or is an admin
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this resource'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is updating their own data
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this resource'
      });
    }
    
    // Remove fields that shouldn't be updated via this endpoint
    const { password, ...updateData } = req.body;
    
    // Handle images if they are being updated
    if (req.files && req.files.length > 0) {
      if (req.files.length > 4) {
        return res.status(400).json({
          success: false,
          error: 'Maximum 4 images are allowed'
        });
      }
      
      // Delete old images if they exist
      if (user.images && user.images.length > 0) {
        user.images.forEach(img => {
          const imgPath = path.join(__dirname, '..', img);
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        });
      }
      
      // Save new image paths
      const images = [];
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
      
      updateData.images = images;
      updateData.updateAt = Date.now();
    }
    
    // Update user
    user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is deleting their own account
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this resource'
      });
    }
    
    // Delete user images if they exist
    if (user.images && user.images.length > 0) {
      user.images.forEach(img => {
        const imgPath = path.join(__dirname, '..', img);
        console.log(imgPath);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });
    }
    
    await user.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
}; 