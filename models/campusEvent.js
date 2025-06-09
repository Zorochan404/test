import mongoose from 'mongoose';

const campusEventSchema = new mongoose.Schema({
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
    minLength: 2,
    maxLength: 1000,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['arts-culture', 'sports-recreation', 'organizations'],
    trim: true,
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
campusEventSchema.index({ category: 1, order: 1 });
campusEventSchema.index({ order: 1 });

const CampusEvent = mongoose.model('CampusEvent', campusEventSchema);

export default CampusEvent;
