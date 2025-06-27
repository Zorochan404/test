# Free Courses API Summary

## Quick Reference

### Base URL
```
http://localhost:5000/api/v1/free-courses
```

## Main CRUD Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new free course |
| GET | `/` | Get all free courses |
| GET | `/active` | Get only active free courses |
| GET | `/:id` | Get free course by ID |
| PUT | `/:id` | Update free course |
| PUT | `/:id/toggle-status` | Toggle course active status |
| DELETE | `/:id` | Delete free course |

## Sub-Resource Endpoints

### Course Details Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/:courseId/details` | Add course detail |
| PUT | `/:courseId/details/:detailId` | Update course detail |
| DELETE | `/:courseId/details/:detailId` | Delete course detail |

### Learning Objectives Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/:courseId/what-you-will-learn` | Add learning objective |
| PUT | `/:courseId/what-you-will-learn/:index` | Update learning objective |
| DELETE | `/:courseId/what-you-will-learn/:index` | Delete learning objective |

### Course Benefits Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/:courseId/course-benefits` | Add course benefit |
| PUT | `/:courseId/course-benefits/:index` | Update course benefit |
| DELETE | `/:courseId/course-benefits/:index` | Delete course benefit |

## Request/Response Format

### Create Course Request
```json
{
  "name": "Course Name",
  "shortDescription": "Brief description",
  "details": [
    {
      "duration": 8,
      "mode": "Online",
      "certificate": "Yes",
      "level": "Beginner"
    }
  ],
  "whyLearnThisCourse": "Reasons to learn",
  "whatYouWillLearn": ["Objective 1", "Objective 2"],
  "careerOpportunities": "Career prospects",
  "courseBenefits": ["Benefit 1", "Benefit 2"],
  "imageUrl": "https://example.com/image.jpg",
  "metaTitle": "SEO title",
  "metaDescription": "SEO description",
  "metaKeywords": "SEO keywords"
}
```

### Standard Response Format
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional message"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

## Key Features

- ✅ Full CRUD operations for free courses
- ✅ Sub-resource management (details, learning objectives, benefits)
- ✅ Active/inactive status management
- ✅ SEO metadata support
- ✅ Consistent error handling
- ✅ Array-based learning objectives and benefits
- ✅ Nested details schema with duration, mode, certificate, and level
- ✅ Timestamps for creation and updates

## Testing

Run the comprehensive test suite:
```bash
node scripts/testFreeCoursesAPI.js
```

## Files Created

1. **Controller**: `controllers/freecoursesController.js`
2. **Routes**: `routes/freecourses.routes.js`
3. **Test Script**: `scripts/testFreeCoursesAPI.js`
4. **Documentation**: `docs/FREE_COURSES_API_DOCUMENTATION.md`
5. **Summary**: `docs/FREE_COURSES_API_SUMMARY.md`

## Integration

The free courses API is integrated into the main application at:
- Route registration: `app.js` (line 58)
- Base path: `/api/v1/free-courses`

## Usage Examples

### Create a Free Course
```javascript
const response = await fetch('/api/v1/free-courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(courseData)
});
```

### Get Active Courses
```javascript
const response = await fetch('/api/v1/free-courses/active');
const { data: courses } = await response.json();
```

### Add Learning Objective
```javascript
const response = await fetch(`/api/v1/free-courses/${courseId}/what-you-will-learn`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ item: "New learning objective" })
});
``` 