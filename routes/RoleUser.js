import express from 'express';
const router = express.Router();
import RoleUser from '../models/roleUser.js';
import authenticateToken from '../middleware/auth.js';
import checkPermission from '../middleware/permission.js';
import bcrypt from 'bcryptjs';

// Get all users
router.get('/', authenticateToken, checkPermission('users', 'read'), async (req, res) => {
  try {
    const users = await RoleUser.find({ isActive: true })
      .populate('role')
      .populate('permissions')
      .select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new user
router.post('/', authenticateToken, checkPermission('users', 'write'), async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new RoleUser({
      ...userData,  
      password: hashedPassword
    });
    
    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update user
router.put('/:id', authenticateToken, checkPermission('users', 'write'), async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }
    
    const user = await RoleUser.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('role')
      .populate('permissions')
      .select('-password');
      
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete('/:id', authenticateToken, checkPermission('users', 'delete'), async (req, res) => {
  try {
    await RoleUser.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;