import mongoose from 'mongoose';

const aboutUsStatisticSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Number is required'],
    trim: true,
    maxLength: 20,
  },
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
    minLength: 5,
    maxLength: 500,
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
aboutUsStatisticSchema.index({ order: 1 });
aboutUsStatisticSchema.index({ isActive: 1 });

const AboutUsStatistic = mongoose.model('AboutUsStatistic', aboutUsStatisticSchema);

export default AboutUsStatistic;
