import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minLength: 10,
    maxLength: 1000,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
    trim: true,
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true,
    minLength: 1,
    maxLength: 255,
  },
  fileSize: {
    type: String,
    required: [true, 'File size is required'],
    trim: true,
  },
  uploadDate: {
    type: String,
    required: [true, 'Upload date is required'],
    trim: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Upload date must be in YYYY-MM-DD format'],
  },
  downloadCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  
}, { timestamps: true });

// Index for efficient querying
downloadSchema.index({ category: 1 });
downloadSchema.index({ isActive: 1 });
downloadSchema.index({ uploadDate: -1 });
downloadSchema.index({ downloadCount: -1 });

const Download = mongoose.model('Download', downloadSchema);

export default Download;
