import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,

  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,

  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,

  },
 
  
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
