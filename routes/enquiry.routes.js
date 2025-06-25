import express from 'express';
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiryStatus,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryStats,
  getEnquiriesByStatus,
  searchEnquiries,
} from '../controllers/enquiryController.js';

const router = express.Router();

// GET /api/enquiries - Get all enquiries
router.get('/', getEnquiries);

// GET /api/enquiries/stats - Get enquiry statistics
router.get('/stats', getEnquiryStats);

// GET /api/enquiries/search - Search enquiries
router.get('/search', searchEnquiries);

// GET /api/enquiries/status/:status - Get enquiries by status
router.get('/status/:status', getEnquiriesByStatus);

// POST /api/enquiries - Create new enquiry
router.post('/', createEnquiry);

// GET /api/enquiries/:id - Get enquiry by ID
router.get('/:id', getEnquiryById);

// PATCH /api/enquiries/:id/status - Update enquiry status
router.patch('/:id/status', updateEnquiryStatus);

// PUT /api/enquiries/:id - Update enquiry
router.put('/:id', updateEnquiry);

// DELETE /api/enquiries/:id - Delete enquiry
router.delete('/:id', deleteEnquiry);

export default router; 