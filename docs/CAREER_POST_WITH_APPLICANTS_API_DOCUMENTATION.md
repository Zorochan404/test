# Career Post with Applicants API Documentation

## Overview
The Career Post with Applicants API provides endpoints for managing job postings and handling job applications. This API allows you to create career posts, manage applications, and track applicant statuses throughout the hiring process.

## Base URL
```
http://localhost:5000/api/v1/career-posts
```

## Data Models

### Career Post Schema
```javascript
{
  title: String (required),
  place: String (required),
  description: String (required),
  requirements: [String] (required),
  partTime: Boolean (required),
  isActive: Boolean (required),
  applicants: [ApplicantSchema] (default: []),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Applicant Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  resumeUrl: String (required),
  coverLetter: String (optional),
  status: String (enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'], default: 'pending'),
  appliedAt: Date (auto-generated)
}
```

### Field Descriptions

#### Career Post Fields
- **title**: The job title/position name
- **place**: The location where the job is based
- **description**: Detailed description of the job role and responsibilities
- **requirements**: Array of required qualifications and skills
- **partTime**: Boolean indicating if the position is part-time (true) or full-time (false)
- **isActive**: Boolean indicating if the career post is currently active and visible
- **applicants**: Array of applicants who have applied to this position

#### Applicant Fields
- **name**: Full name of the applicant
- **email**: Email address of the applicant (used for duplicate checking)
- **phone**: Phone number of the applicant
- **resumeUrl**: URL to the applicant's resume file
- **coverLetter**: Optional cover letter from the applicant
- **status**: Current status of the application (pending, reviewed, shortlisted, rejected, hired)
- **appliedAt**: Timestamp when the application was submitted

---

## Endpoints

### ===== CAREER POST ENDPOINTS =====

#### 1. Create Career Post
**POST** `/addcareerpost`

Creates a new career post.

#### Request Body
```json
{
  "title": "Software Developer",
  "place": "New York, NY",
  "description": "We are looking for a talented software developer...",
  "requirements": [
    "Bachelor's degree in Computer Science",
    "3+ years of experience with JavaScript",
    "Experience with React and Node.js"
  ],
  "partTime": false,
  "isActive": true
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Software Developer",
    "place": "New York, NY",
    "description": "We are looking for a talented software developer...",
    "requirements": [...],
    "partTime": false,
    "isActive": true,
    "applicants": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 2. Get All Career Posts (Admin)
**GET** `/getallcareerposts`

Retrieves all career posts regardless of their active status.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Software Developer",
      "place": "New York, NY",
      "description": "We are looking for a talented software developer...",
      "requirements": [...],
      "partTime": false,
      "isActive": true,
      "applicants": [...],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. Get Active Career Posts (Public)
**GET** `/getcareerposts`

Retrieves only active career posts for public display.

---

#### 4. Get Career Post by ID
**GET** `/getcareerpostbyid/:id`

Retrieves a specific career post by its ID.

#### Parameters
- `id` (string, required): The career post ID

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Software Developer",
    "place": "New York, NY",
    "description": "We are looking for a talented software developer...",
    "requirements": [...],
    "partTime": false,
    "isActive": true,
    "applicants": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-123-4567",
        "resumeUrl": "https://example.com/resume/john-doe.pdf",
        "coverLetter": "I am excited to apply for this position...",
        "status": "pending",
        "appliedAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 5. Update Career Post
**PUT** `/updatecareerpost/:id`

Updates an existing career post.

#### Parameters
- `id` (string, required): The career post ID

#### Request Body
```json
{
  "title": "Senior Software Developer",
  "description": "Updated description for senior position"
}
```

---

#### 6. Delete Career Post
**DELETE** `/deletecareerpost/:id`

Permanently deletes a career post and all its applications.

#### Parameters
- `id` (string, required): The career post ID

---

#### 7. Get Active Career Posts
**GET** `/getactivecareerposts`

Retrieves only active career posts.

---

#### 8. Get Inactive Career Posts
**GET** `/getinactivecareerposts`

Retrieves only inactive career posts.

---

#### 9. Get Career Posts by Type
**GET** `/getcareerpostsbytype/:type`

Retrieves career posts filtered by employment type.

#### Parameters
- `type` (string, required): Either "fulltime" or "parttime"

---

#### 10. Get Career Posts by Place
**GET** `/getcareerpostsbyplace/:place`

Retrieves career posts filtered by location (case-insensitive search).

#### Parameters
- `place` (string, required): The location to search for

---

#### 11. Search Career Posts
**GET** `/searchcareerposts?query=searchterm`

Searches through active career posts by title, place, or description.

#### Query Parameters
- `query` (string, required): The search term

---

#### 12. Toggle Career Post Status
**PUT** `/togglecareerpoststatus/:id`

Toggles the active status of a career post (active ↔ inactive).

#### Parameters
- `id` (string, required): The career post ID

---

#### 13. Activate Career Post
**PUT** `/activatecareerpost/:id`

Activates a career post (sets isActive to true).

#### Parameters
- `id` (string, required): The career post ID

---

#### 14. Deactivate Career Post
**PUT** `/deactivatecareerpost/:id`

Deactivates a career post (sets isActive to false).

#### Parameters
- `id` (string, required): The career post ID

---

### ===== APPLICANT ENDPOINTS =====

#### 15. Apply to Career Post
**POST** `/apply/:id`

Allows an applicant to apply to a specific career post.

#### Parameters
- `id` (string, required): The career post ID

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-123-4567",
  "resumeUrl": "https://example.com/resume/john-doe.pdf",
  "coverLetter": "I am excited to apply for the Software Developer position. I have 5 years of experience in web development and am passionate about creating innovative solutions."
}
```

#### Response
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "resumeUrl": "https://example.com/resume/john-doe.pdf",
    "coverLetter": "I am excited to apply for the Software Developer position...",
    "status": "pending",
    "appliedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### Error Responses
- **404**: Career post not found
- **400**: Career post is not accepting applications (inactive)
- **400**: Applicant has already applied to this position

---

#### 16. Get Applicants for Career Post
**GET** `/applicants/:id`

Retrieves all applicants for a specific career post.

#### Parameters
- `id` (string, required): The career post ID

#### Response
```json
{
  "success": true,
  "data": {
    "careerPostTitle": "Software Developer",
    "applicants": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-123-4567",
        "resumeUrl": "https://example.com/resume/john-doe.pdf",
        "coverLetter": "I am excited to apply for this position...",
        "status": "pending",
        "appliedAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "totalApplicants": 1
  }
}
```

---

#### 17. Get All Applicants
**GET** `/all-applicants`

Retrieves all applicants across all career posts.

#### Response
```json
{
  "success": true,
  "data": {
    "careerPosts": [
      {
        "careerPostId": "507f1f77bcf86cd799439011",
        "careerPostTitle": "Software Developer",
        "applicants": [...],
        "totalApplicants": 2
      }
    ],
    "totalCareerPosts": 1,
    "totalApplicants": 2
  }
}
```

---

#### 18. Remove Applicant from Career Post
**DELETE** `/applicants/:id/:applicantId`

Removes a specific applicant from a career post.

#### Parameters
- `id` (string, required): The career post ID
- `applicantId` (string, required): The applicant ID

#### Response
```json
{
  "success": true,
  "message": "Applicant removed successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "resumeUrl": "https://example.com/resume/john-doe.pdf",
    "coverLetter": "I am excited to apply for this position...",
    "status": "pending",
    "appliedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

#### 19. Update Applicant Status
**PUT** `/applicants/:id/:applicantId/status`

Updates the status of a specific applicant.

#### Parameters
- `id` (string, required): The career post ID
- `applicantId` (string, required): The applicant ID

#### Request Body
```json
{
  "status": "reviewed"
}
```

#### Valid Status Values
- `pending` (default)
- `reviewed`
- `shortlisted`
- `rejected`
- `hired`

#### Response
```json
{
  "success": true,
  "message": "Applicant status updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "resumeUrl": "https://example.com/resume/john-doe.pdf",
    "coverLetter": "I am excited to apply for this position...",
    "status": "reviewed",
    "appliedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### Error Response (400)
```json
{
  "success": false,
  "message": "Status must be one of: pending, reviewed, shortlisted, rejected, hired"
}
```

---

#### 20. Get Applicants by Status
**GET** `/applicants-by-status/:status`

Retrieves all applicants with a specific status across all career posts.

#### Parameters
- `status` (string, required): The status to filter by

#### Response
```json
{
  "success": true,
  "data": {
    "status": "pending",
    "careerPosts": [
      {
        "careerPostId": "507f1f77bcf86cd799439011",
        "careerPostTitle": "Software Developer",
        "applicants": [
          {
            "_id": "507f1f77bcf86cd799439012",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1-555-123-4567",
            "resumeUrl": "https://example.com/resume/john-doe.pdf",
            "coverLetter": "I am excited to apply for this position...",
            "status": "pending",
            "appliedAt": "2024-01-15T11:00:00.000Z"
          }
        ]
      }
    ],
    "totalApplicants": 1
  }
}
```

---

## Error Handling

### Common Error Responses

#### 404 Not Found
```json
{
  "success": false,
  "message": "Career post not found"
}
```

#### 400 Bad Request
```json
{
  "success": false,
  "message": "You have already applied to this position"
}
```

#### 400 Bad Request (Inactive Post)
```json
{
  "success": false,
  "message": "This career post is not currently accepting applications"
}
```

#### 400 Bad Request (Invalid Status)
```json
{
  "success": false,
  "message": "Status must be one of: pending, reviewed, shortlisted, rejected, hired"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Usage Examples

### Applying to a Career Post
```javascript
const response = await fetch('/api/v1/career-posts/apply/507f1f77bcf86cd799439011', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    resumeUrl: "https://example.com/resume/john-doe.pdf",
    coverLetter: "I am excited to apply for this position..."
  })
});
```

### Getting Applicants for a Career Post
```javascript
const response = await fetch('/api/v1/career-posts/applicants/507f1f77bcf86cd799439011');
const data = await response.json();
```

### Updating Applicant Status
```javascript
const response = await fetch('/api/v1/career-posts/applicants/507f1f77bcf86cd799439011/507f1f77bcf86cd799439012/status', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'shortlisted'
  })
});
```

### Getting Applicants by Status
```javascript
const response = await fetch('/api/v1/career-posts/applicants-by-status/pending');
const data = await response.json();
```

---

## Application Workflow

### 1. Create Career Post
- Admin creates a career post with `isActive: true`
- Post becomes visible to potential applicants

### 2. Applicant Applies
- Applicant submits application via `/apply/:id` endpoint
- System checks for duplicate applications (by email)
- Application is added with `status: 'pending'`

### 3. Review Applications
- Admin can view all applicants via `/applicants/:id`
- Admin can update applicant status through the hiring process

### 4. Status Management
- **pending**: Initial status when application is submitted
- **reviewed**: Application has been reviewed by HR/recruiter
- **shortlisted**: Applicant is shortlisted for interview
- **rejected**: Application is rejected
- **hired**: Applicant is hired for the position

### 5. Deactivate Post
- When position is filled or no longer accepting applications
- Set `isActive: false` to prevent new applications

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. Email addresses are used to prevent duplicate applications
3. Only active career posts accept new applications
4. Applicant status follows a logical progression through the hiring process
5. All responses include a `success` boolean field
6. Error responses include appropriate HTTP status codes
7. The `requirements` field is an array of strings
8. Search functionality is case-insensitive
9. Place search uses partial matching (regex)
10. Only active career posts are returned by public endpoints 