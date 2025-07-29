import mongoose from 'mongoose';


const advisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,

  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,

  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,

  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  
}, { timestamps: true });

const Advisor = mongoose.model('Advisor', advisorSchema);


export default Advisor;