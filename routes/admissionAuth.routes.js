import express from 'express';
import {
    signup,
    login,
    getProfile,
    logout,
    verifySession
} from '../controllers/admissionAuthController.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (authentication required)
router.get('/profile', verifySession, getProfile);
router.post('/logout', verifySession, logout);

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Admission Auth API is running',
        timestamp: new Date().toISOString()
    });
});

export default router; 