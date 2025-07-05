import mongoose from 'mongoose';


const mentorSchema = new mongoose.Schema({
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
  tags: {
    type: [String],
    required: [true, 'Tags are required'],
    trim: true,
  },
  
  
}, { timestamps: true });

const Mentor = mongoose.model('Mentor', mentorSchema);


export default Mentor;