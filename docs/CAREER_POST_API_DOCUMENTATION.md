# Career Post API Documentation

## Overview
The Career Post API provides endpoints for managing job postings and career opportunities. This API allows you to create, read, update, and delete career posts, as well as filter and search through them.

## Base URL
```
http://localhost:5000/api/v1/career-posts
```

## Data Model

### Career Post Schema
```javascript
{
  title: String (required),
  place: String (required),
  description: String (required),
  requirements: [String] (required),
  partTime: Boolean (required),
  isActive: Boolean (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Field Descriptions
- **title**: The job title/position name
- **place**: The location where the job is based
- **description**: Detailed description of the job role and responsibilities
- **requirements**: Array of required qualifications and skills
- **partTime**: Boolean indicating if the position is part-time (true) or full-time (false)
- **isActive**: Boolean indicating if the career post is currently active and visible
- **createdAt**: Timestamp when the career post was created
- **updatedAt**: Timestamp when the career post was last updated

---

## Endpoints

### 1. Create Career Post
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
    "requirements": [
      "Bachelor's degree in Computer Science",
      "3+ years of experience with JavaScript",
      "Experience with React and Node.js"
    ],
    "partTime": false,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get All Career Posts (Admin)
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
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Active Career Posts (Public)
**GET** `/getcareerposts`

Retrieves only active career posts for public display.

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
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 4. Get Career Post by ID
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
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Error Response (404)
```json
{
  "success": false,
  "message": "Career post not found"
}
```

---

### 5. Update Career Post
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

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Senior Software Developer",
    "place": "New York, NY",
    "description": "Updated description for senior position",
    "requirements": [...],
    "partTime": false,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

---

### 6. Delete Career Post
**DELETE** `/deletecareerpost/:id`

Permanently deletes a career post.

#### Parameters
- `id` (string, required): The career post ID

#### Response
```json
{
  "success": true,
  "message": "Career post deleted successfully"
}
```

---

### 7. Get Active Career Posts
**GET** `/getactivecareerposts`

Retrieves only active career posts (same as `/getcareerposts`).

---

### 8. Get Inactive Career Posts
**GET** `/getinactivecareerposts`

Retrieves only inactive career posts.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Sales Representative",
      "place": "Boston, MA",
      "description": "Join our sales team...",
      "requirements": [...],
      "partTime": false,
      "isActive": false,
      "createdAt": "2024-01-10T09:15:00.000Z",
      "updatedAt": "2024-01-10T09:15:00.000Z"
    }
  ]
}
```

---

### 9. Get Career Posts by Type
**GET** `/getcareerpostsbytype/:type`

Retrieves career posts filtered by employment type.

#### Parameters
- `type` (string, required): Either "fulltime" or "parttime"

#### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Marketing Intern",
      "place": "Remote",
      "description": "Join our marketing team as an intern...",
      "requirements": [...],
      "partTime": true,
      "isActive": true,
      "createdAt": "2024-01-12T14:20:00.000Z",
      "updatedAt": "2024-01-12T14:20:00.000Z"
    }
  ]
}
```

#### Error Response (400)
```json
{
  "success": false,
  "message": "Invalid type. Must be 'fulltime' or 'parttime'"
}
```

---

### 10. Get Career Posts by Place
**GET** `/getcareerpostsbyplace/:place`

Retrieves career posts filtered by location (case-insensitive search).

#### Parameters
- `place` (string, required): The location to search for

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
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 11. Search Career Posts
**GET** `/searchcareerposts?query=searchterm`

Searches through active career posts by title, place, or description.

#### Query Parameters
- `query` (string, required): The search term

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
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Error Response (400)
```json
{
  "success": false,
  "message": "Search query is required"
}
```

---

### 12. Toggle Career Post Status
**PUT** `/togglecareerpoststatus/:id`

Toggles the active status of a career post (active ↔ inactive).

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
    "isActive": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  },
  "message": "Career post deactivated successfully"
}
```

---

### 13. Activate Career Post
**PUT** `/activatecareerpost/:id`

Activates a career post (sets isActive to true).

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
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:30:00.000Z"
  },
  "message": "Career post activated successfully"
}
```

---

### 14. Deactivate Career Post
**PUT** `/deactivatecareerpost/:id`

Deactivates a career post (sets isActive to false).

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
    "isActive": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T13:00:00.000Z"
  },
  "message": "Career post deactivated successfully"
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
  "message": "Invalid type. Must be 'fulltime' or 'parttime'"
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

### Creating a Career Post
```javascript
const response = await fetch('/api/v1/career-posts/addcareerpost', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Frontend Developer",
    place: "San Francisco, CA",
    description: "We are looking for a skilled frontend developer...",
    requirements: [
      "3+ years of experience with React",
      "Strong CSS and JavaScript skills",
      "Experience with modern build tools"
    ],
    partTime: false,
    isActive: true
  })
});
```

### Searching for Career Posts
```javascript
const response = await fetch('/api/v1/career-posts/searchcareerposts?query=developer');
const data = await response.json();
```

### Getting Part-time Positions
```javascript
const response = await fetch('/api/v1/career-posts/getcareerpostsbytype/parttime');
const data = await response.json();
```

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. The `requirements` field is an array of strings
3. Search functionality is case-insensitive
4. Place search uses partial matching (regex)
5. Only active career posts are returned by public endpoints
6. Admin endpoints can access both active and inactive posts
7. All responses include a `success` boolean field
8. Error responses include appropriate HTTP status codes 