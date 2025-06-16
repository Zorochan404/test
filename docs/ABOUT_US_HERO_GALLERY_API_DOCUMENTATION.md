# About Us Hero Gallery API Documentation

## Overview

The About Us Hero Gallery API provides comprehensive CRUD operations for managing hero gallery images on the About Us page with features like image ordering, status management, and reordering capabilities.

## Base URL: `/api/v1/about-us/hero-images`

## Database Schema

### AboutUsHeroGallery Model (`models/aboutUsHeroGallery.js`)

```javascript
{
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  altText: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 200
  },
  order: {
    type: Number,
    required: true,
    min: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  timestamps: true (createdAt, updatedAt)
}
```

## API Endpoints

### 1. Create Hero Gallery Image

- **POST** `/addheroimage`
- **Description**: Creates a new hero gallery image
- **Request Body**:

```json
{
  "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  "altText": "Students collaborating in modern design studio",
  "order": 1
}
```

### 2. Get All Hero Gallery Images

- **GET** `/getheroimages`
- **Description**: Retrieves all hero gallery images (sorted by order)

### 3. Get Active Hero Gallery Images

- **GET** `/getactiveheroimages`
- **Description**: Retrieves only active hero gallery images (sorted by order)

### 4. Get Hero Gallery Image by ID

- **GET** `/getheroimage/:id`
- **Description**: Retrieves a specific hero gallery image by ID

### 5. Update Hero Gallery Image

- **PUT** `/updateheroimage/:id`
- **Description**: Updates hero gallery image information

### 6. Toggle Hero Gallery Image Status

- **PUT** `/toggleheroimagestatus/:id`
- **Description**: Toggles active/inactive status of a hero gallery image

### 7. Reorder Hero Gallery Images

- **PUT** `/reorderheroimages`
- **Description**: Reorders multiple hero gallery images
- **Request Body**:

```json
{
  "imageOrders": [
    { "id": "image_id_1", "order": 1 },
    { "id": "image_id_2", "order": 2 },
    { "id": "image_id_3", "order": 3 }
  ]
}
```

### 8. Delete Hero Gallery Image

- **DELETE** `/deleteheroimage/:id`
- **Description**: Removes a hero gallery image

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "_id": "hero_image_id",
    "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    "altText": "Students collaborating in modern design studio",
    "order": 1,
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
  "message": "Hero gallery image not found"
}
```

## Usage Examples

### Frontend About Us Page

```javascript
// Get active hero gallery images for public page
const response = await fetch("/api/v1/aboutus/herogallery/getactiveheroimages");
const data = await response.json();

if (data.success) {
  data.data.forEach((image) => {
    console.log(`Order ${image.order}: ${image.altText}`);
  });
}
```

### Image Gallery Component

```javascript
// Create image gallery carousel
const createHeroGallery = async () => {
  const response = await fetch(
    "/api/v1/aboutus/herogallery/getactiveheroimages"
  );
  const { data: images } = await response.json();

  const galleryHTML = images
    .map(
      (image) => `
    <div class="hero-slide" data-order="${image.order}">
      <img src="${image.imageUrl}" alt="${image.altText}" />
      <div class="slide-caption">${image.altText}</div>
    </div>
  `
    )
    .join("");

  document.getElementById("hero-gallery").innerHTML = galleryHTML;
};
```

### Admin Dashboard

```javascript
// Get all images for admin management
const response = await fetch("/api/v1/aboutus/herogallery/getheroimages");
const data = await response.json();

// Toggle image status
const toggleStatus = async (imageId) => {
  const response = await fetch(
    `/api/v1/aboutus/herogallery/toggleheroimagestatus/${imageId}`,
    {
      method: "PUT",
    }
  );
  const result = await response.json();
  console.log(result.message);
};

// Reorder images
const reorderImages = async (newOrder) => {
  const response = await fetch(
    "/api/v1/aboutus/herogallery/reorderheroimages",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageOrders: newOrder }),
    }
  );
  const result = await response.json();
  console.log(result.message);
};
```

### Using curl

```bash
# Get active hero gallery images
curl http://localhost:5500/api/v1/aboutus/herogallery/getactiveheroimages

# Create new hero gallery image
curl -X POST http://localhost:5500/api/v1/aboutus/herogallery/addheroimage \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/image.jpg",
    "altText": "Description of the image",
    "order": 5
  }'

# Toggle image status
curl -X PUT http://localhost:5500/api/v1/aboutus/herogallery/toggleheroimagestatus/IMAGE_ID

# Reorder images
curl -X PUT http://localhost:5500/api/v1/aboutus/herogallery/reorderheroimages \
  -H "Content-Type: application/json" \
  -d '{
    "imageOrders": [
      {"id": "image_id_1", "order": 1},
      {"id": "image_id_2", "order": 2}
    ]
  }'
```

## Features

### ✅ Image Management

- Complete CRUD operations
- Order-based organization
- Active/inactive status control
- Image metadata tracking

### ✅ Gallery Organization

- Custom ordering system
- Bulk reordering capability
- Status-based filtering
- Responsive image handling

### ✅ Cloudinary Integration Ready

- Image URL storage for Cloudinary
- Alt text for accessibility
- Order management for display
- Status control for visibility

### ✅ Admin Features

- Status management (active/inactive)
- Drag-and-drop reordering support
- Bulk operations capability
- Gallery preview functionality

## Setup and Testing

### 1. Start Server

```bash
npm run dev
```

### 2. Seed Sample Data

```bash
node scripts/seedAboutUsHeroGalleryData.js
```

### 3. Test Endpoints

Use the curl examples above or tools like Postman to test the API endpoints.

## File Structure

```
models/
└── aboutUsHeroGallery.js          # Hero gallery schema definition

controllers/
└── aboutUsHeroGalleryController.js # Hero gallery CRUD operations

routes/
└── aboutUsHeroGallery.routes.js   # Hero gallery API routes

scripts/
└── seedAboutUsHeroGalleryData.js  # Sample data generator

docs/
└── ABOUT_US_HERO_GALLERY_API_DOCUMENTATION.md # This documentation
```

## Validation Rules

- **Image URL**: Required, valid URL
- **Alt Text**: 2-200 characters, required for accessibility
- **Order**: Required, minimum value 1
- **Status**: Boolean, default true

## UI Integration

The API supports comprehensive hero gallery management:

1. **Public About Us Page**: Use `/getactiveheroimages` to display gallery
2. **Image Carousel**: Use order field for proper sequencing
3. **Admin Gallery Manager**: Use admin endpoints for content management
4. **Drag & Drop Reordering**: Use `/reorderheroimages` for bulk updates
5. **Status Management**: Use toggle endpoint for visibility control

## Common Use Cases

### Hero Gallery Carousel

- Display images in order on About Us page
- Smooth transitions between images
- Responsive design for all devices
- Accessibility with proper alt text

### Admin Content Management

- Upload new hero images
- Reorder images via drag & drop
- Enable/disable images without deletion
- Preview gallery before publishing

### Performance Optimization

- Load only active images on frontend
- Lazy loading for better performance
- Optimized image sizes via Cloudinary
- Efficient ordering system
