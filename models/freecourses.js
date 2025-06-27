import mongoose from 'mongoose';

// Sub-schemas for nested objects
const detailsSchema = new mongoose.Schema({
  duration: {
    type: Number,
    min: 1,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
 
});


const freecoursesSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
 
  details: [detailsSchema],
 
  whyLearnThisCourse: {
    type: String,
    required: true,
  },
  
  // Program Highlights
  whatYouWillLearn:[ {
    type: String,
    required: true,
  }],
  
  // Career Prospects
  careerOpportunities:{
    type: String,
    required: true,
  },
  
  // Curriculum
  courseBenefits:[ {
    type: String,
    required: true,
  }],

  imageUrl: {
    type: String,
    required: true,
  },
  
 
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // SEO
  metaTitle: {
    type: String,
    trim: true,
 
    default: '',
  },
  metaDescription: {
    type: String,
    trim: true,

    default: '',
  },
  metaKeywords: {
    type: String,
    trim: true,

    default: '',
  },
}, { timestamps: true });


const FreeCourses = mongoose.model('FreeCourses', freecoursesSchema);

export default FreeCourses;
