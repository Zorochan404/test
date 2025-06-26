import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Section ID is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Section title is required'],
    trim: true,
    minLength: 2,
  },
 
  content: {
    type: String,
    required: [true, 'Section content is required'],
    trim: true,
    minLength: 10,
  },
  image: {
    type: String,
    trim: true,
  },
  quote: {
    type: String,
    trim: true,
  },
  quoteAuthor: {
    type: String,
    trim: true,
  },
  highlights: [{
    type: String,
    trim: true,
  }],
  highlightTitle: {
    type: String,
    trim: true,
  },
});

const RelatedPostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Related post ID is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Related post title is required'],
    trim: true,
    minLength: 2,
  },
  image: {
    type: String,
    required: [true, 'Related post image is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Related post category is required'],
    trim: true,
    minLength: 2,
  },
});

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    minLength: 2,
  },
  image: {
    type: String,
    required: [true, 'Author image is required'],
    trim: true,
  },
});

const BlogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: 5,
  },
   metatitle: {
    type: String,
    required: [true, 'meta title is required'],
    minLength: 2,
  },
  metadescription: {
    type: String,
    required: [true, 'meta description is required'],
    minLength: 2,
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    minLength: 10,
  },
  heroImage: {
    type: String,
    required: [true, 'Hero image is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    minLength: 2,
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true,
  },
  readTime: {
    type: String,
    required: [true, 'Read time is required'],
    trim: true,
  },
  author: {
    type: AuthorSchema,
    required: [true, 'Author is required'],
  },
  sections: {
    type: [SectionSchema],
    required: [true, 'Sections are required'],
    validate: {
      validator: function(sections) {
        return sections && sections.length > 0;
      },
      message: 'At least one section is required'
    }
  },
  relatedPosts: {
    type: [RelatedPostSchema],
    default: [],
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    required: [true, 'Status is required'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isDraft: {
    type: Boolean,
    default: true,
  },
  publishedAt: {
    type: Date,
  },
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
  canonicalUrl: {
    type: String,
    trim: true,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

// Pre-save middleware to update isPublished and isDraft based on status
BlogSchema.pre('save', function(next) {
  if (this.status === 'published') {
    this.isPublished = true;
    this.isDraft = false;
    if (!this.publishedAt) {
      this.publishedAt = new Date();
    }
  } else if (this.status === 'draft') {
    this.isPublished = false;
    this.isDraft = true;
    this.publishedAt = undefined;
  } else if (this.status === 'archived') {
    this.isPublished = false;
    this.isDraft = false;
  }
  next();
});

// Pre-update middleware for findOneAndUpdate operations
BlogSchema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function(next) {
  const update = this.getUpdate();

  if (update.status === 'published') {
    update.isPublished = true;
    update.isDraft = false;
    if (!update.publishedAt) {
      update.publishedAt = new Date();
    }
  } else if (update.status === 'draft') {
    update.isPublished = false;
    update.isDraft = true;
    update.publishedAt = undefined;
  } else if (update.status === 'archived') {
    update.isPublished = false;
    update.isDraft = false;
  }

  next();
});

// Indexes for efficient querying
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ isDraft: 1 });
BlogSchema.index({ publishedAt: -1 });
BlogSchema.index({ createdAt: -1 });

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;