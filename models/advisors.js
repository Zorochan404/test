import mongoose from 'mongoose';


const advisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    minLength: 2, 
    maxLength: 100,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minLength: 2, 
    maxLength: 2000,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  
}, { timestamps: true });

const Advisor = mongoose.model('Advisor', advisorSchema);


export default Advisor;