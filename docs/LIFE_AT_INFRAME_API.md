# Life at Inframe API Documentation

## Overview

The Life at Inframe API provides comprehensive CRUD operations for managing campus life content including sections, student services, clubs, events, gallery images, and sports facilities.

## Base URL: `/api/v1`

## Models Overview

### 1. LifeAtInframeSection
Main sections for organizing campus life content.

**Schema:**
```javascript
{
  sectionType: 'hero' | 'welcome' | 'services' | 'clubs' | 'sports' | 'events' | 'gallery' | 'tour',
  title: String (required, 2-200 chars),
  description: String (max 1000 chars),
  content: String (max 5000 chars),
  images: [String],
  order: Number (required, min 0),
  isActive: Boolean (default: true)
}
```

### 2. StudentService
Services available to students.

**Schema:**
```javascript
{
  title: String (required, 2-100 chars),
  description: String (required, 2-1000 chars),
  icon: String,
  order: Number (required, min 0)
}
```

### 3. StudentClub
Student clubs and organizations.

**Schema:**
```javascript
{
  name: String (required, 2-100 chars),
  category: 'arts' | 'sports' | 'academic' | 'cultural',
  description: String (required, 2-1000 chars),
  image: String,
  order: Number (required, min 0)
}
```

### 4. CampusEvent
Campus events and activities.

**Schema:**
```javascript
{
  title: String (required, 2-200 chars),
  description: String (required, 2-1000 chars),
  category: 'arts-culture' | 'sports-recreation' | 'organizations',
  image: String,
  order: Number (required, min 0)
}
```

### 5. GalleryImage
Campus gallery images.

**Schema:**
```javascript
{
  title: String (required, 2-100 chars),
  imageUrl: String (required),
  category: String (required, 2-50 chars),
  order: Number (required, min 0)
}
```

### 6. SportsFacility
Sports facilities and amenities.

**Schema:**
```javascript
{
  name: String (required, 2-100 chars),
  description: String (max 1000 chars),
  image: String (required),
  category: String (max 50 chars)
}
```

## API Endpoints

### Life at Inframe Sections (`/lifeatinframesection`)

- **POST** `/addlifeatinframesection` - Create section
- **GET** `/getlifeatinframesections` - Get all sections (ordered)
- **GET** `/getlifeatinframesectionbyid/:id` - Get section by ID
- **GET** `/getlifeatinframesectionsbytype/:type` - Get sections by type
- **GET** `/getactivelifeatinframesections` - Get active sections only
- **PUT** `/updatelifeatinframesection/:id` - Update section
- **DELETE** `/deletelifeatinframesection/:id` - Delete section

### Student Services (`/studentservice`)

- **POST** `/addstudentservice` - Create service
- **GET** `/getstudentservices` - Get all services (ordered)
- **GET** `/getstudentservicebyid/:id` - Get service by ID
- **PUT** `/updatestudentservice/:id` - Update service
- **DELETE** `/deletestudentservice/:id` - Delete service

### Student Clubs (`/studentclub`)

- **POST** `/addstudentclub` - Create club
- **GET** `/getstudentclubs` - Get all clubs (ordered)
- **GET** `/getstudentclubbyid/:id` - Get club by ID
- **GET** `/getstudentclubsbycategory/:category` - Get clubs by category
- **PUT** `/updatestudentclub/:id` - Update club
- **DELETE** `/deletestudentclub/:id` - Delete club

### Campus Events (`/campusevent`)

- **POST** `/addcampusevent` - Create event
- **GET** `/getcampusevents` - Get all events (ordered)
- **GET** `/getcampuseventbyid/:id` - Get event by ID
- **GET** `/getcampuseventsbycategory/:category` - Get events by category
- **PUT** `/updatecampusevent/:id` - Update event
- **DELETE** `/deletecampusevent/:id` - Delete event

### Gallery Images (`/galleryimage`)

- **POST** `/addgalleryimage` - Create gallery image
- **GET** `/getgalleryimages` - Get all images (ordered)
- **GET** `/getgalleryimagebyid/:id` - Get image by ID
- **GET** `/getgalleryimagesbycategory/:category` - Get images by category
- **PUT** `/updategalleryimage/:id` - Update image
- **DELETE** `/deletegalleryimage/:id` - Delete image

### Sports Facilities (`/sportsfacility`)

- **POST** `/addsportsfacility` - Create facility
- **GET** `/getsportsfacilities` - Get all facilities
- **GET** `/getsportsfacilitybyid/:id` - Get facility by ID
- **GET** `/getsportsfacilitiesbycategory/:category` - Get facilities by category
- **PUT** `/updatesportsfacility/:id` - Update facility
- **DELETE** `/deletesportsfacility/:id` - Delete facility

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...} // Object for single item, Array for multiple items
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Usage Examples

### Create a Life at Inframe Section
```bash
curl -X POST http://localhost:5500/api/v1/lifeatinframesection/addlifeatinframesection \
  -H "Content-Type: application/json" \
  -d '{
    "sectionType": "hero",
    "title": "Welcome to Campus Life",
    "description": "Experience the vibrant community at Inframe",
    "content": "Detailed content about campus life...",
    "images": ["hero1.jpg", "hero2.jpg"],
    "order": 1,
    "isActive": true
  }'
```

### Get All Student Services
```bash
curl http://localhost:5500/api/v1/studentservice/getstudentservices
```

### Get Student Clubs by Category
```bash
curl http://localhost:5500/api/v1/studentclub/getstudentclubsbycategory/arts
```

### Create a Campus Event
```bash
curl -X POST http://localhost:5500/api/v1/campusevent/addcampusevent \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spring Festival",
    "description": "Annual spring celebration with music and food",
    "category": "arts-culture",
    "image": "spring-festival.jpg",
    "order": 1
  }'
```

## Frontend Integration

### List View with Details Page Pattern

```javascript
// Get all sections for list view
const response = await fetch('/api/v1/lifeatinframesection/getlifeatinframesections');
const data = await response.json();

if (data.success) {
  // Display list with title and description
  data.data.forEach(section => {
    console.log(`${section.title} - ${section.description}`);
  });
}

// Get section details when clicked
const sectionId = 'section_id_here';
const detailResponse = await fetch(`/api/v1/lifeatinframesection/getlifeatinframesectionbyid/${sectionId}`);
const detailData = await detailResponse.json();

if (detailData.success) {
  const section = detailData.data;
  // Display full section details including content and images
}
```

## Setup and Testing

### 1. Start Server
```bash
npm run dev
```

### 2. Seed Sample Data
```bash
node scripts/seedLifeAtInframeData.js
```

### 3. Test Endpoints
Use the curl examples above or tools like Postman to test the API endpoints.

## File Structure

```
models/
├── lifeAtInframeSection.js
├── studentService.js
├── studentClub.js
├── campusEvent.js
├── galleryImage.js
└── sportsFacility.js

controllers/
├── lifeAtInframeSectionController.js
├── studentServiceController.js
├── studentClubController.js
├── campusEventController.js
├── galleryImageController.js
└── sportsFacilityController.js

routes/
├── lifeAtInframeSection.routes.js
├── studentService.routes.js
├── studentClub.routes.js
├── campusEvent.routes.js
├── galleryImage.routes.js
└── sportsFacility.routes.js

scripts/
└── seedLifeAtInframeData.js
```

## Validation Rules

- All string fields are trimmed automatically
- Required fields must be provided
- Enum fields must match specified values
- Order fields must be non-negative numbers
- Length constraints are enforced as specified in schemas
