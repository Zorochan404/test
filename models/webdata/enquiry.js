import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  city: {
    type: String,
    trim: true,
  },
  course: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled', 'not-interested'],
    default: 'new',
  },
  message: {
    type: String,
    trim: true,
    default: '',
  },
  source: {
    type: String,
    trim: true,
    default: '',
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

// Indexes for efficient querying
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ email: 1 });
enquirySchema.index({ phoneNumber: 1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry; 