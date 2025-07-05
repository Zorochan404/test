# News API Documentation

## Overview
This document describes the API endpoints for managing news articles in the system. The news API provides comprehensive CRUD operations, search functionality, filtering by type, subType, tags, and date ranges, along with statistics and analytics.

---

## Base URL
```
/api/v1/news
```

---

## 1. Create News Article

**Endpoint:**
```
POST /api/v1/news/create
```

**Description:**
Creates a new news article in the system.

**Request Body:**
```json
{
  "title": "New Technology Breakthrough",
  "type": "Technology",
  "subType": "Innovation",
  "description": "A revolutionary breakthrough in artificial intelligence technology that promises to transform various industries.",
  "pointdetails": [
    "Advanced machine learning algorithms",
    "Improved accuracy by 40%",
    "Reduced processing time by 60%",
    "Enhanced user experience"
  ],
  "image": "https://example.com/news-images/tech-breakthrough.jpg",
  "date": "2024-06-12T10:00:00.000Z",
  "time": "10:00 AM",
  "tags": ["AI", "Machine Learning", "Technology", "Innovation"],
  "isActive": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "News article created successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "title": "New Technology Breakthrough",
    "type": "Technology",
    "subType": "Innovation",
    "description": "A revolutionary breakthrough in artificial intelligence technology...",
    "pointdetails": [
      "Advanced machine learning algorithms",
      "Improved accuracy by 40%",
      "Reduced processing time by 60%",
      "Enhanced user experience"
    ],
    "image": "https://example.com/news-images/tech-breakthrough.jpg",
    "date": "2024-06-12T10:00:00.000Z",
    "time": "10:00 AM",
    "tags": ["AI", "Machine Learning", "Technology", "Innovation"],
    "isActive": true,
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T12:00:00.000Z"
  }
}
```

---

## 2. Get All News Articles

**Endpoint:**
```
GET /api/v1/news/all
```

**Description:**
Retrieves all news articles with pagination, filtering, and sorting options.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in title, description, type, or subType
- `type` (optional): Filter by specific type
- `subType` (optional): Filter by specific subType
- `tags` (optional): Filter by tags (comma-separated)
- `isActive` (optional): Filter by active status (`true` or `false`)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

**Example Request:**
```
GET /api/v1/news/all?page=1&limit=5&search=technology&type=Technology&tags=AI,Innovation&isActive=true&sortBy=date&sortOrder=desc
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News articles retrieved successfully",
  "data": {
    "news": [
      {
        "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
        "title": "New Technology Breakthrough",
        "type": "Technology",
        "subType": "Innovation",
        "description": "A revolutionary breakthrough...",
        "pointdetails": [...],
        "image": "https://example.com/news-images/tech-breakthrough.jpg",
        "date": "2024-06-12T10:00:00.000Z",
        "time": "10:00 AM",
        "tags": ["AI", "Machine Learning", "Technology", "Innovation"],
        "isActive": true,
        "createdAt": "2024-06-12T12:00:00.000Z",
        "updatedAt": "2024-06-12T12:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalNews": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 3. Get News Article by ID

**Endpoint:**
```
GET /api/v1/news/:id
```

**Description:**
Retrieves a specific news article by its ID.

**Success Response (200):**
```json
{
  "success": true,
  "message": "News article retrieved successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "title": "New Technology Breakthrough",
    "type": "Technology",
    "subType": "Innovation",
    "description": "A revolutionary breakthrough...",
    "pointdetails": [...],
    "image": "https://example.com/news-images/tech-breakthrough.jpg",
    "date": "2024-06-12T10:00:00.000Z",
    "time": "10:00 AM",
    "tags": ["AI", "Machine Learning", "Technology", "Innovation"],
    "isActive": true,
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T12:00:00.000Z"
  }
}
```

---

## 4. Update News Article

**Endpoint:**
```
PUT /api/v1/news/:id
```

**Description:**
Updates an existing news article's information.

**Request Body:**
```json
{
  "title": "Updated Technology Breakthrough",
  "type": "Technology",
  "subType": "AI Innovation",
  "description": "Updated description with more details...",
  "pointdetails": [
    "Advanced machine learning algorithms",
    "Improved accuracy by 50%",
    "Reduced processing time by 70%",
    "Enhanced user experience",
    "New feature added"
  ],
  "tags": ["AI", "Machine Learning", "Technology", "Innovation", "Deep Learning"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News article updated successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "title": "Updated Technology Breakthrough",
    "type": "Technology",
    "subType": "AI Innovation",
    "description": "Updated description with more details...",
    "pointdetails": [...],
    "image": "https://example.com/news-images/tech-breakthrough.jpg",
    "date": "2024-06-12T10:00:00.000Z",
    "time": "10:00 AM",
    "tags": ["AI", "Machine Learning", "Technology", "Innovation", "Deep Learning"],
    "isActive": true,
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T13:00:00.000Z"
  }
}
```

---

## 5. Delete News Article

**Endpoint:**
```
DELETE /api/v1/news/:id
```

**Description:**
Deletes a news article from the system.

**Success Response (200):**
```json
{
  "success": true,
  "message": "News article deleted successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "title": "New Technology Breakthrough",
    "type": "Technology",
    "subType": "Innovation",
    "description": "A revolutionary breakthrough...",
    "pointdetails": [...],
    "image": "https://example.com/news-images/tech-breakthrough.jpg",
    "date": "2024-06-12T10:00:00.000Z",
    "time": "10:00 AM",
    "tags": ["AI", "Machine Learning", "Technology", "Innovation"],
    "isActive": true,
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T12:00:00.000Z"
  }
}
```

---

## 6. Get News by Type

**Endpoint:**
```
GET /api/v1/news/type/:type
```

**Description:**
Retrieves all news articles with a specific type.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

**Example Request:**
```
GET /api/v1/news/type/Technology?page=1&limit=5&sortBy=date&sortOrder=desc
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News by type retrieved successfully",
  "data": {
    "news": [...],
    "type": "Technology",
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalNews": 25,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 7. Get News by SubType

**Endpoint:**
```
GET /api/v1/news/subtype/:subType
```

**Description:**
Retrieves all news articles with a specific subType.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

**Example Request:**
```
GET /api/v1/news/subtype/Innovation?page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News by subType retrieved successfully",
  "data": {
    "news": [...],
    "subType": "Innovation",
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalNews": 15,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 8. Get News by Tags

**Endpoint:**
```
GET /api/v1/news/tags/:tags
```

**Description:**
Retrieves all news articles with specific tags.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

**Example Request:**
```
GET /api/v1/news/tags/AI,Technology?page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News by tags retrieved successfully",
  "data": {
    "news": [...],
    "tags": ["AI", "Technology"],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalNews": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 9. Get News by Date Range

**Endpoint:**
```
GET /api/v1/news/date-range
```

**Description:**
Retrieves news articles within a specific date range.

**Query Parameters:**
- `startDate` (required): Start date (ISO format)
- `endDate` (required): End date (ISO format)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

**Example Request:**
```
GET /api/v1/news/date-range?startDate=2024-06-01&endDate=2024-06-30&page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News by date range retrieved successfully",
  "data": {
    "news": [...],
    "dateRange": {
      "startDate": "2024-06-01",
      "endDate": "2024-06-30"
    },
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalNews": 25,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 10. Get Latest News

**Endpoint:**
```
GET /api/v1/news/latest
```

**Description:**
Retrieves the most recent news articles.

**Query Parameters:**
- `limit` (optional): Number of articles to retrieve (default: 5)

**Example Request:**
```
GET /api/v1/news/latest?limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Latest news retrieved successfully",
  "data": {
    "news": [...],
    "count": 10
  }
}
```

---

## 11. Get All Types

**Endpoint:**
```
GET /api/v1/news/types/all
```

**Description:**
Retrieves all unique news types.

**Success Response (200):**
```json
{
  "success": true,
  "message": "News types retrieved successfully",
  "data": {
    "types": [
      "Technology",
      "Education",
      "Business",
      "Sports",
      "Entertainment",
      "Health"
    ]
  }
}
```

---

## 12. Get All SubTypes

**Endpoint:**
```
GET /api/v1/news/subtypes/all
```

**Description:**
Retrieves all unique news subTypes.

**Success Response (200):**
```json
{
  "success": true,
  "message": "News subTypes retrieved successfully",
  "data": {
    "subTypes": [
      "Innovation",
      "Research",
      "Startup",
      "Football",
      "Movies",
      "Medical"
    ]
  }
}
```

---

## 13. Get All Tags

**Endpoint:**
```
GET /api/v1/news/tags/all
```

**Description:**
Retrieves all unique news tags.

**Success Response (200):**
```json
{
  "success": true,
  "message": "News tags retrieved successfully",
  "data": {
    "tags": [
      "AI",
      "Technology",
      "Innovation",
      "Education",
      "Business",
      "Sports",
      "Health",
      "Entertainment"
    ]
  }
}
```

---

## 14. Search News

**Endpoint:**
```
GET /api/v1/news/search
```

**Description:**
Searches news articles by title, description, type, subType, or tags.

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

**Example Request:**
```
GET /api/v1/news/search?q=technology&page=1&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News search completed successfully",
  "data": {
    "news": [...],
    "searchQuery": "technology",
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalNews": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 15. Bulk Create News

**Endpoint:**
```
POST /api/v1/news/bulk/create
```

**Description:**
Creates multiple news articles at once.

**Request Body:**
```json
{
  "news": [
    {
      "title": "First News Article",
      "type": "Technology",
      "subType": "Innovation",
      "description": "First article description...",
      "pointdetails": ["Point 1", "Point 2"],
      "image": "https://example.com/news1.jpg",
      "date": "2024-06-12T10:00:00.000Z",
      "time": "10:00 AM",
      "tags": ["Technology", "Innovation"]
    },
    {
      "title": "Second News Article",
      "type": "Education",
      "subType": "Research",
      "description": "Second article description...",
      "pointdetails": ["Point 1", "Point 2"],
      "image": "https://example.com/news2.jpg",
      "date": "2024-06-12T11:00:00.000Z",
      "time": "11:00 AM",
      "tags": ["Education", "Research"]
    }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "News articles created successfully",
  "data": {
    "count": 2,
    "news": [...]
  }
}
```

---

## 16. Update News Image

**Endpoint:**
```
PATCH /api/v1/news/:id/image
```

**Description:**
Updates only the image of a news article.

**Request Body:**
```json
{
  "image": "https://example.com/new-news-image.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "News image updated successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "title": "New Technology Breakthrough",
    "type": "Technology",
    "subType": "Innovation",
    "description": "A revolutionary breakthrough...",
    "pointdetails": [...],
    "image": "https://example.com/new-news-image.jpg",
    "date": "2024-06-12T10:00:00.000Z",
    "time": "10:00 AM",
    "tags": ["AI", "Machine Learning", "Technology", "Innovation"],
    "isActive": true,
    "createdAt": "2024-06-12T12:00:00.000Z",
    "updatedAt": "2024-06-12T14:00:00.000Z"
  }
}
```

---

## 17. Get News Statistics

**Endpoint:**
```
GET /api/v1/news/stats/overview
```

**Description:**
Retrieves comprehensive statistics about news articles.

**Success Response (200):**
```json
{
  "success": true,
  "message": "News statistics retrieved successfully",
  "data": {
    "totalNews": 150,
    "uniqueTypes": 8,
    "uniqueSubTypes": 25,
    "uniqueTags": 50,
    "newsByType": [
      {
        "_id": "Technology",
        "count": 45
      },
      {
        "_id": "Education",
        "count": 30
      }
    ],
    "newsBySubType": [
      {
        "_id": "Innovation",
        "count": 20
      },
      {
        "_id": "Research",
        "count": 15
      }
    ],
    "topTags": [
      {
        "_id": "Technology",
        "count": 45
      },
      {
        "_id": "AI",
        "count": 30
      }
    ],
    "newsByMonth": [
      {
        "_id": {
          "year": 2024,
          "month": 6
        },
        "count": 25
      }
    ],
    "activeNews": 120,
    "inactiveNews": 30,
    "newsByStatus": [
      { "_id": true, "count": 120 },
      { "_id": false, "count": 30 }
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
    "type": "NEWS",
    "message": "News article not found"
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

**News Schema:**
```javascript
{
  title: String (required),
  type: String (required),
  subType: String (required),
  description: String (required),
  pointdetails: [String] (required),
  image: String (required),
  date: Date (required),
  time: String (required),
  tags: [String] (required),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Notes

- All endpoints support pagination with `page` and `limit` query parameters
- Search is case-insensitive
- Tags can be filtered using comma-separated values
- Date ranges should be provided in ISO format
- Image URLs should be valid URLs pointing to image files
- All timestamps are in ISO 8601 format
- The API uses MongoDB ObjectId for IDs
- Sorting is available on any field with `sortBy` and `sortOrder` parameters

## 18. Toggle News Status

**Endpoint:**
```
PATCH /api/v1/news/:id/toggle-status
```

**Description:**
Toggles the `isActive` status of a news article (activate/deactivate).

**Success Response (200):**
```json
{
  "success": true,
  "message": "News article deactivated successfully",
  "data": {
    "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
    "isActive": false,
    // ... other fields ...
  }
}
```

---

## 19. Get Active News Articles

**Endpoint:**
```
GET /api/v1/news/active
```

**Description:**
Retrieves all active news articles.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

---

## 20. Get Inactive News Articles

**Endpoint:**
```
GET /api/v1/news/inactive
```

**Description:**
Retrieves all inactive news articles.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: 'date')
- `sortOrder` (optional): Sort order - 'asc' or 'desc' (default: 'desc')

--- 