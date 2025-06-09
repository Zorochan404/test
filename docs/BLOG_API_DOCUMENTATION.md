# Blog Posts API Documentation

## Overview

The Blog Posts API provides comprehensive CRUD operations for managing blog content with rich sections, author information, related posts, and advanced features like view tracking and publish status management.

## Base URL: `/api/v1/blog`

## Database Schema

### Blog Model (`models/blog.js`)

```javascript
{
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 300
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 500
  },
  heroImage: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    required: true
  },
  author: {
    name: String (required),
    image: String (required)
  },
  sections: [{
    id: String (required),
    title: String (required),
    content: String (required),
    image: String,
    quote: String,
    quoteAuthor: String,
    highlights: [String],
    highlightTitle: String
  }],
  relatedPosts: [{
    id: String (required),
    title: String (required),
    image: String (required),
    category: String (required)
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  timestamps: true (createdAt, updatedAt)
}
```

## API Endpoints

### 1. Create Blog Post
- **POST** `/addblog`
- **Description**: Creates a new blog post
- **Request Body**:
```json
{
  "slug": "top-5-reasons-to-choose-inframe-school",
  "title": "Top 5 Reasons to Choose Inframe School for Your Child's Education",
  "excerpt": "Discover why Inframe School stands out as one of the best design schools in India.",
  "heroImage": "https://example.com/hero-image.jpg",
  "category": "Education",
  "date": "February 28, 2025",
  "readTime": "5 min read",
  "author": {
    "name": "Inframe School Team",
    "image": "https://example.com/author-image.jpg"
  },
  "sections": [
    {
      "id": "intro",
      "title": "Introduction",
      "content": "Blog section content here...",
      "image": "https://example.com/section-image.jpg",
      "quote": "Creativity is intelligence having fun.",
      "quoteAuthor": "Albert Einstein",
      "highlights": ["Point 1", "Point 2"],
      "highlightTitle": "Key Highlights"
    }
  ],
  "relatedPosts": [
    {
      "id": "related-post-1",
      "title": "Related Post Title",
      "image": "https://example.com/related-image.jpg",
      "category": "Education"
    }
  ]
}
```

### 2. Get Published Blog Posts
- **GET** `/getblogs`
- **Description**: Retrieves all published blog posts (sorted by creation date, newest first)

### 3. Get All Blog Posts (Admin)
- **GET** `/getallblogs`
- **Description**: Retrieves all blog posts including unpublished ones (admin use)

### 4. Get Published Blog Posts
- **GET** `/getpublishedblogs`
- **Description**: Retrieves only published blog posts

### 5. Get Popular Blog Posts
- **GET** `/getpopularblogs`
- **Description**: Retrieves top 10 most viewed blog posts

### 6. Get Blog Post by ID
- **GET** `/getblogbyid/:id`
- **Description**: Retrieves a specific blog post by MongoDB ObjectId

### 7. Get Blog Post by Slug
- **GET** `/getblogbyslug/:slug`
- **Description**: Retrieves a specific blog post by slug (increments view count)
- **Example**: `/getblogbyslug/top-5-reasons-to-choose-inframe-school`

### 8. Get Blog Posts by Category
- **GET** `/getblogsbycategory/:category`
- **Description**: Retrieves all published blog posts in a specific category
- **Example**: `/getblogsbycategory/Education`

### 9. Update Blog Post
- **PUT** `/updateblog/:id`
- **Description**: Updates a blog post
- **Request Body**: Any fields to update

### 10. Toggle Publish Status
- **PUT** `/toggleblogpublishstatus/:id`
- **Description**: Toggles the publish status of a blog post

### 11. Delete Blog Post
- **DELETE** `/deleteblog/:id`
- **Description**: Removes a blog post

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "_id": "blog_id",
    "slug": "top-5-reasons-to-choose-inframe-school",
    "title": "Top 5 Reasons to Choose Inframe School for Your Child's Education",
    "excerpt": "Discover why Inframe School stands out...",
    "heroImage": "https://example.com/hero-image.jpg",
    "category": "Education",
    "date": "February 28, 2025",
    "readTime": "5 min read",
    "author": {
      "name": "Inframe School Team",
      "image": "https://example.com/author-image.jpg"
    },
    "sections": [...],
    "relatedPosts": [...],
    "isPublished": true,
    "views": 42,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Blog not found"
}
```

## Usage Examples

### Frontend Blog List Page
```javascript
// Get all published blogs for list view
const response = await fetch('/api/v1/blog/getblogs');
const data = await response.json();

if (data.success) {
  data.data.forEach(blog => {
    console.log(`${blog.title} - ${blog.category} - ${blog.readTime}`);
  });
}
```

### Frontend Blog Detail Page
```javascript
// Get blog by slug for detail view
const slug = 'top-5-reasons-to-choose-inframe-school';
const response = await fetch(`/api/v1/blog/getblogbyslug/${slug}`);
const data = await response.json();

if (data.success) {
  const blog = data.data;
  console.log(`
    Title: ${blog.title}
    Author: ${blog.author.name}
    Category: ${blog.category}
    Views: ${blog.views}
    Sections: ${blog.sections.length}
  `);
}
```

### Admin Dashboard
```javascript
// Get all blogs including unpublished
const response = await fetch('/api/v1/blog/getallblogs');
const data = await response.json();

// Toggle publish status
const togglePublish = async (blogId) => {
  const response = await fetch(`/api/v1/blog/toggleblogpublishstatus/${blogId}`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};
```

### Using curl

```bash
# Get all published blogs
curl http://localhost:5500/api/v1/blog/getblogs

# Get blog by slug
curl http://localhost:5500/api/v1/blog/getblogbyslug/top-5-reasons-to-choose-inframe-school

# Get blogs by category
curl http://localhost:5500/api/v1/blog/getblogsbycategory/Education

# Create new blog post
curl -X POST http://localhost:5500/api/v1/blog/addblog \
  -H "Content-Type: application/json" \
  -d @blog-data.json
```

## Features

### ✅ Rich Content Structure
- Multiple sections with individual content, images, quotes
- Highlight lists with custom titles
- Author information with images
- Related posts linking

### ✅ SEO Friendly
- Unique slug-based URLs
- Meta information (excerpt, read time)
- Category organization

### ✅ Analytics
- View count tracking
- Popular posts endpoint

### ✅ Content Management
- Publish/unpublish functionality
- Draft management
- Category filtering

### ✅ Performance
- Database indexing for efficient queries
- Sorted results by relevance

## Setup and Testing

### 1. Start Server
```bash
npm run dev
```

### 2. Seed Sample Data
```bash
node scripts/seedBlogData.js
```

### 3. Test Endpoints
Use the curl examples above or tools like Postman to test the API endpoints.

## File Structure

```
models/
└── blog.js                    # Enhanced blog schema

controllers/
└── blogcontroller.js          # Enhanced blog operations

routes/
└── blog.routes.js             # Enhanced blog routes

scripts/
└── seedBlogData.js            # Sample blog data

docs/
└── BLOG_API_DOCUMENTATION.md  # This documentation
```

## Validation Rules

- **Slug**: 3-200 characters, unique, lowercase, required
- **Title**: 5-300 characters, required
- **Excerpt**: 10-500 characters, required
- **Hero Image**: Required URL
- **Category**: 2-50 characters, required
- **Author**: Name and image required
- **Sections**: At least one section required
- **Section Content**: 10-10000 characters per section

## UI Integration

The API supports the standard blog structure:

1. **Blog List Page**: Use `/getblogs` to display blog cards with title, excerpt, category
2. **Blog Detail Page**: Use `/getblogbyslug/:slug` to show full blog content
3. **Category Pages**: Use `/getblogsbycategory/:category` for category filtering
4. **Popular Posts**: Use `/getpopularblogs` for trending content
5. **Admin Management**: Use admin endpoints for content management
