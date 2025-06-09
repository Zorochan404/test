import mongoose from 'mongoose';

const lifeAtInframeSectionSchema = new mongoose.Schema({
  sectionType: {
    type: String,
    required: [true, 'Section type is required'],
    enum: ['hero', 'welcome', 'services', 'clubs', 'sports', 'events', 'gallery', 'tour'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 1000,
  },
  content: {
    type: String,
    trim: true,
    maxLength: 5000,
  },
  images: [{
    type: String,
    trim: true,
  }],
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  
}, { timestamps: true });

// Index for efficient querying
lifeAtInframeSectionSchema.index({ sectionType: 1, order: 1 });
lifeAtInframeSectionSchema.index({ isActive: 1 });

const LifeAtInframeSection = mongoose.model('LifeAtInframeSection', lifeAtInframeSectionSchema);

export default LifeAtInframeSection;
