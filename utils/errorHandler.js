// Centralized error handling with user-friendly messages
export const ErrorMessages = {
    // Authentication Errors
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid email or password. Please check your credentials and try again.',
        USER_NOT_FOUND: 'User account not found. Please check your email address.',
        ACCOUNT_DEACTIVATED: 'Your account has been deactivated. Please contact support.',
        SESSION_EXPIRED: 'Your session has expired. Please log in again.',
        SESSION_REQUIRED: 'Please log in to access this feature.',
        EMAIL_EXISTS: 'An account with this email address already exists.',
        PHONE_EXISTS: 'An account with this phone number already exists.',
        INVALID_EMAIL: 'Please enter a valid email address.',
        INVALID_PHONE: 'Please enter a valid 10-digit phone number.',
        WEAK_PASSWORD: 'Password must be at least 6 characters long.',
        PASSWORD_MISMATCH: 'Passwords do not match. Please try again.',
        MISSING_FIELDS: 'Please fill in all required fields.',
        INVALID_TOKEN: 'Invalid or expired token. Please log in again.'
    },

    // Admission Errors
    ADMISSION: {
        FORM_NOT_FOUND: 'No admission form found for this user.',
        FORM_ALREADY_EXISTS: 'You have already submitted an admission form.',
        INVALID_USER: 'User not found or invalid user ID.',
        INVALID_COURSE: 'Selected course not found.',
        INVALID_PROGRAM: 'Selected program not found.',
        INVALID_EMI_OPTION: 'Selected EMI option not found.',
        INVALID_COUPON: 'Invalid or expired coupon code.',
        PAYMENT_REQUIRED: 'Payment information is required for admission.',
        DOCUMENT_REQUIRED: 'Required documents are missing.',
        SUBMISSION_FAILED: 'Failed to submit admission form. Please try again.',
        UPDATE_FAILED: 'Failed to update admission form. Please try again.',
        DELETE_FAILED: 'Failed to delete admission form. Please try again.'
    },

    // Payment Errors
    PAYMENT: {
        PAYMENT_NOT_FOUND: 'Payment information not found.',
        INSUFFICIENT_AMOUNT: 'Payment amount is insufficient.',
        PAYMENT_FAILED: 'Payment processing failed. Please try again.',
        EMI_PLAN_NOT_FOUND: 'EMI plan not found.',
        COUPON_EXPIRED: 'Coupon code has expired.',
        COUPON_ALREADY_USED: 'Coupon code has already been used.',
        INVALID_PAYMENT_METHOD: 'Invalid payment method selected.',
        PAYMENT_ALREADY_COMPLETED: 'Payment has already been completed.',
        REFUND_FAILED: 'Refund processing failed. Please contact support.'
    },

    // Course Errors
    COURSE: {
        COURSE_NOT_FOUND: 'Course not found.',
        PROGRAM_NOT_FOUND: 'Program not found.',
        INVALID_FEE_STRUCTURE: 'Invalid fee structure.',
        EMI_OPTION_NOT_FOUND: 'EMI option not found.',
        COUPON_NOT_FOUND: 'Coupon code not found.',
        COURSE_INACTIVE: 'This course is currently not available.',
        PROGRAM_INACTIVE: 'This program is currently not available.'
    },

    // File Upload Errors
    UPLOAD: {
        FILE_REQUIRED: 'Please select a file to upload.',
        INVALID_FILE_TYPE: 'Invalid file type. Please upload a valid file.',
        FILE_TOO_LARGE: 'File size is too large. Please upload a smaller file.',
        UPLOAD_FAILED: 'File upload failed. Please try again.',
        INVALID_FILE_FORMAT: 'Invalid file format. Please upload a supported file type.'
    },

    // Validation Errors
    VALIDATION: {
        INVALID_ID: 'Invalid ID format.',
        REQUIRED_FIELD: 'This field is required.',
        INVALID_FORMAT: 'Invalid format. Please check your input.',
        MIN_LENGTH: 'Minimum length requirement not met.',
        MAX_LENGTH: 'Maximum length exceeded.',
        INVALID_DATE: 'Invalid date format.',
        INVALID_NUMBER: 'Invalid number format.',
        INVALID_EMAIL_FORMAT: 'Please enter a valid email address.',
        INVALID_PHONE_FORMAT: 'Please enter a valid phone number.'
    },

    // Server Errors
    SERVER: {
        INTERNAL_ERROR: 'Something went wrong. Please try again later.',
        DATABASE_ERROR: 'Database connection error. Please try again.',
        NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
        TIMEOUT_ERROR: 'Request timeout. Please try again.',
        SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.'
    },

    // General Errors
    GENERAL: {
        NOT_FOUND: 'The requested resource was not found.',
        UNAUTHORIZED: 'You are not authorized to access this resource.',
        FORBIDDEN: 'Access denied. You do not have permission to perform this action.',
        BAD_REQUEST: 'Invalid request. Please check your input.',
        CONFLICT: 'Resource conflict. The requested resource already exists.',
        RATE_LIMIT: 'Too many requests. Please try again later.',
        ROUTE_NOT_FOUND: 'The requested route was not found.'
    }
};

// Error response helper
export const createErrorResponse = (statusCode, errorType, customMessage = null) => {
    const errorMessage = customMessage || ErrorMessages[errorType] || ErrorMessages.GENERAL.BAD_REQUEST;
    
    return {
        success: false,
        error: errorMessage,
        errorType: errorType,
        statusCode: statusCode,
        timestamp: new Date().toISOString()
    };
};

// Validation error helper
export const createValidationError = (field, message) => {
    return {
        success: false,
        error: message,
        field: field,
        errorType: 'VALIDATION',
        statusCode: 400,
        timestamp: new Date().toISOString()
    };
};

// Success response helper
export const createSuccessResponse = (message, data = null) => {
    return {
        success: true,
        message: message,
        data: data,
        statusCode: 200,
        timestamp: new Date().toISOString()
    };
};

// Send JSON error response helper
export const sendErrorResponse = (res, statusCode, errorType, customMessage = null) => {
    const errorResponse = createErrorResponse(statusCode, errorType, customMessage);
    
    res.status(statusCode).json(errorResponse);
};

// Send JSON success response helper
export const sendSuccessResponse = (res, statusCode, message, data = null) => {
    const successResponse = createSuccessResponse(message, data);
    
    res.status(statusCode).json(successResponse);
};

// Error handler middleware
export const errorHandler = (error, req, res, next) => {
    console.error('❌ Error:', error);

    // Set JSON content type header
    res.setHeader('Content-Type', 'application/json');

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        const errorResponse = {
            success: false,
            error: 'Please check your input and try again.',
            details: validationErrors,
            errorType: 'VALIDATION',
            statusCode: 400,
            timestamp: new Date().toISOString()
        };
        
        return res.status(400).json(errorResponse);
    }

    // Mongoose duplicate key errors
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        let message = 'Duplicate value found. Maybe the item your creating already exists.';
        
        if (field === 'email') {
            message = ErrorMessages.AUTH.EMAIL_EXISTS;
        } else if (field === 'phone') {
            message = ErrorMessages.AUTH.PHONE_EXISTS;
        } else if (field === 'applicationId') {
            message = 'Application ID already exists.';
        }
        
        const errorResponse = {
            success: false,
            error: message,
            field: field,
            errorType: 'DUPLICATE',
            statusCode: 409,
            timestamp: new Date().toISOString()
        };
        
        return res.status(409).json(errorResponse);
    }

    // Mongoose cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
        const errorResponse = {
            success: false,
            error: ErrorMessages.VALIDATION.INVALID_ID,
            errorType: 'VALIDATION',
            statusCode: 400,
            timestamp: new Date().toISOString()
        };
        
        return res.status(400).json(errorResponse);
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        const errorResponse = {
            success: false,
            error: ErrorMessages.AUTH.INVALID_TOKEN,
            errorType: 'AUTH',
            statusCode: 401,
            timestamp: new Date().toISOString()
        };
        
        return res.status(401).json(errorResponse);
    }

    // JWT expired
    if (error.name === 'TokenExpiredError') {
        const errorResponse = {
            success: false,
            error: ErrorMessages.AUTH.SESSION_EXPIRED,
            errorType: 'AUTH',
            statusCode: 401,
            timestamp: new Date().toISOString()
        };
        
        return res.status(401).json(errorResponse);
    }

    // Network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        const errorResponse = {
            success: false,
            error: ErrorMessages.SERVER.NETWORK_ERROR,
            errorType: 'SERVER',
            statusCode: 503,
            timestamp: new Date().toISOString()
        };
        
        return res.status(503).json(errorResponse);
    }

    // Timeout errors
    if (error.code === 'ETIMEDOUT') {
        const errorResponse = {
            success: false,
            error: ErrorMessages.SERVER.TIMEOUT_ERROR,
            errorType: 'SERVER',
            statusCode: 408,
            timestamp: new Date().toISOString()
        };
        
        return res.status(408).json(errorResponse);
    }

    // Default server error
    const errorResponse = {
        success: false,
        error: ErrorMessages.SERVER.INTERNAL_ERROR,
        errorType: 'SERVER',
        statusCode: 500,
        timestamp: new Date().toISOString()
    };
    
    return res.status(500).json(errorResponse);
};

// Async error wrapper
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}; 