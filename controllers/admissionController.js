import Admission from "../models/admission.js";
import User from "../models/user.js";
import PaymentInformation from "../models/paymentInformation.js";
import Course from "../models/course.js";
import { validateObjectId } from "../utils/validators.js";
import { ErrorMessages, createErrorResponse, createSuccessResponse, asyncHandler } from "../utils/errorHandler.js";

// Helper function to flatten nested data for admission schema
function flattenNestedData(data) {
    const flattened = {};
    
    // Handle personalInfo
    if (data.personalInfo) {
        Object.assign(flattened, data.personalInfo);
    }
    
    // Handle academicDetails
    if (data.academicDetails) {
        Object.assign(flattened, data.academicDetails);
    }
    
    // Handle programSelection
    if (data.programSelection) {
        Object.assign(flattened, data.programSelection);
    }
    
    // Handle paymentDetails
    if (data.paymentDetails) {
        flattened.paymentDetails = data.paymentDetails;
    }
    
    // Handle documents
    if (data.documents) {
        flattened.documents = data.documents;
    }
    
    // Handle other top-level fields
    const topLevelFields = [
        'paymentComplete', 'currentStep', 'isComplete', 
        'submittedAt', 'applicationId', 'status'
    ];
    
    topLevelFields.forEach(field => {
        if (data[field] !== undefined) {
            flattened[field] = data[field];
        }
    });
    
    // Clean up problematic fields that should be strings but are objects
    const documentFields = [
        'aadharCard', 'tenthMarksheet', 'twelfthMarksheet', 'diplomaMarksheet', 
        'graduationMarksheet', 'profilePhoto', 'signature'
    ];
    
    documentFields.forEach(field => {
        if (flattened[field] && typeof flattened[field] === 'object') {
            flattened[field] = ''; // Convert empty object to empty string
        }
    });
    
    if (flattened.randomDocuments && Array.isArray(flattened.randomDocuments)) {
        // Keep as array if it's already an array
    } else if (flattened.randomDocuments && typeof flattened.randomDocuments === 'object') {
        flattened.randomDocuments = []; // Convert object to empty array
    }
    
    // Convert dateOfBirth to Date object if it's a string
    if (flattened.dateOfBirth && typeof flattened.dateOfBirth === 'string') {
        flattened.dateOfBirth = new Date(flattened.dateOfBirth);
    }
    
    // Convert parentsAnnualIncome to number if it's a string
    if (flattened.parentsAnnualIncome && typeof flattened.parentsAnnualIncome === 'string') {
        flattened.parentsAnnualIncome = parseInt(flattened.parentsAnnualIncome) || 0;
    }
    
    return flattened;
}

// Create a new admission
export const createAdmission = asyncHandler(async (req, res) => {
    const newAdmission = await Admission.create({ ...req.body });
    res.status(201).json(createSuccessResponse('Admission created successfully', newAdmission));
});

// Submit admission form and link to user
export const submitAdmissionForm = asyncHandler(async (req, res) => {
    const { 
        userId, 
        courseId, 
        programId, 
        paymentType, // 'full' or 'emi'
        emiOptionId, // if paymentType is 'emi'
        couponCode, // optional
        initialPayment, // amount paid initially
        ...admissionData 
    } = req.body;

    // Validate userId
    if (!userId || !validateObjectId(userId)) {
        return res.status(400).json(createErrorResponse(400, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    // Validate courseId if provided
    if (courseId && !validateObjectId(courseId)) {
        return res.status(400).json(createErrorResponse(400, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_COURSE));
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    // Check if user already has an admission form
    // if (user.admissionFormId) {
    //     return res.status(409).json(createErrorResponse(409, 'ADMISSION', ErrorMessages.ADMISSION.FORM_ALREADY_EXISTS));
    // }

    // STEP 1: Create and save admission form first
    const newAdmission = await Admission.create({
        userId: userId,
        ...admissionData,
        submittedAt: new Date()
    });

    // STEP 2: Link admission form to user immediately after creation
    user.admissionFormId = newAdmission._id;
    await user.save();

    // STEP 3: Create payment information if course and program are provided
    let paymentInfo = null;
    if (courseId && programId) {
        console.log('🔍 Attempting to create payment information...', { courseId, programId });
        try {
            // Find the course and program
            const course = await Course.findById(courseId);
            if (!course) {
                console.warn(`Course not found: ${courseId}`);
            } else {
                console.log('✅ Course found:', course.title);
                const program = course.programs.find(p => p._id.toString() === programId);
                if (!program) {
                    console.warn(`Program not found: ${programId} in course: ${courseId}`);
                } else {
                    console.log('✅ Program found:', program);
                    console.log('✅ Program properties:', Object.keys(program));
                    if (program.feeStructure) {
                        console.log('✅ Fee structure found, creating payment...');
                        // Create payment information with admission reference
                        paymentInfo = await createPaymentInformation({
                            userId,
                            admissionId: newAdmission._id, // Link to the saved admission
                            courseId,
                            programId,
                            program,
                            paymentType,
                            couponCode,
                            initialPayment
                        });

                        // STEP 4: Link payment information to user after successful creation
                        user.paymentInformation.push(paymentInfo._id);
                        await user.save();
                        console.log('✅ Payment information created and linked:', paymentInfo._id);
                    } else {
                        console.warn('❌ No fee structure found in program');
                    }
                }
            }
        } catch (paymentError) {
            console.error('Error creating payment information:', paymentError);
            // Don't fail the admission submission if payment creation fails
            // The admission is already saved and linked to user
        }
    }

    console.log('✅ Admission form submitted successfully:', {
        userId: user._id,
        admissionId: newAdmission._id,
        paymentInfoId: paymentInfo?._id,
        timestamp: new Date().toISOString()
    });

    res.status(201).json(createSuccessResponse('Admission form submitted successfully', {
        admission: newAdmission,
        paymentInformation: paymentInfo,
        user: {
            _id: user._id,
            admissionFormId: user.admissionFormId,
            paymentInformation: user.paymentInformation
        }
    }));
});

// Helper function to create payment information
async function createPaymentInformation({
    userId,
    admissionId, // Reference to the saved admission
    courseId,
    programId,
    program,
    paymentType,
    emiOptionId,
    couponCode,
    initialPayment
}) {
    const feeStructure = program.feeStructure;
    let totalFee = feeStructure.totalFee;
    let registrationFee = feeStructure.registrationFee || 0;
    let processingFee = feeStructure.processingFee || 0;
    let discountAmount = 0;

    // Apply coupon discount if provided
    if (couponCode && feeStructure.couponCodes) {
        const coupon = feeStructure.couponCodes.find(c => 
            c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive
        );
        if (coupon) {
            console.log('✅ Coupon found:', coupon);
            if (coupon.discountType === 'percentage') {
                discountAmount = (totalFee * coupon.discountValue) / 100;
            } else {
                discountAmount = coupon.discountValue;
            }
            console.log(`💰 Discount calculated: ${discountAmount} (${coupon.discountValue}% of ${totalFee})`);
            totalFee -= discountAmount;
        } else {
            console.warn(`❌ Coupon not found or inactive: ${couponCode}`);
        }
    }

    // Calculate initial payment amount
    const actualInitialPayment = initialPayment || 0;
    let emiPlan = null;

    // Handle different payment types
    if (paymentType === 'emi' && emiOptionId && feeStructure.emiOptions) {
        const emiOption = feeStructure.emiOptions.find(emi => 
            emi._id.toString() === emiOptionId
        );
        
        if (emiOption) {
            const emiAmount = Math.ceil((totalFee - actualInitialPayment) / emiOption.numberOfEmis);
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() + 1); // First EMI starts next month

            // Create EMI payments array
            const emiPayments = [];
            for (let i = 1; i <= emiOption.numberOfEmis; i++) {
                const dueDate = new Date(startDate);
                dueDate.setMonth(dueDate.getMonth() + (i - 1));
                
                emiPayments.push({
                    emiNumber: i,
                    dueDate: dueDate,
                    amount: emiAmount,
                    status: 'pending'
                });
            }

            emiPlan = {
                totalEmis: emiOption.numberOfEmis,
                emiAmount: emiAmount,
                emiFrequency: 'monthly',
                startDate: startDate,
                endDate: new Date(startDate.getTime() + (emiOption.numberOfEmis - 1) * 30 * 24 * 60 * 60 * 1000),
                emiPayments: emiPayments,
                emisPaid: 0,
                emisRemaining: emiOption.numberOfEmis
            };
        }
    } else if (paymentType === 'other' || paymentType === 'full') {
        // For 'other' or 'full' payment types, no EMI plan is created
        console.log(`Processing ${paymentType} payment type`);
    } else {
        console.warn(`Unsupported payment type: ${paymentType}`);
    }

    // Create payment information
    const paymentInfo = new PaymentInformation({
        userId,
        admissionId, // Reference to the saved admission
        courseId,
        programId,
        totalFee: feeStructure.totalFee, // Original fee before discount
        registrationFee,
        processingFee,
        totalAmountPaid: 0, // Will be set by recordPayment method
        totalAmountDue: feeStructure.totalFee, // Will be calculated by pre-save middleware
        paymentStatus: 'pending',
        emiPlan,
        totalDiscount: 0, // Will be set by applyCoupon method
        nextPaymentDate: emiPlan ? emiPlan.startDate : null,
        remarks: `Payment created for admission form submission. Payment type: ${paymentType}`,
        documents: {
            feeReceipts: [],
            emiAgreement: emiPlan ? 'Generated on admission submission' : null,
            paymentProofs: []
        }
    });

    // Apply coupon if used
    if (couponCode && discountAmount > 0) {
        const coupon = feeStructure.couponCodes.find(c => 
            c.code.toUpperCase() === couponCode.toUpperCase()
        );
        paymentInfo.applyCoupon(
            couponCode,
            discountAmount,
            coupon.discountType,
            feeStructure.totalFee
        );
    }

    // Record initial payment if any
    if (actualInitialPayment > 0) {
        paymentInfo.recordPayment(
            actualInitialPayment,
            'online', // Default payment method
            `INITIAL_${Date.now()}`,
            'Initial payment during admission submission'
        );
    }

    await paymentInfo.save();
    return paymentInfo;
}

// Get admission form by user ID
export const getAdmissionByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!validateObjectId(userId)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    // Find admission form by userId
    const admission = await Admission.findOne({ userId: userId });
    
    if (!admission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.FORM_NOT_FOUND));
    }

    res.status(200).json(createSuccessResponse('Admission form retrieved successfully', {
        admission: admission,
        user: {
            _id: user._id,
            admissionFormId: user.admissionFormId
        }
    }));
});

// Get user with admission form
export const getUserWithAdmission = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!validateObjectId(userId)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }

    const user = await User.findById(userId)
        .populate('admissionFormId')
        .populate('paymentInformation');

    if (!user) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    res.status(200).json(createSuccessResponse('User data retrieved successfully', user));
});

// Update admission form by user ID
export const updateAdmissionByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    if (!validateObjectId(userId)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    // Find and update admission form by userId
    const updatedAdmission = await Admission.findOneAndUpdate(
        { userId: userId },
        updateData,
        { new: true, runValidators: true }
    );

    if (!updatedAdmission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.FORM_NOT_FOUND));
    }

    res.status(200).json(createSuccessResponse('Admission form updated successfully', updatedAdmission));
});

// Delete admission form by user ID
export const deleteAdmissionByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!validateObjectId(userId)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    // Find and delete admission form by userId
    const deletedAdmission = await Admission.findOneAndDelete({ userId: userId });
    
    if (!deletedAdmission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.FORM_NOT_FOUND));
    }

    // Remove admission form reference from user
    user.admissionFormId = null;
    await user.save();

    res.status(200).json(createSuccessResponse('Admission form deleted successfully', deletedAdmission));
});

// Get all admissions
export const getAdmissions = asyncHandler(async (req, res) => {
    const admissions = await Admission.find();
    res.status(200).json(createSuccessResponse('Admissions retrieved successfully', admissions));
});

// Get a single admission by ID
export const getAdmissionById = asyncHandler(async (req, res) => {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', 'Admission not found'));
    }
    res.status(200).json(createSuccessResponse('Admission retrieved successfully', admission));
});

// Update an admission by ID
export const updateAdmissionById = asyncHandler(async (req, res) => {
    console.log('🔄 Updating admission:', req.params.id);
    console.log('📝 Update data:', req.body);
    
    // Flatten nested data to match the admission schema
    const flattenedData = flattenNestedData(req.body);
    console.log('📝 Flattened data:', flattenedData);
    
    const updatedAdmission = await Admission.findByIdAndUpdate(
        req.params.id,
        flattenedData,
        { new: true, runValidators: true }
    );
    
    if (!updatedAdmission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', 'Admission not found'));
    }
    
    console.log('✅ Admission updated successfully:', {
        admissionId: updatedAdmission._id,
        updatedFields: Object.keys(req.body),
        timestamp: new Date().toISOString()
    });
    
    // Force refresh the admission data to clear any cache
    const refreshedAdmission = await Admission.findById(updatedAdmission._id);
    console.log('🔄 Refreshed admission data:', {
        admissionId: refreshedAdmission._id,
        updatedAt: refreshedAdmission.updatedAt,
        firstName: refreshedAdmission.firstName,
        lastName: refreshedAdmission.lastName,
        city: refreshedAdmission.city,
        state: refreshedAdmission.state
    });
    
    res.status(200).json(createSuccessResponse('Admission updated successfully', refreshedAdmission));
});

// Delete an admission by ID
export const deleteAdmissionById = asyncHandler(async (req, res) => {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', 'Admission not found'));
    }
    res.status(200).json(createSuccessResponse('Admission deleted successfully'));
});

// Update admission status
export const updateAdmissionStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const updatedAdmission = await Admission.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );
    if (!updatedAdmission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', 'Admission not found'));
    }
    res.status(200).json(createSuccessResponse('Admission status updated successfully', updatedAdmission));
});

// Refresh admission data (force reload from database)
export const refreshAdmissionData = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!validateObjectId(userId)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }

    // Force refresh by clearing cache and re-fetching
    const user = await User.findById(userId)
        .populate({
            path: 'admissionFormId',
            options: { lean: false } // Force fresh data
        })
        .populate('paymentInformation');

    if (!user) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', ErrorMessages.ADMISSION.INVALID_USER));
    }

    console.log('🔄 Refreshed admission data:', {
        userId: user._id,
        admissionId: user.admissionFormId?._id,
        admissionData: user.admissionFormId ? {
            firstName: user.admissionFormId.firstName,
            lastName: user.admissionFormId.lastName,
            city: user.admissionFormId.city,
            state: user.admissionFormId.state,
            status: user.admissionFormId.status,
            updatedAt: user.admissionFormId.updatedAt
        } : null
    });

    res.status(200).json(createSuccessResponse('Admission data refreshed successfully', {
        user: {
            _id: user._id,
            admissionFormId: user.admissionFormId,
            paymentInformation: user.paymentInformation
        }
    }));
});

// Debug endpoint to check admission state
export const debugAdmissionState = asyncHandler(async (req, res) => {
    const { admissionId } = req.params;

    if (!validateObjectId(admissionId)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }

    // Get admission directly from database
    const admission = await Admission.findById(admissionId);
    if (!admission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', 'Admission not found'));
    }

    // Get user with populated admission
    const user = await User.findOne({ admissionFormId: admissionId })
        .populate('admissionFormId')
        .populate('paymentInformation');

    console.log('🔍 Debug admission state:', {
        admissionId: admission._id,
        admissionUpdatedAt: admission.updatedAt,
        admissionFirstName: admission.firstName,
        admissionLastName: admission.lastName,
        admissionCity: admission.city,
        userFound: !!user,
        userAdmissionId: user?.admissionFormId?._id,
        userAdmissionUpdatedAt: user?.admissionFormId?.updatedAt,
        userAdmissionFirstName: user?.admissionFormId?.firstName,
        userAdmissionLastName: user?.admissionFormId?.lastName
    });

    res.status(200).json(createSuccessResponse('Admission state debug info', {
        directAdmission: {
            _id: admission._id,
            updatedAt: admission.updatedAt,
            firstName: admission.firstName,
            lastName: admission.lastName,
            city: admission.city,
            state: admission.state,
            currentStep: admission.currentStep
        },
        userWithAdmission: user ? {
            _id: user._id,
            admissionFormId: user.admissionFormId,
            paymentInformation: user.paymentInformation
        } : null
    }));
}); 