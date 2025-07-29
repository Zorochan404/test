import mongoose from 'mongoose';


const ApplicantsSchema = new mongoose.Schema({

    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: [true, 'Applicant email is required'],
      trim: true,
      minLength: 2,
    },
    phone: {
      type: String,
      required: [true, 'Applicant phone is required'],
      trim: true,
      minLength: 2,
    },

    resumeUrl: {
      type: String,
      required: [true, 'Resume URL is required'],
      trim: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      minLength: 2,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending',
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  });
  


const careerPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,

  },
  place: {
    type: String,
    required: [true, 'Place is required'],
    trim: true,

  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,

  },
  requirements: {
    type: [String],
    required: [true, 'Requirements are required'],
    trim: true,
  },
  partTime: {
    type: Boolean,
    required: [true, 'Part Time is required'],
  },
  
  isActive: {
    type: Boolean,
    required: [true, 'Is Active is required'],
  },
  applicants: {
    type: [ApplicantsSchema],
    default: [],
  },
  
  
}, { timestamps: true });

const CareerPost = mongoose.model('CareerPost', careerPostSchema);


export default CareerPost;