import User from '../models/user.js';
import { validateEmail, validatePhone, validatePassword } from '../utils/validators.js';
import { ErrorMessages, sendErrorResponse, sendSuccessResponse, asyncHandler } from '../utils/errorHandler.js';
import mongoose from 'mongoose';

// Signup for admission
export const signup = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        return sendErrorResponse(res, 400, 'AUTH', ErrorMessages.AUTH.MISSING_FIELDS);
    }

    // Validate email format
    if (!validateEmail(email)) {
        return sendErrorResponse(res, 400, 'AUTH', ErrorMessages.AUTH.INVALID_EMAIL);
    }

    // Validate phone number
    if (!validatePhone(phone)) {
        return sendErrorResponse(res, 400, 'AUTH', ErrorMessages.AUTH.INVALID_PHONE);
    }

    // Validate password
    if (!validatePassword(password)) {
        return sendErrorResponse(res, 400, 'AUTH', ErrorMessages.AUTH.WEAK_PASSWORD);
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return sendErrorResponse(res, 400, 'AUTH', ErrorMessages.AUTH.PASSWORD_MISMATCH);
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { phone }]
    });

    if (existingUser) {
        const errorMessage = existingUser.email === email 
            ? ErrorMessages.AUTH.EMAIL_EXISTS 
            : ErrorMessages.AUTH.PHONE_EXISTS;
        return sendErrorResponse(res, 409, 'AUTH', errorMessage);
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
    return sendSuccessResponse(res, 201, 'Registration successful', {
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
    });
});

// Login for admission
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return sendErrorResponse(res, 400, 'AUTH', ErrorMessages.AUTH.MISSING_FIELDS);
    }

    // Find user by email and populate admission and payment data
    const user = await User.findOne({ email })
        .select('+password')
        .populate('admissionFormId')
        .populate('paymentInformation');
        
    if (!user) {
        return sendErrorResponse(res, 401, 'AUTH', ErrorMessages.AUTH.INVALID_CREDENTIALS);
    }

    // Check if user is active
    if (!user.isActive) {
        return sendErrorResponse(res, 401, 'AUTH', ErrorMessages.AUTH.ACCOUNT_DEACTIVATED);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return sendErrorResponse(res, 401, 'AUTH', ErrorMessages.AUTH.INVALID_CREDENTIALS);
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
    return sendSuccessResponse(res, 200, 'Login successful', {
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
    });
});

// Get current user profile
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('admissionFormId')
        .populate('paymentInformation');
        
    if (!user) {
        return sendErrorResponse(res, 404, 'AUTH', ErrorMessages.AUTH.USER_NOT_FOUND);
    }

    return sendSuccessResponse(res, 200, 'Profile retrieved successfully', {
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
    });
});

// Logout
export const logout = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        user.sessionToken = null;
        user.sessionExpiresAt = null;
        await user.save();
    }

    return sendSuccessResponse(res, 200, 'Logged out successfully');
});

// Verify session token middleware
export const verifySession = asyncHandler(async (req, res, next) => {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
        return sendErrorResponse(res, 401, 'AUTH', ErrorMessages.AUTH.SESSION_REQUIRED);
    }

    const user = await User.findBySessionToken(sessionToken);
    if (!user) {
        return sendErrorResponse(res, 401, 'AUTH', ErrorMessages.AUTH.SESSION_EXPIRED);
    }

    req.user = user;
    next();
}); 