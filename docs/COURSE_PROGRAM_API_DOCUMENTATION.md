# Course Program API Documentation

## Overview
The Course Program API provides comprehensive management for courses and their associated programs, including detailed fee structures, EMI options, coupon codes, and all program-related components. This API supports the complete course management system with nested program structures.

## Base URL
```
http://localhost:5500/api/v1/courses
```

---

## Data Models

### Course Schema
```javascript
{
  _id: ObjectId,
  slug: String (required, unique),
  title: String (required),
  description: String (required),
  heroImage: String (required),
  programs: [CourseProgram],
  features: [CourseFeature],
  testimonials: [CourseTestimonial],
  faqs: [CourseFAQ],
  curriculum: [CurriculumYear],
  software: [SoftwareTool],
  careerProspects: [CareerProspect],
  ctaTitle: String (required),
  ctaDescription: String (required),
  brochurePdfUrl: String,
  isActive: Boolean,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Program Schema
```javascript
{
  _id: ObjectId,
  slug: String,
  title: String,
  parentCourseSlug: String,
  parentCourseTitle: String,
  heroImage: String,
  duration: String,
  description: String,
  shortDescription: String,
  imageUrl: String,
  detailsUrl: String,
  order: Number,
  courseOverview: String,
  admissionSteps: [AdmissionStep],
  admissionQuote: String,
  galleryImages: [CourseGalleryImage],
  programHighlights: [ProgramHighlight],
  careerPaths: [CareerPath],
  curriculum: [CurriculumYear],
  softwareTools: [SoftwareTool],
  industryPartners: [IndustryPartner],
  testimonials: [CourseTestimonial],
  faqs: [CourseFAQ],
  feeBenefits: [CourseFeeBenefit],
  feeStructure: FeeStructure,
  eligibility: [CourseEligibility],
  scheduleOptions: [CourseSchedule],
  ctaTitle: String,
  ctaDescription: String,
  ctaButtonText: String,
  isActive: Boolean,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Fee Structure Schema
```javascript
{
  _id: ObjectId,
  totalFee: Number (required),
  monthlyFee: Number,
  yearlyFee: Number,
  processingFee: Number,
  registrationFee: Number,
  emiOptions: [EMIOption],
  discountPercentage: Number,
  couponCodes: [CouponCode],
  paymentTerms: String,
  refundPolicy: String,
  isActive: Boolean,
  order: Number
}
```

### EMI Option Schema
```javascript
{
  _id: ObjectId,
  months: Number (required),
  monthlyAmount: Number (required),
  totalAmount: Number (required),
  processingFee: Number,
  interestRate: Number,
  isActive: Boolean,
  order: Number
}
```

### Coupon Code Schema
```javascript
{
  _id: ObjectId,
  code: String (required),
  discountType: String (enum: 'percentage', 'fixed'),
  discountValue: Number (required),
  minimumAmount: Number,
  maximumDiscount: Number,
  validFrom: Date (required),
  validUntil: Date (required),
  usageLimit: Number,
  usedCount: Number,
  isActive: Boolean,
  description: String,
  order: Number
}
```

---

## Endpoints

### 1. Course Management

#### Get All Courses
**GET** `/`

Returns all courses in the system.

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "slug": "interior-design",
      "title": "Interior Design",
      "description": "Comprehensive interior design course",
      "heroImage": "https://example.com/hero.jpg",
      "programs": [...],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Get Active Courses
**GET** `/active`

Returns only active courses.

#### Get Course by ID
**GET** `/:id`

Returns a specific course by ID.

#### Get Course by Slug
**GET** `/slug/:slug`

Returns a specific course by slug.

#### Create Course
**POST** `/`

Creates a new course.

**Request Body**
```json
{
  "slug": "interior-design",
  "title": "Interior Design",
  "description": "Comprehensive interior design course",
  "heroImage": "https://example.com/hero.jpg",
  "ctaTitle": "Start Your Design Journey",
  "ctaDescription": "Join our comprehensive interior design program",
  "isActive": true
}
```

#### Update Course
**PUT** `/:id`

Updates an existing course.

#### Delete Course
**DELETE** `/:id`

Deletes a course.

#### Toggle Course Status
**PUT** `/:id/toggle-status`

Toggles the active status of a course.

---

### 2. Program Management

#### Add Program to Course
**POST** `/:courseId/programs`

Adds a new program to a course.

**Request Body**
```json
{
  "title": "Bachelor of Design in Interior Design",
  "slug": "bdes-in-interior-design",
  "duration": "4 Years Full-Time",
  "description": "Comprehensive B.Des program in Interior Design",
  "courseOverview": "This program provides comprehensive training...",
  "imageUrl": "https://example.com/program.jpg",
  "detailsUrl": "/programs/bdes-interior-design",
  "order": 1,
  "isActive": true
}
```

#### Update Program
**PUT** `/:courseId/programs/:programId`

Updates a specific program.

#### Delete Program
**DELETE** `/:courseId/programs/:programId`

Deletes a program from a course.

---

### 3. Program-Specific Operations

#### Admission Steps

**Add Admission Step**
**POST** `/:courseId/programs/:programId/admission-steps`

**Request Body**
```json
{
  "stepNumber": 1,
  "icon": "📝",
  "title": "Fill Application Form",
  "description": "Complete the online application form with your details",
  "order": 1
}
```

**Update Admission Step**
**PUT** `/:courseId/programs/:programId/admission-steps/:stepId`

**Delete Admission Step**
**DELETE** `/:courseId/programs/:programId/admission-steps/:stepId`

---

### 4. Fee Structure Management

#### Update Program Fee Structure
**PUT** `/:courseId/programs/:programId/fee-structure`

**Request Body**
```json
{
  "totalFee": 250000,
  "monthlyFee": 20833,
  "yearlyFee": 62500,
  "processingFee": 5000,
  "registrationFee": 10000,
  "discountPercentage": 10,
  "paymentTerms": "50% upfront, 50% in 3 months",
  "refundPolicy": "Full refund within 30 days",
  "isActive": true,
  "order": 1
}
```

#### EMI Options

**Add EMI Option**
**POST** `/:courseId/programs/:programId/emi-options`

**Request Body**
```json
{
  "months": 12,
  "monthlyAmount": 20833,
  "totalAmount": 250000,
  "processingFee": 5000,
  "interestRate": 0,
  "isActive": true,
  "order": 1
}
```

**Update EMI Option**
**PUT** `/:courseId/programs/:programId/emi-options/:emiId`

**Delete EMI Option**
**DELETE** `/:courseId/programs/:programId/emi-options/:emiId`

#### Coupon Codes

**Add Coupon Code**
**POST** `/:courseId/programs/:programId/coupon-codes`

**Request Body**
```json
{
  "code": "SAVE20",
  "discountType": "percentage",
  "discountValue": 20,
  "minimumAmount": 50000,
  "maximumDiscount": 50000,
  "validFrom": "2024-01-01T00:00:00.000Z",
  "validUntil": "2024-12-31T23:59:59.000Z",
  "usageLimit": 100,
  "usedCount": 0,
  "isActive": true,
  "description": "20% off on total fee",
  "order": 1
}
```

**Update Coupon Code**
**PUT** `/:courseId/programs/:programId/coupon-codes/:couponId`

**Delete Coupon Code**
**DELETE** `/:courseId/programs/:programId/coupon-codes/:couponId`

---

### 5. Course Components

#### Features
- `POST /:courseId/features` - Add feature
- `PUT /:courseId/features/:featureId` - Update feature
- `DELETE /:courseId/features/:featureId` - Delete feature

#### Testimonials
- `POST /:courseId/testimonials` - Add testimonial
- `PUT /:courseId/testimonials/:testimonialId` - Update testimonial
- `DELETE /:courseId/testimonials/:testimonialId` - Delete testimonial

#### FAQs
- `POST /:courseId/faqs` - Add FAQ
- `PUT /:courseId/faqs/:faqId` - Update FAQ
- `DELETE /:courseId/faqs/:faqId` - Delete FAQ

#### Curriculum
- `POST /:courseId/curriculum` - Add curriculum year
- `PUT /:courseId/curriculum/:curriculumId` - Update curriculum
- `DELETE /:courseId/curriculum/:curriculumId` - Delete curriculum

#### Software Tools
- `POST /:courseId/software` - Add software tool
- `PUT /:courseId/software/:softwareId` - Update software tool
- `DELETE /:courseId/software/:softwareId` - Delete software tool

#### Career Prospects
- `POST /:courseId/career-prospects` - Add career prospect
- `PUT /:courseId/career-prospects/:careerProspectId` - Update career prospect
- `DELETE /:courseId/career-prospects/:careerProspectId` - Delete career prospect

---

### 6. Utility Endpoints

#### Generate Slug from Title
**GET** `/generate-slug/:title`

Generates a URL-friendly slug from a title.

**Response (200 OK)**
```json
{
  "success": true,
  "slug": "interior-design-course"
}
```

#### Get All Programs
**GET** `/programs/all`

Returns all programs from all active courses.

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Bachelor of Design in Interior Design",
      "slug": "bdes-in-interior-design",
      "parentCourseSlug": "interior-design",
      "parentCourseTitle": "Interior Design",
      "duration": "4 Years Full-Time",
      "isActive": true
    }
  ]
}
```

#### Get Program by Slug
**GET** `/programs/:courseSlug/:programSlug`

Returns a specific program by course slug and program slug.

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Bachelor of Design in Interior Design",
    "slug": "bdes-in-interior-design",
    "parentCourseSlug": "interior-design",
    "parentCourseTitle": "Interior Design",
    "duration": "4 Years Full-Time",
    "description": "Comprehensive B.Des program",
    "feeStructure": {
      "totalFee": 250000,
      "emiOptions": [...],
      "couponCodes": [...]
    },
    "isActive": true
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Usage Examples

### Complete Program Creation Flow

1. **Create Course**
```bash
curl -X POST http://localhost:5500/api/v1/courses \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "interior-design",
    "title": "Interior Design",
    "description": "Comprehensive interior design course",
    "heroImage": "https://example.com/hero.jpg",
    "ctaTitle": "Start Your Design Journey",
    "ctaDescription": "Join our comprehensive interior design program"
  }'
```

2. **Add Program to Course**
```bash
curl -X POST http://localhost:5500/api/v1/courses/64f8a1b2c3d4e5f6a7b8c9d0/programs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bachelor of Design in Interior Design",
    "slug": "bdes-in-interior-design",
    "duration": "4 Years Full-Time",
    "description": "Comprehensive B.Des program in Interior Design",
    "courseOverview": "This program provides comprehensive training...",
    "imageUrl": "https://example.com/program.jpg",
    "detailsUrl": "/programs/bdes-interior-design",
    "order": 1,
    "isActive": true
  }'
```

3. **Add Fee Structure**
```bash
curl -X PUT http://localhost:5500/api/v1/courses/64f8a1b2c3d4e5f6a7b8c9d0/programs/64f8a1b2c3d4e5f6a7b8c9d1/fee-structure \
  -H "Content-Type: application/json" \
  -d '{
    "totalFee": 250000,
    "monthlyFee": 20833,
    "yearlyFee": 62500,
    "processingFee": 5000,
    "registrationFee": 10000,
    "discountPercentage": 10,
    "paymentTerms": "50% upfront, 50% in 3 months",
    "refundPolicy": "Full refund within 30 days",
    "isActive": true,
    "order": 1
  }'
```

4. **Add EMI Option**
```bash
curl -X POST http://localhost:5500/api/v1/courses/64f8a1b2c3d4e5f6a7b8c9d0/programs/64f8a1b2c3d4e5f6a7b8c9d1/emi-options \
  -H "Content-Type: application/json" \
  -d '{
    "months": 12,
    "monthlyAmount": 20833,
    "totalAmount": 250000,
    "processingFee": 5000,
    "interestRate": 0,
    "isActive": true,
    "order": 1
  }'
```

5. **Add Coupon Code**
```bash
curl -X POST http://localhost:5500/api/v1/courses/64f8a1b2c3d4e5f6a7b8c9d0/programs/64f8a1b2c3d4e5f6a7b8c9d1/coupon-codes \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "discountType": "percentage",
    "discountValue": 20,
    "minimumAmount": 50000,
    "maximumDiscount": 50000,
    "validFrom": "2024-01-01T00:00:00.000Z",
    "validUntil": "2024-12-31T23:59:59.000Z",
    "usageLimit": 100,
    "usedCount": 0,
    "isActive": true,
    "description": "20% off on total fee",
    "order": 1
  }'
```

---

## Validation Rules

### Course Validation
- **slug**: Required, unique, 2-100 characters, lowercase
- **title**: Required, 2-200 characters
- **description**: Required, 10-2000 characters
- **heroImage**: Required, valid URL
- **ctaTitle**: Required, 2-200 characters
- **ctaDescription**: Required, minimum 10 characters

### Program Validation
- **title**: Required, non-empty string
- **slug**: Auto-generated if not provided
- **imageUrl**: Required for backend compatibility
- **detailsUrl**: Required for backend compatibility
- **order**: Required, minimum 1

### Fee Structure Validation
- **totalFee**: Required, minimum 0
- **discountPercentage**: 0-100 range
- **emiOptions**: Array of valid EMI options
- **couponCodes**: Array of valid coupon codes

### EMI Option Validation
- **months**: Required, minimum 1
- **monthlyAmount**: Required, minimum 0
- **totalAmount**: Required, minimum 0
- **processingFee**: Minimum 0
- **interestRate**: Minimum 0

### Coupon Code Validation
- **code**: Required, uppercase, unique
- **discountType**: Required, enum ['percentage', 'fixed']
- **discountValue**: Required, minimum 0
- **validFrom**: Required, valid date
- **validUntil**: Required, valid date, after validFrom
- **usageLimit**: Minimum 1 if provided

---

## Notes

- All timestamps are in ISO 8601 format
- Slugs are auto-generated from titles if not provided
- Parent course information is automatically set for programs
- Fee structures support complex EMI and coupon configurations
- All endpoints support proper error handling and validation
- The API maintains backward compatibility with existing data 