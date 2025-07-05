# Mentor API Documentation

## Overview
This document describes the API endpoints for managing mentors in the system. The mentor API provides comprehensive CRUD operations, search functionality, filtering, and statistics.

---

## Base URL
```
/api/mentor
```

---

## 1. Create Mentor

**Endpoint:**
```
POST /api/mentor/create
```

**Description:**
Creates a new mentor in the system.

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "Senior Software Engineer",
  "description": "Experienced software engineer with 10+ years in web development",
  "image": "https://example.com/mentor-image.jpg",
  "tags": ["JavaScript", "React", "Node.js", "MongoDB"]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Mentor created successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "name": "John Doe",
    "role": "Senior Software Engineer",
    "description": "Experienced software engineer with 10+ years in web development",
    "image": "https://example.com/mentor-image.jpg",
    "tags": ["JavaScript", "React", "Node.js", "MongoDB"],
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T12:00:00.000Z"
  }
}
```

---

## 2. Get All Mentors

**Endpoint:**
```
GET /api/mentor/all
```

**Description:**
Retrieves all mentors with pagination and filtering options.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in name, description, or role
- `role` (optional): Filter by specific role
- `tags` (optional): Filter by tags (comma-separated)

**Example Request:**
```
GET /api/mentor/all?page=1&limit=5&search=software&role=engineer&tags=JavaScript,React
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentors retrieved successfully",
  "data": {
    "mentors": [
      {
        "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
        "name": "John Doe",
        "role": "Senior Software Engineer",
        "description": "Experienced software engineer...",
        "image": "https://example.com/mentor-image.jpg",
        "tags": ["JavaScript", "React", "Node.js"],
        "createdAt": "2024-06-12T12:00:00.000Z",
        "updatedAt": "2024-06-12T12:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalMentors": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 3. Get Mentor by ID

**Endpoint:**
```
GET /api/mentor/:id
```

**Description:**
Retrieves a specific mentor by their ID.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor retrieved successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "name": "John Doe",
    "role": "Senior Software Engineer",
    "description": "Experienced software engineer...",
    "image": "https://example.com/mentor-image.jpg",
    "tags": ["JavaScript", "React", "Node.js"],
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T12:00:00.000Z"
  }
}
```

---

## 4. Update Mentor

**Endpoint:**
```
PUT /api/mentor/:id
```

**Description:**
Updates an existing mentor's information.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "role": "Lead Software Engineer",
  "description": "Updated description...",
  "tags": ["JavaScript", "React", "Node.js", "TypeScript"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor updated successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "name": "John Doe Updated",
    "role": "Lead Software Engineer",
    "description": "Updated description...",
    "image": "https://example.com/mentor-image.jpg",
    "tags": ["JavaScript", "React", "Node.js", "TypeScript"],
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T13:00:00.000Z"
  }
}
```

---

## 5. Delete Mentor

**Endpoint:**
```
DELETE /api/mentor/:id
```

**Description:**
Deletes a mentor from the system.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor deleted successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "name": "John Doe",
    "role": "Senior Software Engineer",
    "description": "Experienced software engineer...",
    "image": "https://example.com/mentor-image.jpg",
    "tags": ["JavaScript", "React", "Node.js"],
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T12:00:00.000Z"
  }
}
```

---

## 6. Get Mentors by Role

**Endpoint:**
```
GET /api/mentor/role/:role
```

**Description:**
Retrieves all mentors with a specific role.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/mentor/role/Software%20Engineer?page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentors by role retrieved successfully",
  "data": {
    "mentors": [...],
    "role": "Software Engineer",
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalMentors": 25,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 7. Get Mentors by Tags

**Endpoint:**
```
GET /api/mentor/tags/:tags
```

**Description:**
Retrieves all mentors with specific tags.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/mentor/tags/JavaScript,React?page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentors by tags retrieved successfully",
  "data": {
    "mentors": [...],
    "tags": ["JavaScript", "React"],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalMentors": 15,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 8. Search Mentors

**Endpoint:**
```
GET /api/mentor/search
```

**Description:**
Searches mentors by name, description, role, or tags.

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/mentor/search?q=JavaScript&page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor search completed successfully",
  "data": {
    "mentors": [...],
    "searchQuery": "JavaScript",
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalMentors": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 9. Get All Roles

**Endpoint:**
```
GET /api/mentor/roles/all
```

**Description:**
Retrieves all unique mentor roles.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor roles retrieved successfully",
  "data": {
    "roles": [
      "Software Engineer",
      "UI/UX Designer",
      "Data Scientist",
      "Product Manager",
      "DevOps Engineer"
    ]
  }
}
```

---

## 10. Get All Tags

**Endpoint:**
```
GET /api/mentor/tags/all
```

**Description:**
Retrieves all unique mentor tags.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor tags retrieved successfully",
  "data": {
    "tags": [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Machine Learning",
      "UI/UX",
      "DevOps"
    ]
  }
}
```

---

## 11. Bulk Create Mentors

**Endpoint:**
```
POST /api/mentor/bulk/create
```

**Description:**
Creates multiple mentors at once.

**Request Body:**
```json
{
  "mentors": [
    {
      "name": "John Doe",
      "role": "Senior Software Engineer",
      "description": "Experienced software engineer...",
      "image": "https://example.com/mentor1.jpg",
      "tags": ["JavaScript", "React", "Node.js"]
    },
    {
      "name": "Jane Smith",
      "role": "UI/UX Designer",
      "description": "Creative designer with 8+ years...",
      "image": "https://example.com/mentor2.jpg",
      "tags": ["UI/UX", "Figma", "Adobe Creative Suite"]
    }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Mentors created successfully",
  "data": {
    "count": 2,
    "mentors": [...]
  }
}
```

---

## 12. Update Mentor Image

**Endpoint:**
```
PATCH /api/mentor/:id/image
```

**Description:**
Updates only the image of a mentor.

**Request Body:**
```json
{
  "image": "https://example.com/new-mentor-image.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor image updated successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "name": "John Doe",
    "role": "Senior Software Engineer",
    "description": "Experienced software engineer...",
    "image": "https://example.com/new-mentor-image.jpg",
    "tags": ["JavaScript", "React", "Node.js"],
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T14:00:00.000Z"
  }
}
```

---

## 13. Get Mentor Statistics

**Endpoint:**
```
GET /api/mentor/stats/overview
```

**Description:**
Retrieves comprehensive statistics about mentors.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mentor statistics retrieved successfully",
  "data": {
    "totalMentors": 50,
    "uniqueRoles": 8,
    "uniqueTags": 25,
    "mentorsByRole": [
      {
        "_id": "Software Engineer",
        "count": 20
      },
      {
        "_id": "UI/UX Designer",
        "count": 15
      }
    ],
    "topTags": [
      {
        "_id": "JavaScript",
        "count": 25
      },
      {
        "_id": "React",
        "count": 20
      }
    ]
  }
}
```

---

## Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": {
    "code": 400,
    "type": "VALIDATION",
    "message": "Invalid ID format"
  }
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "type": "MENTOR",
    "message": "Mentor not found"
  }
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": {
    "code": 500,
    "type": "SERVER",
    "message": "Internal server error"
  }
}
```

---

## Schema Reference

**Mentor Schema:**
```javascript
{
  name: String (required),
  role: String (required),
  description: String (required),
  image: String (required),
  tags: [String] (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Notes

- All endpoints support pagination with `page` and `limit` query parameters
- Search is case-insensitive
- Tags can be filtered using comma-separated values
- Image URLs should be valid URLs pointing to image files
- All timestamps are in ISO 8601 format
- The API uses MongoDB ObjectId for IDs 