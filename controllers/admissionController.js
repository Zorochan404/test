import Admission from "../models/admission.js";
import User from "../models/user.js";
import PaymentInformation from "../models/paymentInformation.js";
import Course from "../models/course.js";
import { validateObjectId } from "../utils/validators.js";
import { ErrorMessages, createErrorResponse, createSuccessResponse, asyncHandler } from "../utils/errorHandler.js";

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
    if (user.admissionFormId) {
        return res.status(409).json(createErrorResponse(409, 'ADMISSION', ErrorMessages.ADMISSION.FORM_ALREADY_EXISTS));
    }

    // Create admission form
    const newAdmission = await Admission.create({
        userId: userId,
        ...admissionData,
        submittedAt: new Date()
    });

    // Link admission form to user
    user.admissionFormId = newAdmission._id;
    await user.save();

    // Create payment information if course and program are provided
    let paymentInfo = null;
    if (courseId && programId) {
        try {
            // Find the course and program
            const course = await Course.findById(courseId);
            if (!course) {
                console.warn(`Course not found: ${courseId}`);
            } else {
                const program = course.programs.find(p => p._id.toString() === programId);
                if (!program) {
                    console.warn(`Program not found: ${programId} in course: ${courseId}`);
                } else if (program.feeStructure) {
                    // Create payment information
                    paymentInfo = await createPaymentInformation({
                        userId,
                        courseId,
                        programId,
                        program,
                        paymentType,
                        emiOptionId,
                        couponCode,
                        initialPayment
                    });

                    // Link payment information to user
                    user.paymentInformation.push(paymentInfo._id);
                    await user.save();
                }
            }
        } catch (paymentError) {
            console.error('Error creating payment information:', paymentError);
            // Don't fail the admission submission if payment creation fails
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
            if (coupon.discountType === 'percentage') {
                discountAmount = (totalFee * coupon.discountValue) / 100;
            } else {
                discountAmount = coupon.discountValue;
            }
            totalFee -= discountAmount;
        }
    }

    // Calculate initial payment amount
    const actualInitialPayment = initialPayment || 0;
    let emiPlan = null;

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
    }

    // Create payment information
    const paymentInfo = new PaymentInformation({
        userId,
        courseId,
        programId,
        totalFee: feeStructure.totalFee, // Original fee before discount
        registrationFee,
        processingFee,
        totalAmountPaid: actualInitialPayment,
        totalAmountDue: totalFee - actualInitialPayment,
        paymentStatus: actualInitialPayment >= totalFee ? 'completed' : 'partial',
        emiPlan,
        totalDiscount: discountAmount,
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
    const updatedAdmission = await Admission.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true, runValidators: true }
    );
    if (!updatedAdmission) {
        return res.status(404).json(createErrorResponse(404, 'ADMISSION', 'Admission not found'));
    }
    res.status(200).json(createSuccessResponse('Admission updated successfully', updatedAdmission));
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