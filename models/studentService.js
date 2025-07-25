import mongoose from 'mongoose';

const studentServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,

  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,

  },
  icon: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: 0,
  },
  
}, { timestamps: true });

// Index for efficient ordering
studentServiceSchema.index({ order: 1 });

const StudentService = mongoose.model('StudentService', studentServiceSchema);

export default StudentService;
