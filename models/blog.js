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
  isPublished: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

// Indexes for efficient querying
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ createdAt: -1 });

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;