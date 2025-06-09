// Test script for Life at Inframe API
// This script provides examples for testing all endpoints

const BASE_URL = 'http://localhost:5500/api/v1';

console.log('Life at Inframe API Test Guide');
console.log('===============================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed sample data:');
console.log('   node scripts/seedLifeAtInframeData.js\n');

console.log('🧪 Test the following endpoints:\n');

// Life at Inframe Sections
console.log('📋 LIFE AT INFRAME SECTIONS (/lifeatinframesection)');
console.log('=================================================');
console.log('GET All Sections:');
console.log(`   curl ${BASE_URL}/lifeatinframesection/getlifeatinframesections\n`);

console.log('GET Section by ID:');
console.log(`   curl ${BASE_URL}/lifeatinframesection/getlifeatinframesectionbyid/SECTION_ID\n`);

console.log('GET Sections by Type:');
console.log(`   curl ${BASE_URL}/lifeatinframesection/getlifeatinframesectionsbytype/hero\n`);

console.log('GET Active Sections:');
console.log(`   curl ${BASE_URL}/lifeatinframesection/getactivelifeatinframesections\n`);

console.log('POST Create Section:');
console.log(`   curl -X POST ${BASE_URL}/lifeatinframesection/addlifeatinframesection \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"sectionType":"hero","title":"Test Section","order":1}\'\n');

// Student Services
console.log('🎓 STUDENT SERVICES (/studentservice)');
console.log('=====================================');
console.log('GET All Services:');
console.log(`   curl ${BASE_URL}/studentservice/getstudentservices\n`);

console.log('POST Create Service:');
console.log(`   curl -X POST ${BASE_URL}/studentservice/addstudentservice \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Test Service","description":"Test Description","order":1}\'\n');

// Student Clubs
console.log('🏛️ STUDENT CLUBS (/studentclub)');
console.log('===============================');
console.log('GET All Clubs:');
console.log(`   curl ${BASE_URL}/studentclub/getstudentclubs\n`);

console.log('GET Clubs by Category:');
console.log(`   curl ${BASE_URL}/studentclub/getstudentclubsbycategory/arts\n`);

console.log('POST Create Club:');
console.log(`   curl -X POST ${BASE_URL}/studentclub/addstudentclub \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"name":"Test Club","category":"arts","description":"Test Description","order":1}\'\n');

// Campus Events
console.log('🎉 CAMPUS EVENTS (/campusevent)');
console.log('===============================');
console.log('GET All Events:');
console.log(`   curl ${BASE_URL}/campusevent/getcampusevents\n`);

console.log('GET Events by Category:');
console.log(`   curl ${BASE_URL}/campusevent/getcampuseventsbycategory/arts-culture\n`);

console.log('POST Create Event:');
console.log(`   curl -X POST ${BASE_URL}/campusevent/addcampusevent \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Test Event","description":"Test Description","category":"arts-culture","order":1}\'\n');

// Gallery Images
console.log('🖼️ GALLERY IMAGES (/galleryimage)');
console.log('=================================');
console.log('GET All Images:');
console.log(`   curl ${BASE_URL}/galleryimage/getgalleryimages\n`);

console.log('GET Images by Category:');
console.log(`   curl ${BASE_URL}/galleryimage/getgalleryimagesbycategory/Campus\n`);

console.log('POST Create Image:');
console.log(`   curl -X POST ${BASE_URL}/galleryimage/addgalleryimage \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Test Image","imageUrl":"test.jpg","category":"Test","order":1}\'\n');

// Sports Facilities
console.log('🏃 SPORTS FACILITIES (/sportsfacility)');
console.log('======================================');
console.log('GET All Facilities:');
console.log(`   curl ${BASE_URL}/sportsfacility/getsportsfacilities\n`);

console.log('GET Facilities by Category:');
console.log(`   curl ${BASE_URL}/sportsfacility/getsportsfacilitiesbycategory/Indoor%20Sports\n`);

console.log('POST Create Facility:');
console.log(`   curl -X POST ${BASE_URL}/sportsfacility/addsportsfacility \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"name":"Test Facility","image":"test.jpg","category":"Test"}\'\n');

console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('List View Pattern:');
console.log(`
// Get all sections for list view
fetch('${BASE_URL}/lifeatinframesection/getlifeatinframesections')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(section => {
        console.log(\`\${section.title} - \${section.description}\`);
      });
    }
  });
`);

console.log('Details View Pattern:');
console.log(`
// Get section details when clicked
const sectionId = 'SECTION_ID_HERE';
fetch(\`${BASE_URL}/lifeatinframesection/getlifeatinframesectionbyid/\${sectionId}\`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const section = data.data;
      console.log(\`
        Title: \${section.title}
        Type: \${section.sectionType}
        Description: \${section.description}
        Content: \${section.content}
        Images: \${section.images?.join(', ')}
        Active: \${section.isActive}
      \`);
    }
  });
`);

console.log('🎯 EXPECTED RESPONSE FORMAT');
console.log('===========================');
console.log('Success Response:');
console.log(JSON.stringify({
  success: true,
  data: {
    _id: "section_id",
    sectionType: "hero",
    title: "Welcome to Campus Life",
    description: "Experience the vibrant community",
    content: "Detailed content...",
    images: ["image1.jpg", "image2.jpg"],
    order: 1,
    isActive: true,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  }
}, null, 2));

console.log('\nError Response:');
console.log(JSON.stringify({
  success: false,
  message: "Section not found"
}, null, 2));

console.log('\n✅ All endpoints follow the same CRUD pattern!');
console.log('📚 Check docs/LIFE_AT_INFRAME_API.md for complete documentation');
