// Test script for Downloads API
// This script provides examples for testing all download endpoints

const BASE_URL = 'http://localhost:5500/api/v1/download';

console.log('Downloads API Test Guide');
console.log('=======================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed sample data:');
console.log('   node scripts/seedDownloadData.js\n');

console.log('🧪 Test the following endpoints:\n');

// Basic CRUD Operations
console.log('📝 BASIC CRUD OPERATIONS');
console.log('========================');

console.log('GET All Downloads:');
console.log(`   curl ${BASE_URL}/getdownloads\n`);

console.log('GET Download by ID:');
console.log(`   curl ${BASE_URL}/getdownloadbyid/DOWNLOAD_ID\n`);

console.log('POST Create Download:');
console.log(`   curl -X POST ${BASE_URL}/adddownload \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{\n');
console.log('       "title": "Test Document",\n');
console.log('       "description": "This is a test document for download.",\n');
console.log('       "category": "Test",\n');
console.log('       "fileUrl": "https://example.com/test.pdf",\n');
console.log('       "fileName": "test-document.pdf",\n');
console.log('       "fileSize": "1.5 MB",\n');
console.log('       "uploadDate": "2025-03-01"\n');
console.log('     }\'\n');

console.log('PUT Update Download:');
console.log(`   curl -X PUT ${BASE_URL}/updatedownload/DOWNLOAD_ID \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Updated Document Title"}\'\n');

console.log('DELETE Download:');
console.log(`   curl -X DELETE ${BASE_URL}/deletedownload/DOWNLOAD_ID\n`);

// Advanced Features
console.log('🔧 ADVANCED FEATURES');
console.log('====================');

console.log('GET Downloads by Category:');
console.log(`   curl ${BASE_URL}/getdownloadsbycategory/Brochures\n`);

console.log('GET Active Downloads:');
console.log(`   curl ${BASE_URL}/getactivedownloads\n`);

console.log('GET Popular Downloads:');
console.log(`   curl ${BASE_URL}/getpopulardownloads\n`);

console.log('GET Recent Downloads:');
console.log(`   curl ${BASE_URL}/getrecentdownloads?limit=5\n`);

console.log('PUT Increment Download Count:');
console.log(`   curl -X PUT ${BASE_URL}/incrementdownloadcount/DOWNLOAD_ID\n`);

console.log('PUT Toggle Download Status:');
console.log(`   curl -X PUT ${BASE_URL}/toggledownloadstatus/DOWNLOAD_ID\n`);

// Frontend Integration Examples
console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('Downloads Page:');
console.log(`
// Get all active downloads for public page
fetch('${BASE_URL}/getactivedownloads')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(download => {
        console.log(\`\${download.title} - \${download.category} - \${download.fileSize}\`);
      });
    }
  });
`);

console.log('Download File with Counter:');
console.log(`
// Handle file download and increment counter
const downloadFile = async (downloadId, fileUrl, fileName) => {
  try {
    // Increment download count
    await fetch(\`${BASE_URL}/incrementdownloadcount/\${downloadId}\`, {
      method: 'PUT'
    });
    
    // Trigger file download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    
    console.log('Download started and counter incremented');
  } catch (error) {
    console.error('Download failed:', error);
  }
};
`);

console.log('Category Filtering:');
console.log(`
// Get downloads by category
const getDownloadsByCategory = async (category) => {
  const response = await fetch(\`${BASE_URL}/getdownloadsbycategory/\${category}\`);
  const data = await response.json();
  
  if (data.success) {
    console.log(\`Found \${data.data.length} downloads in \${category} category\`);
    return data.data;
  }
  return [];
};

// Usage
getDownloadsByCategory('Brochures');
`);

console.log('Popular Downloads Widget:');
console.log(`
// Get popular downloads for sidebar/widget
fetch('${BASE_URL}/getpopulardownloads')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Popular Downloads:');
      data.data.forEach((download, index) => {
        console.log(\`\${index + 1}. \${download.title} (\${download.downloadCount} downloads)\`);
      });
    }
  });
`);

console.log('Admin Dashboard:');
console.log(`
// Admin: Get all downloads including inactive
fetch('${BASE_URL}/getdownloads')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(download => {
        console.log(\`\${download.title} - Active: \${download.isActive} - Downloads: \${download.downloadCount}\`);
      });
    }
  });

// Admin: Toggle download status
const toggleStatus = async (downloadId) => {
  const response = await fetch(\`${BASE_URL}/toggledownloadstatus/\${downloadId}\`, {
    method: 'PUT'
  });
  const result = await response.json();
  console.log(result.message);
};
`);

// Sample Data Structure
console.log('📋 SAMPLE DATA STRUCTURE');
console.log('========================');

console.log('Complete Download Item Structure:');
console.log(JSON.stringify({
  title: "Inframe School Brochure 2025",
  description: "Complete information about our programs, facilities, and admission process",
  category: "Brochures",
  fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/brochure.pdf",
  fileName: "inframe-brochure-2025.pdf",
  fileSize: "3.2 MB",
  uploadDate: "2025-02-28",
  downloadCount: 245,
  isActive: true
}, null, 2));

// Expected Responses
console.log('\n🎯 EXPECTED RESPONSE FORMATS');
console.log('============================');

console.log('Success Response (Single Download):');
console.log(JSON.stringify({
  success: true,
  data: {
    _id: "download_id",
    title: "Inframe School Brochure 2025",
    description: "Complete information about our programs and facilities",
    category: "Brochures",
    fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/brochure.pdf",
    fileName: "inframe-brochure-2025.pdf",
    fileSize: "3.2 MB",
    uploadDate: "2025-02-28",
    downloadCount: 245,
    isActive: true,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  }
}, null, 2));

console.log('\nSuccess Response (Multiple Downloads):');
console.log(JSON.stringify({
  success: true,
  data: [
    "...(array of download objects)"
  ]
}, null, 2));

console.log('\nSuccess Response (Action):');
console.log(JSON.stringify({
  success: true,
  data: "...(updated object)",
  message: "Download count incremented successfully"
}, null, 2));

console.log('\nError Response:');
console.log(JSON.stringify({
  success: false,
  message: "Download not found"
}, null, 2));

console.log('\n✅ KEY FEATURES');
console.log('===============');
console.log('• Complete CRUD operations for downloads');
console.log('• Category-based organization');
console.log('• Download count tracking and analytics');
console.log('• Active/inactive status management');
console.log('• Popular downloads ranking');
console.log('• Recent downloads listing');
console.log('• Cloudinary integration ready');
console.log('• File metadata management');

console.log('\n📊 COMMON CATEGORIES');
console.log('===================');
console.log('• Brochures - School information and marketing materials');
console.log('• Application Forms - Admission and enrollment forms');
console.log('• Fee Information - Fee structures and payment details');
console.log('• Scholarships - Scholarship information and applications');
console.log('• Campus Information - Campus maps and facility guides');
console.log('• Academic Information - Calendars and academic resources');
console.log('• Course Information - Curriculum and course details');
console.log('• Student Resources - Handbooks and student guides');
console.log('• Industry Relations - Partnership and placement info');
console.log('• International Programs - Exchange and study abroad');

console.log('\n🎨 UI INTEGRATION PATTERN');
console.log('=========================');
console.log('1. Downloads Page: Use GET /getactivedownloads (show title, category, size)');
console.log('2. Category Filter: Use GET /getdownloadsbycategory/:category');
console.log('3. Download Action: Use PUT /incrementdownloadcount/:id + trigger download');
console.log('4. Popular Widget: Use GET /getpopulardownloads (sidebar/featured)');
console.log('5. Admin Dashboard: Use GET /getdownloads + status controls');

console.log('\n🔗 CLOUDINARY INTEGRATION');
console.log('=========================');
console.log('• Store Cloudinary URLs in fileUrl field');
console.log('• Preserve original filename in fileName field');
console.log('• Track file size in human-readable format');
console.log('• Use upload date for organization');
console.log('• Implement secure download URLs if needed');

console.log('\n📚 Complete documentation: docs/DOWNLOAD_API_DOCUMENTATION.md');
