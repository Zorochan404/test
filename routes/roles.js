import express from 'express';
const router = express.Router();
import Role from '../models/role.js';
import authenticateToken from '../middleware/auth.js';
import checkPermission from '../middleware/permission.js';

// Get all roles
router.get('/', authenticateToken, checkPermission('roles', 'read'), async (req, res) => {
  try {
    const roles = await Role.find({ isActive: true }).populate('permissions');
    res.json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new role
router.post('/', authenticateToken, checkPermission('roles', 'write'), async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update role
router.put('/:id', authenticateToken, checkPermission('roles', 'write'), async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: role });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete role
router.delete('/:id', authenticateToken, checkPermission('roles', 'delete'), async (req, res) => {
  try {
    await Role.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;