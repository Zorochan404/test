// Test script for Blog Posts API
// This script provides examples for testing all blog endpoints

const BASE_URL = 'http://localhost:5500/api/v1/blog';

console.log('Blog Posts API Test Guide');
console.log('========================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed sample data:');
console.log('   node scripts/seedBlogData.js\n');

console.log('🧪 Test the following endpoints:\n');

// Basic CRUD Operations
console.log('📝 BASIC CRUD OPERATIONS');
console.log('========================');

console.log('GET All Published Blogs:');
console.log(`   curl ${BASE_URL}/getblogs\n`);

console.log('GET All Blogs (Admin):');
console.log(`   curl ${BASE_URL}/getallblogs\n`);

console.log('GET Published Blogs:');
console.log(`   curl ${BASE_URL}/getpublishedblogs\n`);

console.log('GET Popular Blogs:');
console.log(`   curl ${BASE_URL}/getpopularblogs\n`);

console.log('GET Draft Blogs:');
console.log(`   curl ${BASE_URL}/getdraftblogs\n`);

console.log('GET Blogs by Status:');
console.log(`   curl ${BASE_URL}/getblogsbystatus/draft\n`);

console.log('GET Blog by ID:');
console.log(`   curl ${BASE_URL}/getblogbyid/BLOG_ID\n`);

console.log('GET Blog by Slug (increments views):');
console.log(`   curl ${BASE_URL}/getblogbyslug/top-5-reasons-to-choose-inframe-school\n`);

console.log('GET Blogs by Category:');
console.log(`   curl ${BASE_URL}/getblogsbycategory/Education\n`);

console.log('PUT Update Blog:');
console.log(`   curl -X PUT ${BASE_URL}/updateblog/BLOG_ID \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Updated Blog Title"}\'\n');

console.log('PUT Publish Blog:');
console.log(`   curl -X PUT ${BASE_URL}/publishblog/BLOG_ID\n`);

console.log('PUT Save as Draft:');
console.log(`   curl -X PUT ${BASE_URL}/saveblogasdraft/BLOG_ID\n`);

console.log('PUT Archive Blog:');
console.log(`   curl -X PUT ${BASE_URL}/archiveblog/BLOG_ID\n`);

console.log('PUT Toggle Publish Status:');
console.log(`   curl -X PUT ${BASE_URL}/toggleblogpublishstatus/BLOG_ID\n`);

console.log('DELETE Blog:');
console.log(`   curl -X DELETE ${BASE_URL}/deleteblog/BLOG_ID\n`);

// Create Blog Post
console.log('POST Create Blog Post:');
console.log(`   curl -X POST ${BASE_URL}/addblog \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "slug": "test-blog-post",\n');
console.log('       "title": "Test Blog Post",\n');
console.log('       "excerpt": "This is a test blog post excerpt.",\n');
console.log('       "heroImage": "https://example.com/hero.jpg",\n');
console.log('       "category": "Test",\n');
console.log('       "date": "March 1, 2025",\n');
console.log('       "readTime": "3 min read",\n');
console.log('       "author": {\n');
console.log('         "name": "Test Author",\n');
console.log('         "image": "https://example.com/author.jpg"\n');
console.log('       },\n');
console.log('       "sections": [\n');
console.log('         {\n');
console.log('           "id": "intro",\n');
console.log('           "title": "Introduction",\n');
console.log('           "content": "This is the introduction content."\n');
console.log('         }\n');
console.log('       ],\n');
console.log('       "metaTitle": "Test Blog Post | Inframe School",\n');
console.log('       "metaDescription": "This is a test blog post for demonstration purposes.",\n');
console.log('       "metaKeywords": "test, blog, demo, inframe school",\n');
console.log('       "canonicalUrl": "https://inframeschool.com/blog/test-blog-post"\n');
console.log('     }\'\n');

// Frontend Integration Examples
console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('Blog List Page:');
console.log(`
// Get all published blogs for list view
fetch('${BASE_URL}/getblogs')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(blog => {
        console.log(\`\${blog.title} - \${blog.category} - \${blog.readTime}\`);
      });
    }
  });
`);

console.log('Blog Detail Page:');
console.log(`
// Get blog by slug for detail view (increments view count)
const slug = 'top-5-reasons-to-choose-inframe-school';
fetch(\`${BASE_URL}/getblogbyslug/\${slug}\`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const blog = data.data;
      console.log(\`
        Title: \${blog.title}
        Author: \${blog.author.name}
        Category: \${blog.category}
        Views: \${blog.views}
        Sections: \${blog.sections.length}
        Related Posts: \${blog.relatedPosts.length}
      \`);
      
      // Display sections
      blog.sections.forEach(section => {
        console.log(\`Section: \${section.title}\`);
        if (section.quote) {
          console.log(\`Quote: "\${section.quote}" - \${section.quoteAuthor}\`);
        }
        if (section.highlights && section.highlights.length > 0) {
          console.log(\`Highlights: \${section.highlights.join(', ')}\`);
        }
      });
    }
  });
`);

console.log('Category Filtering:');
console.log(`
// Get blogs by category
const category = 'Education';
fetch(\`${BASE_URL}/getblogsbycategory/\${category}\`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(\`Found \${data.data.length} blogs in \${category} category\`);
    }
  });
`);

console.log('Popular Posts Widget:');
console.log(`
// Get popular posts for sidebar/widget
fetch('${BASE_URL}/getpopularblogs')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Popular Posts:');
      data.data.forEach((blog, index) => {
        console.log(\`\${index + 1}. \${blog.title} (\${blog.views} views)\`);
      });
    }
  });
`);

console.log('Admin Dashboard:');
console.log(`
// Admin: Get all blogs including drafts
fetch('${BASE_URL}/getallblogs')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(blog => {
        console.log(\`\${blog.title} - Status: \${blog.status} - Published: \${blog.isPublished}\`);
      });
    }
  });

// Admin: Get only draft blogs
fetch('${BASE_URL}/getdraftblogs')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(\`Found \${data.data.length} draft blogs\`);
    }
  });

// Admin: Get blogs by status
const getBlogsByStatus = async (status) => {
  const response = await fetch(\`${BASE_URL}/getblogsbystatus/\${status}\`);
  const data = await response.json();
  return data.success ? data.data : [];
};

// Admin: Publish a draft blog
const publishBlog = async (blogId) => {
  const response = await fetch(\`${BASE_URL}/publishblog/\${blogId}\`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};

// Admin: Save blog as draft
const saveDraft = async (blogId) => {
  const response = await fetch(\`${BASE_URL}/saveblogasdraft/\${blogId}\`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};

// Admin: Toggle publish status
const togglePublish = async (blogId) => {
  const response = await fetch(\`${BASE_URL}/toggleblogpublishstatus/\${blogId}\`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};
`);

// Sample Data Structure
console.log('📋 SAMPLE DATA STRUCTURE');
console.log('========================');

console.log('Complete Blog Post Structure:');
console.log(JSON.stringify({
  slug: "sample-blog-post",
  title: "Sample Blog Post Title",
  excerpt: "This is a sample excerpt that describes the blog post content.",
  heroImage: "https://example.com/hero-image.jpg",
  category: "Education",
  date: "March 1, 2025",
  readTime: "5 min read",
  author: {
    name: "Author Name",
    image: "https://example.com/author-image.jpg"
  },
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: "This is the introduction section content...",
      image: "https://example.com/section-image.jpg",
      quote: "Inspiring quote here",
      quoteAuthor: "Famous Person",
      highlights: [
        "Key point 1",
        "Key point 2",
        "Key point 3"
      ],
      highlightTitle: "Key Takeaways"
    }
  ],
  relatedPosts: [
    {
      id: "related-post-1",
      title: "Related Post Title",
      image: "https://example.com/related-image.jpg",
      category: "Education"
    }
  ],
  metaTitle: "Sample Blog Post Title | Inframe School",
  metaDescription: "This is a sample meta description for SEO purposes, describing the blog post content.",
  metaKeywords: "sample, blog, SEO, meta tags, inframe school",
  canonicalUrl: "https://inframeschool.com/blog/sample-blog-post"
}, null, 2));

// Expected Responses
console.log('\n🎯 EXPECTED RESPONSE FORMATS');
console.log('============================');

console.log('Success Response (Single Blog):');
console.log(JSON.stringify({
  success: true,
  data: {
    _id: "blog_id",
    slug: "top-5-reasons-to-choose-inframe-school",
    title: "Top 5 Reasons to Choose Inframe School for Your Child's Education",
    excerpt: "Discover why Inframe School stands out...",
    heroImage: "https://example.com/hero.jpg",
    category: "Education",
    date: "February 28, 2025",
    readTime: "5 min read",
    author: {
      name: "Inframe School Team",
      image: "https://example.com/author.jpg"
    },
    sections: "...(array of sections)",
    relatedPosts: "...(array of related posts)",
    isPublished: true,
    metaTitle: "Top 5 Reasons to Choose Inframe School | Best Design School",
    metaDescription: "Discover why Inframe School stands out as one of the best design schools in India.",
    metaKeywords: "Inframe School, best design school India, arts design school Rajasthan",
    canonicalUrl: "https://inframeschool.com/blog/top-5-reasons-to-choose-inframe-school",
    views: 42,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  }
}, null, 2));

console.log('\nSuccess Response (Multiple Blogs):');
console.log(JSON.stringify({
  success: true,
  data: [
    "...(array of blog objects)"
  ]
}, null, 2));

console.log('\nError Response:');
console.log(JSON.stringify({
  success: false,
  message: "Blog not found"
}, null, 2));

console.log('\n✅ KEY FEATURES');
console.log('===============');
console.log('• Rich content structure with sections, quotes, highlights');
console.log('• SEO-friendly slug-based URLs');
console.log('• Complete SEO meta fields (title, description, keywords, canonical)');
console.log('• View count tracking and analytics');
console.log('• Draft/Published/Archived status management');
console.log('• Save as draft functionality');
console.log('• Publish date tracking');
console.log('• Category-based organization');
console.log('• Related posts linking');
console.log('• Author information with images');
console.log('• Admin content management');

console.log('\n🎨 UI INTEGRATION PATTERN');
console.log('=========================');
console.log('1. Blog List Page: Use GET /getblogs (show title, excerpt, category)');
console.log('2. Blog Detail Page: Use GET /getblogbyslug/:slug (show full content)');
console.log('3. Category Pages: Use GET /getblogsbycategory/:category');
console.log('4. Popular Posts: Use GET /getpopularblogs (sidebar/widget)');
console.log('5. Admin Dashboard: Use GET /getallblogs + publish controls');

console.log('\n📚 Complete documentation: docs/BLOG_API_DOCUMENTATION.md');
