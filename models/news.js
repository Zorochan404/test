import mongoose from 'mongoose';


const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,

  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    trim: true,

  },
  subType: {
    type: String,
    required: [true, 'SubType is required'],
    trim: true,

  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,

  },
  pointdetails: {
    type: [String],
    required: [true, 'PointDetails is required'],
    trim: true,

  },
  
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    trim: true,
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Tags are required'],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  
  
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);


export default News;