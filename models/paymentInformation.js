import mongoose from "mongoose";

// EMI Payment Schema
const emiPaymentSchema = new mongoose.Schema({
  emiNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  paidDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'partial'],
    default: 'pending',
  },
  lateFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash', 'cheque', 'bank_transfer', 'upi', 'card'],
  },
  transactionId: {
    type: String,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

// Payment Transaction Schema
const paymentTransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash', 'cheque', 'bank_transfer', 'upi', 'card'],
    required: true,
  },
  paymentGateway: {
    type: String,
    trim: true,
    default: '',
  },
  gatewayTransactionId: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded', 'cancelled'],
    default: 'pending',
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  receiptUrl: {
    type: String,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

// Coupon Usage Schema
const couponUsageSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  discountAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  originalValue: {
    type: Number,
    required: true,
    min: 0,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

// Main Payment Information Schema
const paymentInformationSchema = new mongoose.Schema({
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Course and Program References
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  programId: {
    type: String, // Program ID within the course
    required: true,
  },

  // Fee Structure Information
  totalFee: {
    type: Number,
    required: true,
    min: 0,
  },
  registrationFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  processingFee: {
    type: Number,
    default: 0,
    min: 0,
  },

  // Payment Status
  totalAmountPaid: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalAmountDue: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed', 'overdue', 'defaulted'],
    default: 'pending',
  },

  // EMI Information
  emiPlan: {
    totalEmis: {
      type: Number,
      default: 0,
      min: 0,
    },
    emiAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    emiFrequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly'],
      default: 'monthly',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    emiPayments: [emiPaymentSchema],
    emisPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
    emisRemaining: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  // Payment History
  paymentTransactions: [paymentTransactionSchema],

  // Coupon Information
  appliedCoupons: [couponUsageSchema],
  totalDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },

  // Payment Schedule
  nextPaymentDate: {
    type: Date,
  },
  lastPaymentDate: {
    type: Date,
  },

  // Late Payment Information
  lateFees: {
    totalLateFees: {
      type: Number,
      default: 0,
      min: 0,
    },
    lateFeeRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    gracePeriod: {
      type: Number,
      default: 5, // days
      min: 0,
    },
  },

  // Refund Information
  refunds: {
    totalRefunded: {
      type: Number,
      default: 0,
      min: 0,
    },
    refundReason: {
      type: String,
      trim: true,
      default: '',
    },
    refundDate: {
      type: Date,
    },
  },

  // Payment Settings
  autoDebit: {
    enabled: {
      type: Boolean,
      default: false,
    },
    bankAccount: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String,
    },
    upiId: {
      type: String,
      trim: true,
    },
  },

  // Status and Settings
  isActive: {
    type: Boolean,
    default: true,
  },
  paymentReminders: {
    enabled: {
      type: Boolean,
      default: true,
    },
    lastReminderSent: {
      type: Date,
    },
  },

  // Additional Information
  remarks: {
    type: String,
    trim: true,
    default: '',
  },
  documents: {
    feeReceipts: [String],
    emiAgreement: String,
    paymentProofs: [String],
  },
}, { timestamps: true });

// Indexes for efficient querying
paymentInformationSchema.index({ userId: 1 });
paymentInformationSchema.index({ courseId: 1 });
paymentInformationSchema.index({ paymentStatus: 1 });
paymentInformationSchema.index({ nextPaymentDate: 1 });
paymentInformationSchema.index({ 'emiPayments.dueDate': 1 });

// Pre-save middleware to calculate derived fields
paymentInformationSchema.pre('save', function(next) {
  // Calculate total amount due
  this.totalAmountDue = this.totalFee - this.totalAmountPaid + this.lateFees.totalLateFees - this.totalDiscount;
  
  // Calculate EMIs remaining
  if (this.emiPlan && this.emiPlan.totalEmis > 0) {
    this.emiPlan.emisRemaining = this.emiPlan.totalEmis - this.emiPlan.emisPaid;
  }
  
  // Update payment status based on amounts
  if (this.totalAmountDue <= 0) {
    this.paymentStatus = 'completed';
  } else if (this.totalAmountPaid > 0) {
    this.paymentStatus = 'partial';
  } else {
    this.paymentStatus = 'pending';
  }
  
  // Set next payment date if not set and EMIs are remaining
  if (!this.nextPaymentDate && this.emiPlan && this.emiPlan.emisRemaining > 0) {
    const lastPaidEmi = this.emiPlan.emiPayments
      .filter(emi => emi.status === 'paid')
      .sort((a, b) => b.emiNumber - a.emiNumber)[0];
    
    if (lastPaidEmi) {
      const nextEmi = this.emiPlan.emiPayments
        .filter(emi => emi.status === 'pending')
        .sort((a, b) => a.emiNumber - b.emiNumber)[0];
      
      if (nextEmi) {
        this.nextPaymentDate = nextEmi.dueDate;
      }
    }
  }
  
  next();
});

// Instance methods
paymentInformationSchema.methods.calculateLateFees = function() {
  const today = new Date();
  let totalLateFees = 0;
  
  this.emiPlan.emiPayments.forEach(emi => {
    if (emi.status === 'pending' && emi.dueDate < today) {
      const daysLate = Math.floor((today - emi.dueDate) / (1000 * 60 * 60 * 24));
      if (daysLate > this.lateFees.gracePeriod) {
        const lateFee = (emi.amount * this.lateFees.lateFeeRate * daysLate) / 100;
        emi.lateFee = lateFee;
        totalLateFees += lateFee;
      }
    }
  });
  
  this.lateFees.totalLateFees = totalLateFees;
  return totalLateFees;
};

paymentInformationSchema.methods.recordPayment = function(amount, method, transactionId, description = '') {
  const transaction = {
    transactionId: transactionId || `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount: amount,
    paymentMethod: method,
    status: 'success',
    description: description,
    remarks: `Payment recorded on ${new Date().toISOString()}`,
  };
  
  this.paymentTransactions.push(transaction);
  this.totalAmountPaid += amount;
  this.lastPaymentDate = new Date();
  
  // Update EMI payments if applicable
  if (this.emiPlan && this.emiPlan.emiPayments.length > 0) {
    let remainingAmount = amount;
    const pendingEmis = this.emiPlan.emiPayments
      .filter(emi => emi.status === 'pending')
      .sort((a, b) => a.emiNumber - b.emiNumber)[0];
    
    for (const emi of pendingEmis) {
      if (remainingAmount <= 0) break;
      
      const emiAmount = Math.min(remainingAmount, emi.amount);
      emi.paidAmount += emiAmount;
      remainingAmount -= emiAmount;
      
      if (emi.paidAmount >= emi.amount) {
        emi.status = 'paid';
        emi.paidDate = new Date();
        this.emiPlan.emisPaid += 1;
      } else if (emi.paidAmount > 0) {
        emi.status = 'partial';
      }
    }
  }
  
  return transaction;
};

paymentInformationSchema.methods.applyCoupon = function(couponCode, discountAmount, discountType, originalValue) {
  const couponUsage = {
    couponCode: couponCode.toUpperCase(),
    discountAmount: discountAmount,
    discountType: discountType,
    originalValue: originalValue,
    appliedAt: new Date(),
  };
  
  this.appliedCoupons.push(couponUsage);
  this.totalDiscount += discountAmount;
  
  return couponUsage;
};

// Static methods
paymentInformationSchema.statics.findByUserAndCourse = function(userId, courseId, programId) {
  return this.findOne({
    userId: userId,
    courseId: courseId,
    programId: programId,
    isActive: true
  });
};

paymentInformationSchema.statics.findOverduePayments = function() {
  const today = new Date();
  return this.find({
    'emiPayments.dueDate': { $lt: today },
    'emiPayments.status': 'pending',
    isActive: true
  });
};

const PaymentInformation = mongoose.model("PaymentInformation", paymentInformationSchema);
export default PaymentInformation; 