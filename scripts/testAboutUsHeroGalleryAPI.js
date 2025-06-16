// Test script for About Us Hero Gallery API
// This script provides examples for testing all hero gallery endpoints

const BASE_URL = 'http://localhost:5500/api/v1/aboutus/herogallery';

console.log('About Us Hero Gallery API Test Guide');
console.log('====================================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed sample data:');
console.log('   node scripts/seedAboutUsHeroGalleryData.js\n');

console.log('🧪 Test the following endpoints:\n');

// Basic CRUD Operations
console.log('📝 BASIC CRUD OPERATIONS');
console.log('========================');

console.log('GET All Hero Gallery Images:');
console.log(`   curl ${BASE_URL}/getheroimages\n`);

console.log('GET Active Hero Gallery Images:');
console.log(`   curl ${BASE_URL}/getactiveheroimages\n`);

console.log('GET Hero Gallery Image by ID:');
console.log(`   curl ${BASE_URL}/getheroimage/IMAGE_ID\n`);

console.log('POST Create Hero Gallery Image:');
console.log(`   curl -X POST ${BASE_URL}/addheroimage \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",\n');
console.log('       "altText": "Students collaborating in modern design studio",\n');
console.log('       "order": 1\n');
console.log('     }\'\n');

console.log('PUT Update Hero Gallery Image:');
console.log(`   curl -X PUT ${BASE_URL}/updateheroimage/IMAGE_ID \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"altText":"Updated image description"}\'\n');

console.log('PUT Toggle Hero Gallery Image Status:');
console.log(`   curl -X PUT ${BASE_URL}/toggleheroimagestatus/IMAGE_ID\n`);

console.log('PUT Reorder Hero Gallery Images:');
console.log(`   curl -X PUT ${BASE_URL}/reorderheroimages \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "imageOrders": [\n');
console.log('         {"id": "image_id_1", "order": 1},\n');
console.log('         {"id": "image_id_2", "order": 2},\n');
console.log('         {"id": "image_id_3", "order": 3}\n');
console.log('       ]\n');
console.log('     }\'\n');

console.log('DELETE Hero Gallery Image:');
console.log(`   curl -X DELETE ${BASE_URL}/deleteheroimage/IMAGE_ID\n`);

// Frontend Integration Examples
console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('Hero Gallery Carousel:');
console.log(`
// Get active hero gallery images for About Us page
fetch('${BASE_URL}/getactiveheroimages')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(image => {
        console.log(\`Order \${image.order}: \${image.altText}\`);
      });
    }
  });
`);

console.log('Create Image Gallery Component:');
console.log(`
// Create hero gallery carousel
const createHeroGallery = async () => {
  const response = await fetch('${BASE_URL}/getactiveheroimages');
  const { data: images } = await response.json();
  
  const galleryHTML = images.map(image => \`
    <div class="hero-slide" data-order="\${image.order}">
      <img src="\${image.imageUrl}" alt="\${image.altText}" />
      <div class="slide-caption">\${image.altText}</div>
    </div>
  \`).join('');
  
  document.getElementById('hero-gallery').innerHTML = galleryHTML;
};

// Usage
createHeroGallery();
`);

console.log('Admin Dashboard:');
console.log(`
// Admin: Get all hero gallery images
fetch('${BASE_URL}/getheroimages')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(image => {
        console.log(\`\${image.order}. \${image.altText} - Active: \${image.isActive}\`);
      });
    }
  });

// Admin: Toggle image status
const toggleImageStatus = async (imageId) => {
  const response = await fetch(\`${BASE_URL}/toggleheroimagestatus/\${imageId}\`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};

// Admin: Reorder images (drag & drop functionality)
const reorderImages = async (newOrder) => {
  const response = await fetch('${BASE_URL}/reorderheroimages', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageOrders: newOrder })
  });
  const result = await response.json();
  console.log(result.message);
};

// Example usage
const newOrder = [
  { id: "image_id_1", order: 3 },
  { id: "image_id_2", order: 1 },
  { id: "image_id_3", order: 2 }
];
reorderImages(newOrder);
`);

// Sample Data Structure
console.log('📋 SAMPLE DATA STRUCTURE');
console.log('========================');

console.log('Complete Hero Gallery Image Structure:');
console.log(JSON.stringify({
  imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  altText: "Students collaborating in modern design studio at Inframe School",
  order: 1,
  isActive: true
}, null, 2));

// Expected Responses
console.log('\n🎯 EXPECTED RESPONSE FORMATS');
console.log('============================');

console.log('Success Response (Single Image):');
console.log(JSON.stringify({
  success: true,
  data: {
    _id: "hero_image_id",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    altText: "Students collaborating in modern design studio",
    order: 1,
    isActive: true,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  }
}, null, 2));

console.log('\nSuccess Response (Multiple Images):');
console.log(JSON.stringify({
  success: true,
  data: [
    "...(array of hero gallery image objects)"
  ]
}, null, 2));

console.log('\nReorder Response:');
console.log(JSON.stringify({
  success: true,
  data: "...(array of updated image objects)",
  message: "Hero gallery images reordered successfully"
}, null, 2));

console.log('\nError Response:');
console.log(JSON.stringify({
  success: false,
  message: "Hero gallery image not found"
}, null, 2));

console.log('\n✅ KEY FEATURES');
console.log('===============');
console.log('• Complete CRUD operations for hero gallery images');
console.log('• Order-based image sequencing');
console.log('• Active/inactive status management');
console.log('• Bulk reordering capability');
console.log('• Cloudinary integration ready');
console.log('• Accessibility with alt text');
console.log('• Admin gallery management');
console.log('• Responsive image handling');

console.log('\n🎨 UI INTEGRATION PATTERN');
console.log('=========================');
console.log('1. About Us Hero Gallery: Use GET /getactiveheroimages (show in order)');
console.log('2. Image Carousel: Use order field for proper sequencing');
console.log('3. Admin Gallery Manager: Use GET /getheroimages + status controls');
console.log('4. Drag & Drop Reordering: Use PUT /reorderheroimages for bulk updates');
console.log('5. Status Management: Use PUT /toggleheroimagestatus for visibility');

console.log('\n🔗 CLOUDINARY INTEGRATION');
console.log('=========================');
console.log('• Store Cloudinary URLs in imageUrl field');
console.log('• Use alt text for accessibility and SEO');
console.log('• Implement responsive image sizes');
console.log('• Order management for gallery display');
console.log('• Status control for image visibility');

console.log('\n📚 Complete documentation: docs/ABOUT_US_HERO_GALLERY_API_DOCUMENTATION.md');
