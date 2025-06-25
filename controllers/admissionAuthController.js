import User from '../models/user.js';
import { validateEmail, validatePhone, validatePassword } from '../utils/validators.js';
import mongoose from 'mongoose';

// Signup for admission
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(401).json({
                success: false,
                error: 'Please enter a valid email address'
            });
        }

        // Validate phone number
        if (!validatePhone(phone)) {
            return res.status(402).json({
                success: false,
                error: 'Please enter a valid 10-digit phone number'
            });
        }

        // Validate password
        if (!validatePassword(password)) {
            return res.status(403).json({
                success: false,
                error: 'Password must be at least 6 characters long'
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(408).json({
                success: false,
                error: 'Passwords do not match'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User with this email or phone number already exists'
            });
        }

        // Create new user
        const newUser = new User({
            email,
            phone,
            password
        });

        await newUser.save();

        // Create admission record with basic user information
        const Admission = mongoose.model('Admission');
        const newAdmission = new Admission({
            userId: newUser._id,
            firstName,
            lastName,
            email,
            phone,
            status: 'pending',
            submittedAt: new Date()
        });

        await newAdmission.save();

        // Link admission form to user
        newUser.admissionFormId = newAdmission._id;
        await newUser.save();

        // Generate session token
        const sessionToken = newUser.generateSessionToken();
        await newUser.save();

        // Populate admission and payment data for the response
        const populatedUser = await User.findById(newUser._id)
            .populate('admissionFormId')
            .populate('paymentInformation');

        console.log('✅ User registration successful:', {
            userId: newUser._id,
            email: newUser.email,
            applicationId: newUser.applicationId,
            admissionId: newAdmission._id,
            hasAdmissionForm: !!populatedUser.admissionFormId,
            paymentInfoCount: populatedUser.paymentInformation?.length || 0,
            timestamp: new Date().toISOString()
        });

        // Return user data (excluding password) with populated data
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                _id: populatedUser._id,
                name: `${firstName} ${lastName}`,
                email: populatedUser.email,
                phone: populatedUser.phone,
                applicationId: populatedUser.applicationId,
                admissionFormId: populatedUser.admissionFormId,
                paymentInformation: populatedUser.paymentInformation,
                isActive: populatedUser.isActive,
                isVerified: populatedUser.isVerified,
                sessionToken
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Login for admission
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user by email and populate admission and payment data
        const user = await User.findOne({ email })
            .select('+password')
            .populate('admissionFormId')
            .populate('paymentInformation');
            
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                error: 'Account is deactivated'
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Generate new session token
        const sessionToken = user.generateSessionToken();
        await user.save();

        console.log('✅ User login successful:', {
            userId: user._id,
            email: user.email,
            applicationId: user.applicationId,
            hasAdmissionForm: !!user.admissionFormId,
            paymentInfoCount: user.paymentInformation?.length || 0,
            timestamp: new Date().toISOString()
        });

        // Return user data with populated admission and payment information
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                _id: user._id,
                name: user.admissionFormId ? `${user.admissionFormId.firstName} ${user.admissionFormId.lastName}` : 'User',
                email: user.email,
                phone: user.phone,
                applicationId: user.applicationId,
                admissionFormId: user.admissionFormId,
                paymentInformation: user.paymentInformation,
                isActive: user.isActive,
                isVerified: user.isVerified,
                sessionToken
            }
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('admissionFormId')
            .populate('paymentInformation');
            
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.admissionFormId ? `${user.admissionFormId.firstName} ${user.admissionFormId.lastName}` : 'User',
                email: user.email,
                phone: user.phone,
                applicationId: user.applicationId,
                admissionFormId: user.admissionFormId,
                paymentInformation: user.paymentInformation,
                isActive: user.isActive,
                isVerified: user.isVerified,
                lastLoginAt: user.lastLoginAt,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error('❌ Get profile error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.sessionToken = null;
            user.sessionExpiresAt = null;
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('❌ Logout error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Verify session token middleware
export const verifySession = async (req, res, next) => {
    try {
        const sessionToken = req.headers.authorization?.replace('Bearer ', '');
        
        if (!sessionToken) {
            return res.status(401).json({
                success: false,
                error: 'Session token required'
            });
        }

        const user = await User.findBySessionToken(sessionToken);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid or expired session'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('❌ Session verification error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}; 