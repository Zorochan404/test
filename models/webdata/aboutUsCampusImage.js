import mongoose from 'mongoose';

const aboutUsCampusImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  altText: {
    type: String,
    required: [true, 'Alt text is required'],
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
aboutUsCampusImageSchema.index({ order: 1 });
aboutUsCampusImageSchema.index({ isActive: 1 });

const AboutUsCampusImage = mongoose.model('AboutUsCampusImage', aboutUsCampusImageSchema);

export default AboutUsCampusImage;
