# Course API Documentation

## Overview

The Course API provides comprehensive management for courses with nested data structures including programs, features, testimonials, FAQs, curriculum, software, and career prospects. It supports full CRUD operations for both main courses and all nested entities.

## Base URL: `/api/v1/courses`

## Data Structure

### Main Course Object
```javascript
{
  _id: string,
  slug: string,                    // Unique identifier (e.g., "interior-design")
  title: string,                   // Course title
  description: string,             // Course description
  heroImage: string,               // Main course image
  programs: CourseProgram[],       // Array of course programs
  features: CourseFeature[],       // Array of course features
  testimonials: CourseTestimonial[], // Array of student testimonials
  faqs: CourseFAQ[],              // Array of frequently asked questions
  curriculum: CourseCurriculum[],  // Array of curriculum items
  software: CourseSoftware[],      // Array of software taught
  careerProspects: CourseCareerProspect[], // Array of career opportunities
  ctaTitle: string,                // Call-to-action title
  ctaDescription: string,          // Call-to-action description
  brochurePdfUrl?: string,         // Optional brochure PDF URL
  isActive: boolean,               // Active/inactive status
  metaTitle?: string,              // SEO meta title
  metaDescription?: string,        // SEO meta description
  metaKeywords?: string,           // SEO meta keywords
  createdAt: Date,
  updatedAt: Date
}
```

### Nested Data Structures

#### CourseProgram
```javascript
{
  _id: string,
  title: string,
  duration: string,
  description: string,
  imageUrl: string,
  detailsUrl: string,
  order: number,
  isActive: boolean
}
```

#### CourseFeature
```javascript
{
  _id: string,
  title: string,
  description: string,
  imageUrl?: string,
  order: number
}
```

#### CourseTestimonial
```javascript
{
  _id: string,
  studentName: string,
  studentImage?: string,
  testimonialText: string,
  youtubeUrl?: string,
  course?: string,
  batch?: string,
  order: number,
  isActive: boolean
}
```

#### CourseFAQ
```javascript
{
  _id: string,
  question: string,
  answer: string,
  order: number,
  isActive: boolean
}
```

#### CourseCurriculum
```javascript
{
  _id: string,
  year: string,
  semester: string,
  subjects: string[],
  description?: string,
  imageUrl?: string,
  order: number
}
```

#### CourseSoftware
```javascript
{
  _id: string,
  name: string,
  logoUrl: string,
  description?: string,
  order: number
}
```

#### CourseCareerProspect
```javascript
{
  _id: string,
  title: string,
  roles: string[],
  description?: string,
  order: number
}
```

## API Endpoints

### Main Course Operations

#### 1. Create Course
- **POST** `/`
- **Description**: Creates a new course with all nested data

#### 2. Get All Courses
- **GET** `/`
- **Description**: Retrieves all courses

#### 3. Get Active Courses
- **GET** `/active`
- **Description**: Retrieves only active courses

#### 4. Get Course by ID
- **GET** `/:id`
- **Description**: Retrieves a specific course by ID

#### 5. Get Course by Slug
- **GET** `/slug/:slug`
- **Description**: Retrieves a course by slug (e.g., `/slug/interior-design`)

#### 6. Update Course
- **PUT** `/:id`
- **Description**: Updates course information

#### 7. Toggle Course Status
- **PUT** `/:id/toggle-status`
- **Description**: Toggles active/inactive status

#### 8. Delete Course
- **DELETE** `/:id`
- **Description**: Removes a course

### Nested Entity Operations

#### Course Programs
- **POST** `/:courseId/programs` - Add program to course
- **PUT** `/:courseId/programs/:programId` - Update program
- **DELETE** `/:courseId/programs/:programId` - Delete program

#### Course Features
- **POST** `/:courseId/features` - Add feature to course
- **PUT** `/:courseId/features/:featureId` - Update feature
- **DELETE** `/:courseId/features/:featureId` - Delete feature

#### Course Testimonials
- **POST** `/:courseId/testimonials` - Add testimonial to course
- **PUT** `/:courseId/testimonials/:testimonialId` - Update testimonial
- **DELETE** `/:courseId/testimonials/:testimonialId` - Delete testimonial

#### Course FAQs
- **POST** `/:courseId/faqs` - Add FAQ to course
- **PUT** `/:courseId/faqs/:faqId` - Update FAQ
- **DELETE** `/:courseId/faqs/:faqId` - Delete FAQ

#### Course Curriculum
- **POST** `/:courseId/curriculum` - Add curriculum item to course
- **PUT** `/:courseId/curriculum/:curriculumId` - Update curriculum item
- **DELETE** `/:courseId/curriculum/:curriculumId` - Delete curriculum item

#### Course Software
- **POST** `/:courseId/software` - Add software to course
- **PUT** `/:courseId/software/:softwareId` - Update software
- **DELETE** `/:courseId/software/:softwareId` - Delete software

#### Course Career Prospects
- **POST** `/:courseId/career-prospects` - Add career prospect to course
- **PUT** `/:courseId/career-prospects/:careerProspectId` - Update career prospect
- **DELETE** `/:courseId/career-prospects/:careerProspectId` - Delete career prospect

## Frontend Integration Examples

### Get All Courses
```javascript
// Matches your frontend function exactly
export async function getCourses(): Promise<Course[]> {
  const response = await fetch('/api/v1/courses');
  const result = await response.json();
  return result.data || [];
}
```

### Get Course by Slug
```javascript
// Matches your frontend function exactly
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const response = await fetch(`/api/v1/courses/slug/${slug}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Failed to fetch course');
  }
  const result = await response.json();
  return result.data;
}
```

### Create Complete Course
```javascript
// Create course with all nested data
const createCourse = async (courseData) => {
  const response = await fetch('/api/v1/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData)
  });
  const result = await response.json();
  return result.data;
};
```

### Add Program to Course
```javascript
// Matches your frontend function exactly
export async function addCourseProgram(courseId: string, program: Omit<CourseProgram, '_id'>): Promise<CourseProgram> {
  const response = await fetch(`/api/v1/courses/${courseId}/programs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(program)
  });
  const result = await response.json();
  return result.data;
}
```

### Course Detail Page
```javascript
// Load complete course data for detail page
const loadCourseDetail = async (slug) => {
  const course = await getCourseBySlug(slug);
  
  if (course) {
    // Display course information
    console.log('Course:', course.title);
    console.log('Programs:', course.programs.length);
    console.log('Features:', course.features.length);
    console.log('Testimonials:', course.testimonials.length);
    console.log('FAQs:', course.faqs.length);
    console.log('Curriculum:', course.curriculum.length);
    console.log('Software:', course.software.length);
    console.log('Career Prospects:', course.careerProspects.length);
  }
};
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "_id": "course_id",
    "slug": "interior-design",
    "title": "Interior Design",
    "description": "Transform spaces and create beautiful environments...",
    "heroImage": "https://example.com/hero.jpg",
    "programs": [...],
    "features": [...],
    "testimonials": [...],
    "faqs": [...],
    "curriculum": [...],
    "software": [...],
    "careerProspects": [...],
    "ctaTitle": "Ready to Start Your Journey?",
    "ctaDescription": "Take the first step...",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Course not found"
}
```

## Features

### ✅ Complete Course Management
- Full CRUD operations for courses
- Nested entity management
- Slug-based URL routing
- SEO optimization fields

### ✅ Rich Content Structure
- Multiple programs per course
- Feature highlights
- Student testimonials with video support
- Comprehensive FAQ system
- Detailed curriculum structure
- Software and tools information
- Career prospect mapping

### ✅ Admin Features
- Status management (active/inactive)
- Nested entity CRUD operations
- Order-based sequencing
- Comprehensive validation

### ✅ Frontend Ready
- TypeScript interface compliance
- Slug-based routing
- SEO-friendly structure
- Responsive data handling

The Course API provides a complete solution for managing educational courses with rich content structures and professional-grade features.
