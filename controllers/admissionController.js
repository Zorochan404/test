import Admission from "../models/admission.js";
import User from "../models/user.js";
import PaymentInformation from "../models/paymentInformation.js";
import Course from "../models/course.js";
import { validateObjectId } from "../utils/validators.js";

// Create a new admission
export const createAdmission = async (req, res, next) => {
    try {
        const newAdmission = await Admission.create({ ...req.body });
        res.status(201).json({ success: true, data: newAdmission });
    } catch (e) {
        next(e);
    }
};

// Submit admission form and link to user
export const submitAdmissionForm = async (req, res, next) => {
    try {
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
        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Valid userId is required" 
            });
        }

        // Validate courseId if provided
        // if (courseId && !validateObjectId(courseId)) {
        //     return res.status(400).json({ 
        //         success: false, 
        //         message: "Valid courseId is required" 
        //     });
        // }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Check if user already has an admission form
        if (user.admissionFormId) {
            return res.status(409).json({ 
                success: false, 
                message: "User already has a submitted admission form" 
            });
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

        res.status(201).json({ 
            success: true, 
            message: "Admission form submitted successfully",
            data: {
                admission: newAdmission,
                paymentInformation: paymentInfo,
                user: {
                    _id: user._id,
                    admissionFormId: user.admissionFormId,
                    paymentInformation: user.paymentInformation
                }
            }
        });
    } catch (e) {
        next(e);
    }
};

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
export const getAdmissionByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!validateObjectId(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid userId format" 
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Find admission form by userId
        const admission = await Admission.findOne({ userId: userId });
        
        if (!admission) {
            return res.status(404).json({ 
                success: false, 
                message: "No admission form found for this user" 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: {
                admission: admission,
                user: {
                    _id: user._id,
                    admissionFormId: user.admissionFormId
                }
            }
        });
    } catch (e) {
        next(e);
    }
};

// Get user with admission form
export const getUserWithAdmission = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!validateObjectId(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid userId format" 
            });
        }

        const user = await User.findById(userId)
            .populate('admissionFormId')
            .populate('paymentInformation');

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: user
        });
    } catch (e) {
        next(e);
    }
};

// Update admission form by user ID
export const updateAdmissionByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        if (!validateObjectId(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid userId format" 
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Find and update admission form by userId
        const updatedAdmission = await Admission.findOneAndUpdate(
            { userId: userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAdmission) {
            return res.status(404).json({ 
                success: false, 
                message: "No admission form found for this user" 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Admission form updated successfully",
            data: updatedAdmission
        });
    } catch (e) {
        next(e);
    }
};

// Delete admission form by user ID
export const deleteAdmissionByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!validateObjectId(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid userId format" 
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Find and delete admission form by userId
        const deletedAdmission = await Admission.findOneAndDelete({ userId: userId });
        
        if (!deletedAdmission) {
            return res.status(404).json({ 
                success: false, 
                message: "No admission form found for this user" 
            });
        }

        // Remove admission form reference from user
        user.admissionFormId = null;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Admission form deleted successfully",
            data: deletedAdmission
        });
    } catch (e) {
        next(e);
    }
};

// Get all admissions
export const getAdmissions = async (req, res, next) => {
    try {
        const admissions = await Admission.find();
        res.status(200).json({ success: true, data: admissions });
    } catch (e) {
        next(e);
    }
};

// Get a single admission by ID
export const getAdmissionById = async (req, res, next) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (!admission) {
            return res.status(404).json({ success: false, message: "Admission not found" });
        }
        res.status(200).json({ success: true, data: admission });
    } catch (e) {
        next(e);
    }
};

// Update an admission by ID
export const updateAdmissionById = async (req, res, next) => {
    try {
        const updatedAdmission = await Admission.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );
        if (!updatedAdmission) {
            return res.status(404).json({ success: false, message: "Admission not found" });
        }
        res.status(200).json({ success: true, data: updatedAdmission });
    } catch (e) {
        next(e);
    }
};

// Delete an admission by ID
export const deleteAdmissionById = async (req, res, next) => {
    try {
        const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
        if (!deletedAdmission) {
            return res.status(404).json({ success: false, message: "Admission not found" });
        }
        res.status(200).json({ success: true, message: "Admission deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Update admission status
export const updateAdmissionStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const updatedAdmission = await Admission.findByIdAndUpdate(
            req.params.id,
            { applicationStatus: status },
            { new: true, runValidators: true }
        );
        if (!updatedAdmission) {
            return res.status(404).json({ success: false, message: "Admission not found" });
        }
        res.status(200).json({ success: true, data: updatedAdmission });
    } catch (e) {
        next(e);
    }
}; 