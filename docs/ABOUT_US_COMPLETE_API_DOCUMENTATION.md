# About Us Complete API Documentation

## Overview

The About Us API provides comprehensive management for all sections of the About Us page, including hero gallery, statistics, core values, campus images, and content sections. All APIs follow consistent patterns and support full CRUD operations.

## Base URLs

- **Hero Images**: `/api/v1/about-us/hero-images`
- **Statistics**: `/api/v1/about-us/statistics`
- **Core Values**: `/api/v1/about-us/core-values`
- **Campus Images**: `/api/v1/about-us/campus-images`
- **Content Sections**: `/api/v1/about-us/content`

## Data Structures

### Hero Images
```javascript
{
  _id: string,
  imageUrl: string,
  altText: string,
  order: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Statistics
```javascript
{
  _id: string,
  number: string,        // e.g., "500+", "95%"
  title: string,
  description: string,
  imageUrl: string,
  order: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Core Values
```javascript
{
  _id: string,
  title: string,
  description: string,
  imageUrl: string,
  order: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Campus Images
```javascript
{
  _id: string,
  imageUrl: string,
  altText: string,
  order: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Content Sections
```javascript
{
  _id: string,
  sectionType: 'who-we-are' | 'about-us' | 'vision' | 'mission' | 'core-values-text',
  title: string,
  content: string,
  imageUrl?: string,
  order: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Common API Patterns

All sections follow the same endpoint patterns:

### Basic CRUD Operations
- **POST** `/add{section}` - Create new item
- **GET** `/get{sections}` - Get all items
- **GET** `/get{section}/:id` - Get item by ID
- **PUT** `/update{section}/:id` - Update item
- **DELETE** `/delete{section}/:id` - Delete item

### Enhanced Operations
- **GET** `/getactive{sections}` - Get only active items
- **PUT** `/toggle{section}status/:id` - Toggle active/inactive
- **PUT** `/reorder{sections}` - Bulk reorder items

## Frontend Integration Examples

### Complete About Us Page Data
```javascript
// Fetch all About Us data
const fetchAboutUsData = async () => {
  const [heroImages, statistics, coreValues, campusImages, contentSections] = await Promise.all([
    fetch('/api/v1/about-us/hero-images/getactiveheroimages').then(r => r.json()),
    fetch('/api/v1/about-us/statistics/getactivestatistics').then(r => r.json()),
    fetch('/api/v1/about-us/core-values/getactivecorevalues').then(r => r.json()),
    fetch('/api/v1/about-us/campus-images/getactivecampusimages').then(r => r.json()),
    fetch('/api/v1/about-us/content/getactivecontentsections').then(r => r.json())
  ]);

  return {
    heroImages: heroImages.data,
    statistics: statistics.data,
    coreValues: coreValues.data,
    campusImages: campusImages.data,
    contentSections: contentSections.data
  };
};
```

### Specific Content Section
```javascript
// Get specific content section
const getContentByType = async (sectionType) => {
  const response = await fetch(`/api/v1/about-us/content/getcontentbytype/${sectionType}`);
  const data = await response.json();
  return data.success ? data.data : null;
};

// Usage
const whoWeAre = await getContentByType('who-we-are');
const mission = await getContentByType('mission');
const vision = await getContentByType('vision');
```

### Statistics Display
```javascript
// Display statistics section
const displayStatistics = async () => {
  const response = await fetch('/api/v1/about-us/statistics/getactivestatistics');
  const { data: statistics } = await response.json();
  
  const statisticsHTML = statistics.map(stat => `
    <div class="statistic-item">
      <img src="${stat.imageUrl}" alt="${stat.title}" />
      <div class="stat-number">${stat.number}</div>
      <h3>${stat.title}</h3>
      <p>${stat.description}</p>
    </div>
  `).join('');
  
  document.getElementById('statistics-section').innerHTML = statisticsHTML;
};
```

### Core Values Section
```javascript
// Display core values
const displayCoreValues = async () => {
  const response = await fetch('/api/v1/about-us/core-values/getactivecorevalues');
  const { data: coreValues } = await response.json();
  
  const valuesHTML = coreValues.map(value => `
    <div class="core-value-item">
      <img src="${value.imageUrl}" alt="${value.title}" />
      <h3>${value.title}</h3>
      <p>${value.description}</p>
    </div>
  `).join('');
  
  document.getElementById('core-values-section').innerHTML = valuesHTML;
};
```

## Admin Dashboard Integration

### Complete Admin Panel
```javascript
// Admin: Get all sections for management
const getAdminData = async () => {
  const [heroImages, statistics, coreValues, campusImages, contentSections] = await Promise.all([
    fetch('/api/v1/about-us/hero-images/getheroimages').then(r => r.json()),
    fetch('/api/v1/about-us/statistics/getstatistics').then(r => r.json()),
    fetch('/api/v1/about-us/core-values/getcorevalues').then(r => r.json()),
    fetch('/api/v1/about-us/campus-images/getcampusimages').then(r => r.json()),
    fetch('/api/v1/about-us/content/getcontentsections').then(r => r.json())
  ]);

  return {
    heroImages: heroImages.data,
    statistics: statistics.data,
    coreValues: coreValues.data,
    campusImages: campusImages.data,
    contentSections: contentSections.data
  };
};
```

### Reorder Functionality
```javascript
// Generic reorder function for any section
const reorderItems = async (section, newOrder) => {
  const endpoints = {
    'hero-images': '/api/v1/about-us/hero-images/reorderheroimages',
    'statistics': '/api/v1/about-us/statistics/reorderstatistics',
    'core-values': '/api/v1/about-us/core-values/reordercorevalues',
    'campus-images': '/api/v1/about-us/campus-images/reordercampusimages'
  };

  const response = await fetch(endpoints[section], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [`${section.replace('-', '')}Orders`]: newOrder })
  });

  return response.json();
};
```

## Quick Setup Guide

### 1. Start Server
```bash
npm run dev
```

### 2. Seed All About Us Data
```bash
node scripts/seedAboutUsData.js
```

### 3. Test All Endpoints
```bash
# Hero Images
curl http://localhost:5500/api/v1/about-us/hero-images/getactiveheroimages

# Statistics
curl http://localhost:5500/api/v1/about-us/statistics/getactivestatistics

# Core Values
curl http://localhost:5500/api/v1/about-us/core-values/getactivecorevalues

# Campus Images
curl http://localhost:5500/api/v1/about-us/campus-images/getactivecampusimages

# Content Sections
curl http://localhost:5500/api/v1/about-us/content/getactivecontentsections
```

## Features Summary

### ✅ Complete About Us Management
- Hero gallery with multiple images
- Statistics with numbers and descriptions
- Core values with detailed descriptions
- Campus images showcase
- Content sections for different page areas

### ✅ Consistent API Design
- Same endpoint patterns across all sections
- Consistent response formats
- Uniform error handling
- Standard CRUD operations

### ✅ Advanced Features
- Order-based sequencing for all sections
- Active/inactive status management
- Bulk reordering capabilities
- Content type-based retrieval

### ✅ Frontend Ready
- Public endpoints for active content only
- Admin endpoints for complete management
- Optimized for performance
- SEO-friendly structure

The About Us API provides a complete solution for managing all aspects of the About Us page with professional-grade features and consistent patterns across all sections.
