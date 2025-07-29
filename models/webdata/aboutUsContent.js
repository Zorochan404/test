import mongoose from 'mongoose';

const aboutUsContentSchema = new mongoose.Schema({
  sectionType: {
    type: String,
    required: [true, 'Section type is required'],
    enum: ['who-we-are', 'about-us', 'vision', 'mission', 'core-values-text'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,

  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,

  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
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
aboutUsContentSchema.index({ sectionType: 1 });
aboutUsContentSchema.index({ order: 1 });
aboutUsContentSchema.index({ isActive: 1 });

// Create unique index for section type to ensure only one active content per section type
aboutUsContentSchema.index({ sectionType: 1 }, { unique: true });

const AboutUsContent = mongoose.model('AboutUsContent', aboutUsContentSchema);

export default AboutUsContent;
