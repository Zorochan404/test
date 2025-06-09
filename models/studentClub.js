import mongoose from 'mongoose';

const studentClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['arts', 'sports', 'academic', 'cultural'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minLength: 2,
    maxLength: 1000,
  },
  image: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: 0,
  },
  
}, { timestamps: true });

// Index for efficient querying
studentClubSchema.index({ category: 1, order: 1 });
studentClubSchema.index({ order: 1 });

const StudentClub = mongoose.model('StudentClub', studentClubSchema);

export default StudentClub;
