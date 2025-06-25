import express from "express";
import {
  createPaymentInformation,
  getPaymentInformationById,
  getPaymentInformationByUser,
  recordPayment,
  applyCoupon,
  getEmiSchedule,
  getPaymentTransactions,
  calculateLateFees,
  updatePaymentSettings,
  getPaymentSummary,
  getOverduePayments,
  deletePaymentInformation
} from "../controllers/paymentInformationController.js";

const router = express.Router();

// Create new payment information
router.post("/", createPaymentInformation);

// Get payment information by ID
router.get("/:id", getPaymentInformationById);

// Get payment information by user ID
router.get("/user/:userId", getPaymentInformationByUser);

// Record a payment transaction
router.post("/:id/payment", recordPayment);

// Apply coupon to payment
router.post("/:id/coupon", applyCoupon);

// Get EMI schedule
router.get("/:id/emi-schedule", getEmiSchedule);

// Get payment transactions
router.get("/:id/transactions", getPaymentTransactions);

// Calculate late fees
router.post("/:id/calculate-late-fees", calculateLateFees);

// Update payment settings
router.put("/:id/settings", updatePaymentSettings);

// Get payment summary for user
router.get("/user/:userId/summary", getPaymentSummary);

// Get overdue payments (admin endpoint)
router.get("/overdue/all", getOverduePayments);

// Delete payment information (soft delete)
router.delete("/:id", deletePaymentInformation);

export default router; 