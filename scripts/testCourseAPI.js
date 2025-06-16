// Test script for Course API
// This script provides examples for testing all course endpoints

const BASE_URL = 'http://localhost:5500/api/v1/courses';

console.log('Course API Test Guide');
console.log('====================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed sample data:');
console.log('   node scripts/seedCourseData.js\n');

console.log('🧪 Test the following endpoints:\n');

// Main Course Operations
console.log('📚 MAIN COURSE OPERATIONS');
console.log('=========================');

console.log('GET All Courses:');
console.log(`   curl ${BASE_URL}\n`);

console.log('GET Active Courses:');
console.log(`   curl ${BASE_URL}/active\n`);

console.log('GET Course by Slug:');
console.log(`   curl ${BASE_URL}/slug/interior-design\n`);

console.log('GET Course by ID:');
console.log(`   curl ${BASE_URL}/COURSE_ID\n`);

console.log('POST Create Course:');
console.log(`   curl -X POST ${BASE_URL} \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "slug": "graphic-design",\n');
console.log('       "title": "Graphic Design",\n');
console.log('       "description": "Master visual communication through graphic design",\n');
console.log('       "heroImage": "https://example.com/graphic-design.jpg",\n');
console.log('       "programs": [],\n');
console.log('       "features": [],\n');
console.log('       "testimonials": [],\n');
console.log('       "faqs": [],\n');
console.log('       "curriculum": [],\n');
console.log('       "software": [],\n');
console.log('       "careerProspects": [],\n');
console.log('       "ctaTitle": "Start Your Design Journey",\n');
console.log('       "ctaDescription": "Join our graphic design program today"\n');
console.log('     }\'\n');

console.log('PUT Update Course:');
console.log(`   curl -X PUT ${BASE_URL}/COURSE_ID \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Updated Course Title"}\'\n');

console.log('PUT Toggle Course Status:');
console.log(`   curl -X PUT ${BASE_URL}/COURSE_ID/toggle-status\n`);

console.log('DELETE Course:');
console.log(`   curl -X DELETE ${BASE_URL}/COURSE_ID\n`);

console.log('GET Generate Slug:');
console.log(`   curl ${BASE_URL}/generate-slug/Interior%20Design\n`);

// Image Upload Operations
console.log('📷 IMAGE UPLOAD OPERATIONS');
console.log('=========================');

console.log('POST Upload Single Image:');
console.log(`   curl -X POST http://localhost:5500/api/v1/upload/image \\`);
console.log('     -F "image=@/path/to/your/image.jpg"\n');

console.log('POST Upload Multiple Images:');
console.log(`   curl -X POST http://localhost:5500/api/v1/upload/images \\`);
console.log('     -F "images=@/path/to/image1.jpg" \\');
console.log('     -F "images=@/path/to/image2.jpg"\n');

console.log('DELETE Image from Cloudinary:');
console.log(`   curl -X DELETE http://localhost:5500/api/v1/upload/image/PUBLIC_ID\n`);

// Nested Entity Operations
console.log('🔧 NESTED ENTITY OPERATIONS');
console.log('===========================');

console.log('POST Add Program to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/programs \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "title": "Bachelor of Design",\n');
console.log('       "duration": "4 Years",\n');
console.log('       "description": "Comprehensive design program",\n');
console.log('       "imageUrl": "https://example.com/program.jpg",\n');
console.log('       "detailsUrl": "/program-details",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('POST Add Feature to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/features \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "title": "Industry Exposure",\n');
console.log('       "description": "Real-world project experience",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('POST Add Testimonial to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/testimonials \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "studentName": "John Doe",\n');
console.log('       "testimonialText": "Great experience at Inframe School",\n');
console.log('       "course": "Interior Design",\n');
console.log('       "batch": "2023",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('POST Add FAQ to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/faqs \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "question": "What are the career opportunities?",\n');
console.log('       "answer": "Graduates can work as designers, consultants, or start their own studios",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('POST Add Curriculum to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/curriculum \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "year": "First Year",\n');
console.log('       "semester": "Semester 1",\n');
console.log('       "subjects": ["Design Fundamentals", "Drawing", "Color Theory"],\n');
console.log('       "description": "Foundation year subjects",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('POST Add Software to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/software \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "name": "Adobe Photoshop",\n');
console.log('       "logoUrl": "https://example.com/photoshop-logo.png",\n');
console.log('       "description": "Industry-standard image editing software",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('POST Add Career Prospect to Course:');
console.log(`   curl -X POST ${BASE_URL}/COURSE_ID/career-prospects \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "title": "Design Studios",\n');
console.log('       "roles": ["Interior Designer", "Design Consultant"],\n');
console.log('       "description": "Work with established design firms",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

// Frontend Integration Examples
console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('Complete Course Data Fetch:');
console.log(`
// Get all courses for courses page
const getCourses = async () => {
  const response = await fetch('${BASE_URL}');
  const result = await response.json();
  return result.data || [];
};

// Get course by slug for detail page
const getCourseBySlug = async (slug) => {
  const response = await fetch(\`${BASE_URL}/slug/\${slug}\`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Failed to fetch course');
  }
  const result = await response.json();
  return result.data;
};

// Usage
const courses = await getCourses();
const interiorDesign = await getCourseBySlug('interior-design');

// Image upload utility function
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/v1/upload/image', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const result = await response.json();
  return result.data.imageUrl;
};

// Generate slug utility
const generateSlug = async (title) => {
  const response = await fetch(\`/api/v1/courses/generate-slug/\${encodeURIComponent(title)}\`);
  const result = await response.json();
  return result.data;
};
`);

console.log('Course Detail Page:');
console.log(`
// Load complete course data for detail page
const loadCourseDetail = async (slug) => {
  const course = await getCourseBySlug(slug);
  
  if (course) {
    console.log('Course:', course.title);
    console.log('Programs:', course.programs.length);
    console.log('Features:', course.features.length);
    console.log('Testimonials:', course.testimonials.length);
    console.log('FAQs:', course.faqs.length);
    console.log('Curriculum:', course.curriculum.length);
    console.log('Software:', course.software.length);
    console.log('Career Prospects:', course.careerProspects.length);
    
    // Display programs
    course.programs.forEach(program => {
      console.log(\`Program: \${program.title} - \${program.duration}\`);
    });
    
    // Display features
    course.features.forEach(feature => {
      console.log(\`Feature: \${feature.title}\`);
    });
  }
};
`);

console.log('Admin Course Management:');
console.log(`
// Admin: Add program to existing course
const addProgramToCourse = async (courseId, programData) => {
  const response = await fetch(\`${BASE_URL}/\${courseId}/programs\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(programData)
  });
  const result = await response.json();
  return result.data;
};

// Admin: Update course information
const updateCourse = async (courseId, updateData) => {
  const response = await fetch(\`${BASE_URL}/\${courseId}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  const result = await response.json();
  return result.data;
};

// Admin: Toggle course status
const toggleCourseStatus = async (courseId) => {
  const response = await fetch(\`${BASE_URL}/\${courseId}/toggle-status\`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};
`);

console.log('\n✅ KEY FEATURES');
console.log('===============');
console.log('• Complete course management with nested entities');
console.log('• Slug-based URL routing for SEO-friendly URLs');
console.log('• Rich content structure (programs, features, testimonials, etc.)');
console.log('• TypeScript interface compliance');
console.log('• SEO optimization fields');
console.log('• Order-based sequencing for all nested entities');
console.log('• Active/inactive status management');
console.log('• Comprehensive validation and error handling');

console.log('\n🎨 UI INTEGRATION PATTERN');
console.log('=========================');
console.log('1. Courses List Page: Use GET /courses for course cards');
console.log('2. Course Detail Page: Use GET /slug/:slug for complete course data');
console.log('3. Admin Course Management: Use all CRUD endpoints');
console.log('4. Nested Entity Management: Use specific nested endpoints');
console.log('5. SEO Optimization: Use meta fields for search engine optimization');

console.log('\n📚 Complete documentation: docs/COURSE_API_DOCUMENTATION.md');
