import mongoose from 'mongoose';

const aboutUsHeroGallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  altText: {
    type: String,
    required: [true, 'Alt text is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
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
aboutUsHeroGallerySchema.index({ order: 1 });
aboutUsHeroGallerySchema.index({ isActive: 1 });

const AboutUsHeroGallery = mongoose.model('AboutUsHeroGallery', aboutUsHeroGallerySchema);

export default AboutUsHeroGallery;
