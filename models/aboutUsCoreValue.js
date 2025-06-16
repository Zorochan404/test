import mongoose from 'mongoose';

const aboutUsCoreValueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minLength: 10,
    maxLength: 1000,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  
}, { timestamps: true });

// Index for efficient querying
aboutUsCoreValueSchema.index({ order: 1 });
aboutUsCoreValueSchema.index({ isActive: 1 });

const AboutUsCoreValue = mongoose.model('AboutUsCoreValue', aboutUsCoreValueSchema);

export default AboutUsCoreValue;
