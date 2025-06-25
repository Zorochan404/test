// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone validation (10-digit Indian phone number)
export const validatePhone = (phone) => {
    return phone.length === 10 && /^\d+$/.test(phone);
};

// Password validation (minimum 6 characters)
export const validatePassword = (password) => {
    return password && password.length >= 6;
};

// Aadhar number validation (12-digit)
export const validateAadhar = (aadhar) => {
    return aadhar && aadhar.length === 12 && /^\d+$/.test(aadhar);
};

// Pincode validation (6-digit)
export const validatePincode = (pincode) => {
    return pincode && pincode.length === 6 && /^\d+$/.test(pincode);
};

// Percentage validation (0-100)
export const validatePercentage = (percentage) => {
    const num = parseFloat(percentage);
    return !isNaN(num) && num >= 0 && num <= 100;
};

// Year validation (1900 to current year)
export const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    const num = parseInt(year);
    return !isNaN(num) && num >= 1900 && num <= currentYear;
};

// Required field validation
export const validateRequired = (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
};

// MongoDB ObjectId validation
export const validateObjectId = (id) => {
    if (!id) return false;
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id.toString());
};

// File validation
export const validateFile = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'], maxSize = 5 * 1024 * 1024) => {
    if (!file) return false;
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
        return false;
    }
    
    // Check file size (5MB default)
    if (file.size > maxSize) {
        return false;
    }
    
    return true;
}; 