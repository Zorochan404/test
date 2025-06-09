import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minLength: 10,
    maxLength: 15,
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
    minLength: 2,
    maxLength: 50,
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
 
  
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
