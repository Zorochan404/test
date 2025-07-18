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

  },
  description: {
    type: String,
    trim: true,

  },
  content: {
    type: String,
    trim: true,
    
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
