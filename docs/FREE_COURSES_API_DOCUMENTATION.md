# Free Courses API Documentation

## Overview
The Free Courses API provides comprehensive CRUD operations for managing free courses in the Inframe School system. This API allows you to create, read, update, and delete free courses along with their associated details, learning objectives, and benefits.

## Base URL
```
http://localhost:5500/api/v1/free-courses
```

## Data Models

### Free Course Schema
```javascript
{
  name: String,                    // Course name
  shortDescription: String,        // Brief course description
  details: [DetailsSchema],        // Array of course details
  whyLearnThisCourse: String,      // Reasons to learn this course
  whatYouWillLearn: [String],      // Array of learning objectives
  careerOpportunities: String,     // Career prospects
  courseBenefits: [String],        // Array of course benefits
  imageUrl: String,                // Course image URL
  isActive: Boolean,               // Course status (default: true)
  metaTitle: String,               // SEO meta title
  metaDescription: String,         // SEO meta description
  metaKeywords: String,            // SEO meta keywords
  createdAt: Date,                 // Creation timestamp
  updatedAt: Date                  // Last update timestamp
}
```

### Details Schema
```javascript
{
  duration: Number,                // Course duration in weeks
  mode: String,                    // Learning mode (Online, Offline, Hybrid)
  certificate: String,             // Certificate availability
  level: String                    // Course level (Beginner, Intermediate, Advanced)
}
```

## Endpoints

### 1. Create Free Course
**POST** `/api/v1/free-courses`

Creates a new free course.

**Request Body:**
```json
{
  "name": "Introduction to Web Development",
  "shortDescription": "Learn the basics of HTML, CSS, and JavaScript",
  "details": [
    {
      "duration": 8,
      "mode": "Online",
      "certificate": "Yes",
      "level": "Beginner"
    }
  ],
  "whyLearnThisCourse": "Web development is one of the most in-demand skills...",
  "whatYouWillLearn": [
    "HTML fundamentals and structure",
    "CSS styling and layout",
    "JavaScript basics and DOM manipulation"
  ],
  "careerOpportunities": "Frontend Developer, Web Designer, UI/UX Developer",
  "courseBenefits": [
    "Free access to all course materials",
    "Certificate upon completion",
    "Lifetime access to course content"
  ],
  "imageUrl": "https://example.com/web-dev-course.jpg",
  "metaTitle": "Free Web Development Course",
  "metaDescription": "Start your web development journey...",
  "metaKeywords": "web development, HTML, CSS, JavaScript"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Introduction to Web Development",
    "shortDescription": "Learn the basics of HTML, CSS, and JavaScript",
    "details": [...],
    "whatYouWillLearn": [...],
    "courseBenefits": [...],
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Free Courses
**GET** `/api/v1/free-courses`

Retrieves all free courses (both active and inactive).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Introduction to Web Development",
      "shortDescription": "Learn the basics of HTML, CSS, and JavaScript",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 3. Get Active Free Courses
**GET** `/api/v1/free-courses/active`

Retrieves only active free courses.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Introduction to Web Development",
      "isActive": true
    }
  ]
}
```

### 4. Get Free Course by ID
**GET** `/api/v1/free-courses/:id`

Retrieves a specific free course by its ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Introduction to Web Development",
    "shortDescription": "Learn the basics of HTML, CSS, and JavaScript",
    "details": [...],
    "whatYouWillLearn": [...],
    "courseBenefits": [...],
    "isActive": true
  }
}
```

### 5. Update Free Course
**PUT** `/api/v1/free-courses/:id`

Updates an existing free course.

**Request Body:**
```json
{
  "name": "Advanced Web Development Fundamentals",
  "shortDescription": "Master HTML, CSS, and JavaScript with advanced concepts"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Advanced Web Development Fundamentals",
    "shortDescription": "Master HTML, CSS, and JavaScript with advanced concepts",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 6. Toggle Free Course Status
**PUT** `/api/v1/free-courses/:id/toggle-status`

Toggles the active status of a free course.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "isActive": false
  },
  "message": "Free course deactivated successfully"
}
```

### 7. Delete Free Course
**DELETE** `/api/v1/free-courses/:id`

Deletes a free course permanently.

**Response:**
```json
{
  "success": true,
  "message": "Free course deleted successfully"
}
```

## Details Management Endpoints

### 8. Add Course Detail
**POST** `/api/v1/free-courses/:courseId/details`

Adds a new detail to a free course.

**Request Body:**
```json
{
  "duration": 12,
  "mode": "Hybrid",
  "certificate": "Yes",
  "level": "Intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "duration": 12,
    "mode": "Hybrid",
    "certificate": "Yes",
    "level": "Intermediate"
  }
}
```

### 9. Update Course Detail
**PUT** `/api/v1/free-courses/:courseId/details/:detailId`

Updates a specific course detail.

**Request Body:**
```json
{
  "duration": 10,
  "mode": "Online",
  "level": "Advanced"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "duration": 10,
    "mode": "Online",
    "certificate": "Yes",
    "level": "Advanced"
  }
}
```

### 10. Delete Course Detail
**DELETE** `/api/v1/free-courses/:courseId/details/:detailId`

Deletes a specific course detail.

**Response:**
```json
{
  "success": true,
  "message": "Detail deleted successfully"
}
```

## Learning Objectives Management

### 11. Add Learning Objective
**POST** `/api/v1/free-courses/:courseId/what-you-will-learn`

Adds a new learning objective to the course.

**Request Body:**
```json
{
  "item": "Advanced JavaScript concepts and ES6 features"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "item": "Advanced JavaScript concepts and ES6 features"
  },
  "message": "Learning objective added successfully"
}
```

### 12. Update Learning Objective
**PUT** `/api/v1/free-courses/:courseId/what-you-will-learn/:index`

Updates a learning objective at a specific index.

**Request Body:**
```json
{
  "item": "Advanced JavaScript concepts, ES6+ features, and modern frameworks"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "item": "Advanced JavaScript concepts, ES6+ features, and modern frameworks"
  },
  "message": "Learning objective updated successfully"
}
```

### 13. Delete Learning Objective
**DELETE** `/api/v1/free-courses/:courseId/what-you-will-learn/:index`

Deletes a learning objective at a specific index.

**Response:**
```json
{
  "success": true,
  "message": "Learning objective deleted successfully",
  "data": {
    "deletedItem": "Advanced JavaScript concepts, ES6+ features, and modern frameworks"
  }
}
```

## Course Benefits Management

### 14. Add Course Benefit
**POST** `/api/v1/free-courses/:courseId/course-benefits`

Adds a new benefit to the course.

**Request Body:**
```json
{
  "benefit": "Real-world project portfolio building"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "benefit": "Real-world project portfolio building"
  },
  "message": "Course benefit added successfully"
}
```

### 15. Update Course Benefit
**PUT** `/api/v1/free-courses/:courseId/course-benefits/:index`

Updates a course benefit at a specific index.

**Request Body:**
```json
{
  "benefit": "Real-world project portfolio building with industry best practices"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "benefit": "Real-world project portfolio building with industry best practices"
  },
  "message": "Course benefit updated successfully"
}
```

### 16. Delete Course Benefit
**DELETE** `/api/v1/free-courses/:courseId/course-benefits/:index`

Deletes a course benefit at a specific index.

**Response:**
```json
{
  "success": true,
  "message": "Course benefit deleted successfully",
  "data": {
    "deletedBenefit": "Real-world project portfolio building with industry best practices"
  }
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Free course not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [...]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Usage Examples

### Creating a Complete Free Course
```javascript
const courseData = {
  name: "Python for Beginners",
  shortDescription: "Learn Python programming from scratch",
  details: [
    {
      duration: 6,
      mode: "Online",
      certificate: "Yes",
      level: "Beginner"
    }
  ],
  whyLearnThisCourse: "Python is one of the most popular programming languages...",
  whatYouWillLearn: [
    "Python syntax and basic concepts",
    "Data structures and algorithms",
    "Object-oriented programming",
    "File handling and modules"
  ],
  careerOpportunities: "Python Developer, Data Analyst, Machine Learning Engineer",
  courseBenefits: [
    "Free access to all materials",
    "Certificate upon completion",
    "Community support"
  ],
  imageUrl: "https://example.com/python-course.jpg",
  metaTitle: "Free Python Course for Beginners",
  metaDescription: "Learn Python programming fundamentals",
  metaKeywords: "python, programming, beginners, free course"
};

const response = await fetch('/api/v1/free-courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(courseData)
});
```

### Getting Active Courses for Frontend Display
```javascript
const response = await fetch('/api/v1/free-courses/active');
const { data: activeCourses } = await response.json();

// Display courses in UI
activeCourses.forEach(course => {
  console.log(`Course: ${course.name}`);
  console.log(`Description: ${course.shortDescription}`);
});
```

## Testing

Use the provided test script to verify all endpoints:
```bash
node scripts/testFreeCoursesAPI.js
```

This will run comprehensive tests for all CRUD operations and sub-resource management.

## Notes

- All timestamps are in ISO 8601 format
- Array indices for learning objectives and benefits are 0-based
- The `isActive` field defaults to `true` for new courses
- SEO fields (metaTitle, metaDescription, metaKeywords) are optional
- All endpoints return JSON responses with consistent structure 