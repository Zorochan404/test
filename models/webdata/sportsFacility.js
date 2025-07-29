import mongoose from 'mongoose';

const sportsFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,

  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  
}, { timestamps: true });

// Index for efficient querying
sportsFacilitySchema.index({ category: 1 });

const SportsFacility = mongoose.model('SportsFacility', sportsFacilitySchema);

export default SportsFacility;
