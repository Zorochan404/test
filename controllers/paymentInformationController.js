import PaymentInformation from "../models/paymentInformation.js";
import User from "../models/user.js";
import Course from "../models/course.js";
import { validateObjectId } from "../utils/validators.js";
import { ErrorMessages, createErrorResponse, createSuccessResponse, asyncHandler } from "../utils/errorHandler.js";

// Create new payment information
export const createPaymentInformation = asyncHandler(async (req, res) => {
  const {
    userId,
    courseId,
    programId,
    totalFee,
    registrationFee = 0,
    processingFee = 0,
    emiPlan,
    paymentMethod = 'online'
  } = req.body;

  // Validate required fields
  if (!userId || !courseId || !programId || !totalFee) {
    return res.status(400).json(createErrorResponse(400, 'PAYMENT', 'Missing required fields: userId, courseId, programId, totalFee'));
  }

  // Validate ObjectIds
  if (!validateObjectId(userId) || !validateObjectId(courseId)) {
    return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(createErrorResponse(404, 'PAYMENT', ErrorMessages.ADMISSION.INVALID_USER));
  }

  // Check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json(createErrorResponse(404, 'PAYMENT', ErrorMessages.ADMISSION.INVALID_COURSE));
  }

  // Check if payment information already exists for this user-course-program combination
  const existingPayment = await PaymentInformation.findByUserAndCourse(userId, courseId, programId);
  if (existingPayment) {
    return res.status(409).json(createErrorResponse(409, 'PAYMENT', 'Payment information already exists for this user and course program'));
  }

  // Calculate EMI plan if provided
  let emiPayments = [];
  if (emiPlan && emiPlan.totalEmis > 0) {
    const emiAmount = Math.ceil((totalFee - registrationFee) / emiPlan.totalEmis);
    const startDate = new Date();
    
    for (let i = 1; i <= emiPlan.totalEmis; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      
      emiPayments.push({
        emiNumber: i,
        dueDate: dueDate,
        amount: i === emiPlan.totalEmis ? 
          (totalFee - registrationFee) - (emiAmount * (emiPlan.totalEmis - 1)) : 
          emiAmount,
        status: 'pending'
      });
    }
  }

  // Create payment information
  const paymentInfo = new PaymentInformation({
    userId,
    courseId,
    programId,
    totalFee,
    registrationFee,
    processingFee,
    totalAmountDue: totalFee,
    emiPlan: {
      ...emiPlan,
      emiPayments,
      emisRemaining: emiPlan?.totalEmis || 0
    }
  });

  await paymentInfo.save();

  // Add payment information reference to user
  user.paymentInformation.push(paymentInfo._id);
  await user.save();

  res.status(201).json(createSuccessResponse('Payment information created successfully', paymentInfo));
});

// Get payment information by ID
export const getPaymentInformationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
  }

  const paymentInfo = await PaymentInformation.findById(id)
    .populate('userId', 'name email phone applicationId')
    .populate('courseId', 'title description');

  if (!paymentInfo) {
    return res.status(404).json(createErrorResponse(404, 'PAYMENT', ErrorMessages.PAYMENT.PAYMENT_NOT_FOUND));
  }

  res.status(200).json(createSuccessResponse('Payment information retrieved successfully', paymentInfo));
});

// Get payment information by user ID
export const getPaymentInformationByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!validateObjectId(userId)) {
    return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
  }

  const paymentInfo = await PaymentInformation.find({ userId, isActive: true })
    .populate('courseId', 'title description')
    .sort({ createdAt: -1 });

  res.status(200).json(createSuccessResponse('Payment information retrieved successfully', {
    count: paymentInfo.length,
    data: paymentInfo
  }));
});

// Record a payment transaction
export const recordPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      amount,
      paymentMethod,
      transactionId,
      description,
      gatewayTransactionId,
      paymentGateway
    } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    if (!amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Amount and payment method are required"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    // Record the payment
    const transaction = paymentInfo.recordPayment(
      amount,
      paymentMethod,
      transactionId,
      description
    );

    // Add gateway information if provided
    if (gatewayTransactionId) {
      transaction.gatewayTransactionId = gatewayTransactionId;
    }
    if (paymentGateway) {
      transaction.paymentGateway = paymentGateway;
    }

    await paymentInfo.save();

    res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      data: {
        paymentInfo,
        transaction
      }
    });

  } catch (error) {
    console.error("Error recording payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Apply coupon to payment
export const applyCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      couponCode,
      discountAmount,
      discountType,
      originalValue
    } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    if (!couponCode || !discountAmount || !discountType || !originalValue) {
      return res.status(400).json({
        success: false,
        message: "Coupon code, discount amount, discount type, and original value are required"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    // Check if coupon already applied
    const existingCoupon = paymentInfo.appliedCoupons.find(
      coupon => coupon.couponCode === couponCode.toUpperCase()
    );

    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon already applied"
      });
    }

    // Apply coupon
    const couponUsage = paymentInfo.applyCoupon(
      couponCode,
      discountAmount,
      discountType,
      originalValue
    );

    await paymentInfo.save();

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        paymentInfo,
        couponUsage
      }
    });

  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get EMI schedule
export const getEmiSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    if (!paymentInfo.emiPlan || paymentInfo.emiPlan.emiPayments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No EMI plan found for this payment"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        emiPlan: paymentInfo.emiPlan,
        totalEmis: paymentInfo.emiPlan.totalEmis,
        emisPaid: paymentInfo.emiPlan.emisPaid,
        emisRemaining: paymentInfo.emiPlan.emisRemaining,
        nextPaymentDate: paymentInfo.nextPaymentDate
      }
    });

  } catch (error) {
    console.error("Error fetching EMI schedule:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get payment transactions
export const getPaymentTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    let transactions = paymentInfo.paymentTransactions;

    // Filter by status if provided
    if (status) {
      transactions = transactions.filter(txn => txn.status === status);
    }

    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        transactions: paginatedTransactions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(transactions.length / limit),
          totalTransactions: transactions.length,
          hasNextPage: endIndex < transactions.length,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error("Error fetching payment transactions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Calculate late fees
export const calculateLateFees = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    const totalLateFees = paymentInfo.calculateLateFees();
    await paymentInfo.save();

    res.status(200).json({
      success: true,
      data: {
        totalLateFees,
        lateFees: paymentInfo.lateFees,
        updatedPaymentInfo: paymentInfo
      }
    });

  } catch (error) {
    console.error("Error calculating late fees:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update payment settings
export const updatePaymentSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      autoDebit,
      paymentReminders,
      lateFees
    } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    // Update settings
    if (autoDebit !== undefined) {
      paymentInfo.autoDebit = { ...paymentInfo.autoDebit, ...autoDebit };
    }

    if (paymentReminders !== undefined) {
      paymentInfo.paymentReminders = { ...paymentInfo.paymentReminders, ...paymentReminders };
    }

    if (lateFees !== undefined) {
      paymentInfo.lateFees = { ...paymentInfo.lateFees, ...lateFees };
    }

    await paymentInfo.save();

    res.status(200).json({
      success: true,
      message: "Payment settings updated successfully",
      data: paymentInfo
    });

  } catch (error) {
    console.error("Error updating payment settings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get payment summary
export const getPaymentSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!validateObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const paymentInfo = await PaymentInformation.find({ userId, isActive: true })
      .populate('courseId', 'title');

    const summary = {
      totalPayments: paymentInfo.length,
      totalAmountDue: 0,
      totalAmountPaid: 0,
      overduePayments: 0,
      completedPayments: 0,
      upcomingPayments: 0,
      paymentBreakdown: {
        pending: 0,
        partial: 0,
        completed: 0,
        overdue: 0
      }
    };

    paymentInfo.forEach(payment => {
      summary.totalAmountDue += payment.totalAmountDue;
      summary.totalAmountPaid += payment.totalAmountPaid;
      summary.paymentBreakdown[payment.paymentStatus]++;

      if (payment.paymentStatus === 'completed') {
        summary.completedPayments++;
      } else if (payment.paymentStatus === 'overdue') {
        summary.overduePayments++;
      } else if (payment.nextPaymentDate && payment.nextPaymentDate > new Date()) {
        summary.upcomingPayments++;
      }
    });

    res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error("Error fetching payment summary:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get overdue payments
export const getOverduePayments = async (req, res) => {
  try {
    const overduePayments = await PaymentInformation.findOverduePayments()
      .populate('userId', 'name email phone')
      .populate('courseId', 'title');

    res.status(200).json({
      success: true,
      count: overduePayments.length,
      data: overduePayments
    });

  } catch (error) {
    console.error("Error fetching overdue payments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Delete payment information (soft delete)
export const deletePaymentInformation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information ID format"
      });
    }

    const paymentInfo = await PaymentInformation.findById(id);
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "Payment information not found"
      });
    }

    // Soft delete
    paymentInfo.isActive = false;
    await paymentInfo.save();

    res.status(200).json({
      success: true,
      message: "Payment information deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting payment information:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}; 