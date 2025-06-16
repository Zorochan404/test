import mongoose from 'mongoose';

// Sub-schemas for nested objects
const courseProgramSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Program title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  duration: {
    type: String,
    required: [true, 'Program duration is required'],
    trim: true,
    maxLength: 100,
  },
  description: {
    type: String,
    required: [true, 'Program description is required'],
    trim: true,
    minLength: 10,
    maxLength: 1000,
  },
  imageUrl: {
    type: String,
    required: [true, 'Program image URL is required'],
    trim: true,
  },
  detailsUrl: {
    type: String,
    required: [true, 'Program details URL is required'],
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Program order is required'],
    min: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const courseFeatureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Feature title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  description: {
    type: String,
    required: [true, 'Feature description is required'],
    trim: true,
    minLength: 10,
    maxLength: 1000,
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    required: [true, 'Feature order is required'],
    min: 1,
  },
});

const courseTestimonialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  studentImage: {
    type: String,
    trim: true,
    default: '',
  },
  testimonialText: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true,
    minLength: 10,
    maxLength: 2000,
  },
  youtubeUrl: {
    type: String,
    trim: true,
    default: '',
  },
  course: {
    type: String,
    trim: true,
    default: '',
  },
  batch: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    required: [true, 'Testimonial order is required'],
    min: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const courseFAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'FAQ question is required'],
    trim: true,
    minLength: 5,
    maxLength: 500,
  },
  answer: {
    type: String,
    required: [true, 'FAQ answer is required'],
    trim: true,
    minLength: 10,
    maxLength: 2000,
  },
  order: {
    type: Number,
    required: [true, 'FAQ order is required'],
    min: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const courseCurriculumSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Curriculum year is required'],
    trim: true,
    maxLength: 50,
  },
  semester: {
    type: String,
    required: [true, 'Curriculum semester is required'],
    trim: true,
    maxLength: 50,
  },
  subjects: [{
    type: String,
    required: true,
    trim: true,
    maxLength: 200,
  }],
  description: {
    type: String,
    trim: true,
    maxLength: 1000,
    default: '',
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    required: [true, 'Curriculum order is required'],
    min: 1,
  },
});

const courseSoftwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Software name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  logoUrl: {
    type: String,
    required: [true, 'Software logo URL is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 500,
    default: '',
  },
  order: {
    type: Number,
    required: [true, 'Software order is required'],
    min: 1,
  },
});

const courseCareerProspectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Career prospect title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  roles: [{
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  }],
  description: {
    type: String,
    trim: true,
    maxLength: 1000,
    default: '',
  },
  order: {
    type: Number,
    required: [true, 'Career prospect order is required'],
    min: 1,
  },
});

// Main Course Schema
const courseSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Course slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength: 100,
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
    minLength: 10,
    maxLength: 2000,
  },
  heroImage: {
    type: String,
    required: [true, 'Hero image is required'],
    trim: true,
  },
  programs: [courseProgramSchema],
  features: [courseFeatureSchema],
  testimonials: [courseTestimonialSchema],
  faqs: [courseFAQSchema],
  curriculum: [courseCurriculumSchema],
  software: [courseSoftwareSchema],
  careerProspects: [courseCareerProspectSchema],
  ctaTitle: {
    type: String,
    required: [true, 'CTA title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  ctaDescription: {
    type: String,
    required: [true, 'CTA description is required'],
    trim: true,
    minLength: 10,
    maxLength: 500,
  },
  brochurePdfUrl: {
    type: String,
    trim: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  metaTitle: {
    type: String,
    trim: true,
    maxLength: 60,
    default: '',
  },
  metaDescription: {
    type: String,
    trim: true,
    maxLength: 160,
    default: '',
  },
  metaKeywords: {
    type: String,
    trim: true,
    maxLength: 255,
    default: '',
  },
}, { timestamps: true });

// Indexes for efficient querying
courseSchema.index({ slug: 1 });
courseSchema.index({ isActive: 1 });
courseSchema.index({ title: 1 });

const Course = mongoose.model('Course', courseSchema);

export default Course;
