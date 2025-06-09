# Downloads API Documentation

## Overview

The Downloads API provides comprehensive CRUD operations for managing downloadable files with features like download tracking, category organization, and status management.

## Base URL: `/api/v1/download`

## Database Schema

### Download Model (`models/download.js`)

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 1000
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  fileUrl: {
    type: String,
    required: true,
    trim: true
  },
  fileName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255
  },
  fileSize: {
    type: String,
    required: true,
    trim: true
  },
  uploadDate: {
    type: String,
    required: true,
    format: "YYYY-MM-DD"
  },
  downloadCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  timestamps: true (createdAt, updatedAt)
}
```

## API Endpoints

### 1. Create Download
- **POST** `/adddownload`
- **Description**: Creates a new download item
- **Request Body**:
```json
{
  "title": "Inframe School Brochure 2025",
  "description": "Complete information about our programs and facilities",
  "category": "Brochures",
  "fileUrl": "https://res.cloudinary.com/inframe/image/upload/v1234567890/brochure.pdf",
  "fileName": "inframe-brochure-2025.pdf",
  "fileSize": "3.2 MB",
  "uploadDate": "2025-02-28"
}
```

### 2. Get All Downloads
- **GET** `/getdownloads`
- **Description**: Retrieves all downloads (sorted by upload date, newest first)

### 3. Get Download by ID
- **GET** `/getdownloadbyid/:id`
- **Description**: Retrieves a specific download by ID

### 4. Get Downloads by Category
- **GET** `/getdownloadsbycategory/:category`
- **Description**: Retrieves all downloads in a specific category
- **Example**: `/getdownloadsbycategory/Brochures`

### 5. Get Active Downloads
- **GET** `/getactivedownloads`
- **Description**: Retrieves only active downloads

### 6. Get Popular Downloads
- **GET** `/getpopulardownloads`
- **Description**: Retrieves top 10 most downloaded files

### 7. Get Recent Downloads
- **GET** `/getrecentdownloads?limit=5`
- **Description**: Retrieves recent downloads (default limit: 5)

### 8. Update Download
- **PUT** `/updatedownload/:id`
- **Description**: Updates download information

### 9. Increment Download Count
- **PUT** `/incrementdownloadcount/:id`
- **Description**: Increments the download counter (call when file is downloaded)

### 10. Toggle Download Status
- **PUT** `/toggledownloadstatus/:id`
- **Description**: Toggles active/inactive status

### 11. Delete Download
- **DELETE** `/deletedownload/:id`
- **Description**: Removes a download record

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "_id": "download_id",
    "title": "Inframe School Brochure 2025",
    "description": "Complete information about our programs and facilities",
    "category": "Brochures",
    "fileUrl": "https://res.cloudinary.com/inframe/image/upload/v1234567890/brochure.pdf",
    "fileName": "inframe-brochure-2025.pdf",
    "fileSize": "3.2 MB",
    "uploadDate": "2025-02-28",
    "downloadCount": 245,
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
  "message": "Download not found"
}
```

## Usage Examples

### Frontend Downloads Page
```javascript
// Get all active downloads for public page
const response = await fetch('/api/v1/download/getactivedownloads');
const data = await response.json();

if (data.success) {
  data.data.forEach(download => {
    console.log(`${download.title} - ${download.category} - ${download.fileSize}`);
  });
}
```

### Download File with Counter
```javascript
// Handle file download and increment counter
const downloadFile = async (downloadId, fileUrl, fileName) => {
  try {
    // Increment download count
    await fetch(`/api/v1/download/incrementdownloadcount/${downloadId}`, {
      method: 'PUT'
    });
    
    // Trigger file download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

### Category Filtering
```javascript
// Get downloads by category
const getDownloadsByCategory = async (category) => {
  const response = await fetch(`/api/v1/download/getdownloadsbycategory/${category}`);
  const data = await response.json();
  
  if (data.success) {
    return data.data;
  }
  return [];
};
```

### Admin Dashboard
```javascript
// Get all downloads for admin management
const response = await fetch('/api/v1/download/getdownloads');
const data = await response.json();

// Toggle download status
const toggleStatus = async (downloadId) => {
  const response = await fetch(`/api/v1/download/toggledownloadstatus/${downloadId}`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};

// Get popular downloads for analytics
const popularResponse = await fetch('/api/v1/download/getpopulardownloads');
const popularData = await popularResponse.json();
```

### Using curl

```bash
# Get all downloads
curl http://localhost:5500/api/v1/download/getdownloads

# Get downloads by category
curl http://localhost:5500/api/v1/download/getdownloadsbycategory/Brochures

# Create new download
curl -X POST http://localhost:5500/api/v1/download/adddownload \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Document",
    "description": "Document description",
    "category": "Documents",
    "fileUrl": "https://example.com/file.pdf",
    "fileName": "document.pdf",
    "fileSize": "2.1 MB",
    "uploadDate": "2025-03-01"
  }'

# Increment download count
curl -X PUT http://localhost:5500/api/v1/download/incrementdownloadcount/DOWNLOAD_ID

# Toggle status
curl -X PUT http://localhost:5500/api/v1/download/toggledownloadstatus/DOWNLOAD_ID
```

## Features

### ✅ File Management
- Complete CRUD operations
- Category-based organization
- Active/inactive status control
- File metadata tracking

### ✅ Analytics & Tracking
- Download count tracking
- Popular downloads ranking
- Recent downloads listing
- Category-wise statistics

### ✅ Cloudinary Integration Ready
- File URL storage for Cloudinary
- Original filename preservation
- File size tracking
- Upload date management

### ✅ Admin Features
- Status management (active/inactive)
- Download analytics
- Category management
- Bulk operations support

## Setup and Testing

### 1. Start Server
```bash
npm run dev
```

### 2. Seed Sample Data
```bash
node scripts/seedDownloadData.js
```

### 3. Test Endpoints
Use the curl examples above or tools like Postman to test the API endpoints.

## File Structure

```
models/
└── download.js                    # Download schema definition

controllers/
└── downloadController.js          # Download CRUD operations

routes/
└── download.routes.js             # Download API routes

scripts/
└── seedDownloadData.js            # Sample data generator

docs/
└── DOWNLOAD_API_DOCUMENTATION.md  # This documentation
```

## Validation Rules

- **Title**: 2-200 characters, required
- **Description**: 10-1000 characters, required
- **Category**: 2-50 characters, required
- **File URL**: Required, valid URL
- **File Name**: 1-255 characters, required
- **File Size**: Required (e.g., "2.5 MB")
- **Upload Date**: Required, YYYY-MM-DD format
- **Download Count**: Non-negative number, default 0

## UI Integration

The API supports comprehensive download management:

1. **Public Downloads Page**: Use `/getactivedownloads` to display available files
2. **Category Filtering**: Use `/getdownloadsbycategory/:category` for organization
3. **Popular Downloads**: Use `/getpopulardownloads` for trending content
4. **Download Tracking**: Use `/incrementdownloadcount/:id` when files are downloaded
5. **Admin Management**: Use admin endpoints for content management

## Common Categories

Based on the sample data, common categories include:
- Brochures
- Application Forms
- Fee Information
- Scholarships
- Campus Information
- Academic Information
- Course Information
- Student Resources
- Industry Relations
- International Programs
