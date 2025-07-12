import express from 'express';
const router = express.Router();
import Permission from '../models/Permission.js';
import authenticateToken from '../middleware/auth.js';
import checkPermission from '../middleware/permission.js';

// Get all permissions
router.get('/', authenticateToken, checkPermission('permissions', 'read'), async (req, res) => {
  try {
    const permissions = await Permission.find({ isActive: true });
    res.json({ success: true, data: permissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get permissions by section
router.get('/section/:section', authenticateToken, checkPermission('permissions', 'read'), async (req, res) => {
  try {
    const permissions = await Permission.find({ 
      section: req.params.section, 
      isActive: true 
    });
    res.json({ success: true, data: permissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get permissions by resource
router.get('/resource/:resource', authenticateToken, checkPermission('permissions', 'read'), async (req, res) => {
  try {
    const permissions = await Permission.find({ 
      resource: req.params.resource, 
      isActive: true 
    });
    res.json({ success: true, data: permissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new permission
router.post('/', authenticateToken, checkPermission('permissions', 'write'), async (req, res) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).json({ success: true, data: permission });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update permission
router.put('/:id', authenticateToken, checkPermission('permissions', 'write'), async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: permission });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete permission
router.delete('/:id', authenticateToken, checkPermission('permissions', 'delete'), async (req, res) => {
  try {
    await Permission.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all unique sections
router.get('/sections/all', authenticateToken, checkPermission('permissions', 'read'), async (req, res) => {
  try {
    const sections = await Permission.distinct('section');
    res.json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all unique resources
router.get('/resources/all', authenticateToken, checkPermission('permissions', 'read'), async (req, res) => {
  try {
    const resources = await Permission.distinct('resource');
    res.json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 