import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,

  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,

  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: 0,
  },
  
}, { timestamps: true });

// Index for efficient querying
galleryImageSchema.index({ category: 1, order: 1 });
galleryImageSchema.index({ order: 1 });

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

export default GalleryImage;
