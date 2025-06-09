import mongoose from 'mongoose';


const SectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  image: String,
  quote: String,
  quoteAuthor: String,
  highlights: [String],
  highlightTitle: String,
});

const RelatedPostSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  category: String,
});

const AuthorSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // e.g., "top-5-reasons-to-choose-inframe-school"
  title: String,
  excerpt: String,
  heroImage: String,
  category: String,
  date: String, // You may use Date type if you want to store as Date
  readTime: String,
  author: AuthorSchema,
  sections: [SectionSchema],
  relatedPosts: [RelatedPostSchema],
});

const Blog = mongoose.model('Blog', BlogSchema);


export default Blog;