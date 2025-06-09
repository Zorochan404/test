import mongoose from 'mongoose';

const sportsFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 1000,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    maxLength: 50,
  },
  
}, { timestamps: true });

// Index for efficient querying
sportsFacilitySchema.index({ category: 1 });

const SportsFacility = mongoose.model('SportsFacility', sportsFacilitySchema);

export default SportsFacility;
