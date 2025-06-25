import mongoose from 'mongoose';

// Sub-schemas for nested objects
const admissionStepSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    min: 1,
  },
  icon: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    min: 1,
  },
});

const curriculumSemesterSchema = new mongoose.Schema({
  semester: {
    type: String,
    trim: true,
  },
  subjects: [{
    type: String,
    trim: true,
  }],
  order: {
    type: Number,
    min: 1,
  },
});

const curriculumYearSchema = new mongoose.Schema({
  year: {
    type: String,
    trim: true,
  },
  semesters: [curriculumSemesterSchema],
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const softwareToolSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const careerPathSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  roles: [{
    type: String,
    trim: true,
  }],
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const industryPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const programHighlightSchema = new mongoose.Schema({
  icon: {
    type: String,
    trim: true, 
  },
  title: {
    type: String,
    trim: true,
    minLength: 2,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    min: 1,
  },
});

const courseGalleryImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    trim: true,
  },
  caption: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const courseTestimonialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
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
  },
  answer: {
    type: String,
    required: [true, 'FAQ answer is required'],
    trim: true,
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

const courseFeeBenefitSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    min: 1,
  },
});

const courseEligibilitySchema = new mongoose.Schema({
  requirement: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const courseScheduleSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
  },
  schedule: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

// Fee Structure Sub-schemas
const emiOptionSchema = new mongoose.Schema({
  months: {
    type: Number,
    required: [true, 'EMI months is required'],
    min: 1,
  },
  monthlyAmount: {
    type: Number,
    required: [true, 'Monthly amount is required'],
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0,
  },
  processingFee: {
    type: Number,
    min: 0,
    default: 0,
  },
  interestRate: {
    type: Number,
    min: 0,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    min: 1,
  },
});

const couponCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    trim: true,
    uppercase: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: [true, 'Discount type is required'],
  },
  discountValue: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: 0,
  },
  minimumAmount: {
    type: Number,
    min: 0,
    default: 0,
  },
  maximumDiscount: {
    type: Number,
    min: 0,
  },
  validFrom: {
    type: Date,
    required: [true, 'Valid from date is required'],
  },
  validUntil: {
    type: Date,
    required: [true, 'Valid until date is required'],
  },
  usageLimit: {
    type: Number,
    min: 1,
  },
  usedCount: {
    type: Number,
    min: 0,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    min: 1,
  },
});

const feeStructureSchema = new mongoose.Schema({
  totalFee: {
    type: Number,
    required: [true, 'Total fee is required'],
    min: 0,
  },
  monthlyFee: {
    type: Number,
    min: 0,
  },
  yearlyFee: {
    type: Number,
    min: 0,
  },
  processingFee: {
    type: Number,
    min: 0,
    default: 0,
  },
  registrationFee: {
    type: Number,
    min: 0,
    default: 0,
  },
  emiOptions: [emiOptionSchema],
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  couponCodes: [couponCodeSchema],
  paymentTerms: {
    type: String,
    trim: true,
    default: '',
  },
  refundPolicy: {
    type: String,
    trim: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    min: 1,
  },
});

// Updated Course Program Schema with all fields from TypeScript interfaces
const courseProgramSchema = new mongoose.Schema({
  // Basic Information
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    trim: true,
  },
  parentCourseSlug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  parentCourseTitle: {
    type: String,
    trim: true,
  },

  // Hero Section
  heroImage: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    default: '',
  },

  // Required by backend
  imageUrl: {
    type: String,
    trim: true,
  },
  detailsUrl: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    min: 1,
  },
  
  // Course Overview
  courseOverview: {
    type: String,
    trim: true,
    minLength: 10,
    maxLength: 2000,
  },
  
  // Admission Process
  admissionSteps: [admissionStepSchema],
  admissionQuote: {
    type: String,
    trim: true,
    default: '',
  },
  galleryImages: [courseGalleryImageSchema],
  
  // Program Highlights
  programHighlights: [programHighlightSchema],
  
  // Career Prospects
  careerPaths: [careerPathSchema],
  
  // Curriculum
  curriculum: [curriculumYearSchema],
  
  // Software & Tools
  softwareTools: [softwareToolSchema],
  
  // Industry Partners
  industryPartners: [industryPartnerSchema],
  
  // Testimonials
  testimonials: [courseTestimonialSchema],
  
  // FAQs
  faqs: [courseFAQSchema],
  
  // Fee & Benefits
  feeBenefits: [courseFeeBenefitSchema],
  
  // Fee Structure
  feeStructure: feeStructureSchema,
  
  // Eligibility
  eligibility: [courseEligibilitySchema],
  
  // Schedule Options
  scheduleOptions: [courseScheduleSchema],
  
  // CTA Section
  ctaTitle: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  ctaDescription: {
    type: String,
    trim: true,
    minLength: 10,
  },
  ctaButtonText: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  
  // Settings
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // SEO
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
  curriculum: [curriculumYearSchema],
  software: [softwareToolSchema],
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

// Pre-save middleware to generate slugs if not provided
courseSchema.pre('save', function(next) {
  // Generate slug for course if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Generate slugs for programs if not provided
  if (this.programs && this.programs.length > 0) {
    this.programs.forEach(program => {
      if (!program.slug && program.title) {
        program.slug = program.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      
      // Set parent course information
      if (this.slug) {
        program.parentCourseSlug = this.slug;
      }
      if (this.title) {
        program.parentCourseTitle = this.title;
      }
    });
  }
  
  next();
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
