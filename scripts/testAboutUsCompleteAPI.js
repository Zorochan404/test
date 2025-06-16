// Complete test script for all About Us APIs
// This script provides examples for testing all About Us endpoints

const BASE_URL = 'http://localhost:5500/api/v1/about-us';

console.log('Complete About Us API Test Guide');
console.log('===============================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed all About Us data:');
console.log('   node scripts/seedAboutUsData.js\n');

console.log('🧪 Test all About Us endpoints:\n');

// Hero Images API
console.log('📸 HERO IMAGES API');
console.log('==================');
console.log(`Base URL: ${BASE_URL}/hero-images`);
console.log('GET Active Hero Images:');
console.log(`   curl ${BASE_URL}/hero-images/getactiveheroimages\n`);

console.log('POST Create Hero Image:');
console.log(`   curl -X POST ${BASE_URL}/hero-images/addheroimage \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"imageUrl":"https://example.com/image.jpg","altText":"Description","order":1}\'\n');

// Statistics API
console.log('📊 STATISTICS API');
console.log('=================');
console.log(`Base URL: ${BASE_URL}/statistics`);
console.log('GET Active Statistics:');
console.log(`   curl ${BASE_URL}/statistics/getactivestatistics\n`);

console.log('POST Create Statistic:');
console.log(`   curl -X POST ${BASE_URL}/statistics/addstatistic \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"number":"100+","title":"Students","description":"Active students","imageUrl":"https://example.com/stat.jpg","order":1}\'\n');

// Core Values API
console.log('💎 CORE VALUES API');
console.log('==================');
console.log(`Base URL: ${BASE_URL}/core-values`);
console.log('GET Active Core Values:');
console.log(`   curl ${BASE_URL}/core-values/getactivecorevalues\n`);

console.log('POST Create Core Value:');
console.log(`   curl -X POST ${BASE_URL}/core-values/addcorevalue \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"title":"Innovation","description":"We foster creativity","imageUrl":"https://example.com/value.jpg","order":1}\'\n');

// Campus Images API
console.log('🏫 CAMPUS IMAGES API');
console.log('====================');
console.log(`Base URL: ${BASE_URL}/campus-images`);
console.log('GET Active Campus Images:');
console.log(`   curl ${BASE_URL}/campus-images/getactivecampusimages\n`);

console.log('POST Create Campus Image:');
console.log(`   curl -X POST ${BASE_URL}/campus-images/addcampusimage \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"imageUrl":"https://example.com/campus.jpg","altText":"Campus view","order":1}\'\n');

// Content Sections API
console.log('📝 CONTENT SECTIONS API');
console.log('=======================');
console.log(`Base URL: ${BASE_URL}/content`);
console.log('GET Active Content Sections:');
console.log(`   curl ${BASE_URL}/content/getactivecontentsections\n`);

console.log('GET Content by Type:');
console.log(`   curl ${BASE_URL}/content/getcontentbytype/who-we-are\n`);

console.log('POST Create/Update Content:');
console.log(`   curl -X POST ${BASE_URL}/content/addorupdatecontent \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"sectionType":"about-us","title":"About Us","content":"We are...","order":1}\'\n');

// Frontend Integration Examples
console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('Complete About Us Page Data:');
console.log(`
// Fetch all About Us data for the page
const fetchAboutUsData = async () => {
  const [heroImages, statistics, coreValues, campusImages, contentSections] = await Promise.all([
    fetch('${BASE_URL}/hero-images/getactiveheroimages').then(r => r.json()),
    fetch('${BASE_URL}/statistics/getactivestatistics').then(r => r.json()),
    fetch('${BASE_URL}/core-values/getactivecorevalues').then(r => r.json()),
    fetch('${BASE_URL}/campus-images/getactivecampusimages').then(r => r.json()),
    fetch('${BASE_URL}/content/getactivecontentsections').then(r => r.json())
  ]);

  return {
    heroImages: heroImages.data,
    statistics: statistics.data,
    coreValues: coreValues.data,
    campusImages: campusImages.data,
    contentSections: contentSections.data
  };
};

// Usage
const aboutUsData = await fetchAboutUsData();
console.log('About Us data loaded:', aboutUsData);
`);

console.log('Specific Content Sections:');
console.log(`
// Get specific content sections
const getContentByType = async (sectionType) => {
  const response = await fetch(\`${BASE_URL}/content/getcontentbytype/\${sectionType}\`);
  const data = await response.json();
  return data.success ? data.data : null;
};

// Get different sections
const whoWeAre = await getContentByType('who-we-are');
const mission = await getContentByType('mission');
const vision = await getContentByType('vision');
const aboutUs = await getContentByType('about-us');
const coreValuesText = await getContentByType('core-values-text');
`);

console.log('Statistics Display:');
console.log(`
// Display statistics section
const displayStatistics = async () => {
  const response = await fetch('${BASE_URL}/statistics/getactivestatistics');
  const { data: statistics } = await response.json();
  
  const statisticsHTML = statistics.map(stat => \`
    <div class="statistic-item">
      <img src="\${stat.imageUrl}" alt="\${stat.title}" />
      <div class="stat-number">\${stat.number}</div>
      <h3>\${stat.title}</h3>
      <p>\${stat.description}</p>
    </div>
  \`).join('');
  
  document.getElementById('statistics-section').innerHTML = statisticsHTML;
};
`);

console.log('Core Values Display:');
console.log(`
// Display core values section
const displayCoreValues = async () => {
  const response = await fetch('${BASE_URL}/core-values/getactivecorevalues');
  const { data: coreValues } = await response.json();
  
  const valuesHTML = coreValues.map(value => \`
    <div class="core-value-item">
      <img src="\${value.imageUrl}" alt="\${value.title}" />
      <h3>\${value.title}</h3>
      <p>\${value.description}</p>
    </div>
  \`).join('');
  
  document.getElementById('core-values-section').innerHTML = valuesHTML;
};
`);

// Admin Dashboard Examples
console.log('👨‍💼 ADMIN DASHBOARD EXAMPLES');
console.log('=============================');

console.log('Complete Admin Data:');
console.log(`
// Admin: Get all sections for management
const getAdminData = async () => {
  const [heroImages, statistics, coreValues, campusImages, contentSections] = await Promise.all([
    fetch('${BASE_URL}/hero-images/getheroimages').then(r => r.json()),
    fetch('${BASE_URL}/statistics/getstatistics').then(r => r.json()),
    fetch('${BASE_URL}/core-values/getcorevalues').then(r => r.json()),
    fetch('${BASE_URL}/campus-images/getcampusimages').then(r => r.json()),
    fetch('${BASE_URL}/content/getcontentsections').then(r => r.json())
  ]);

  return {
    heroImages: heroImages.data,
    statistics: statistics.data,
    coreValues: coreValues.data,
    campusImages: campusImages.data,
    contentSections: contentSections.data
  };
};
`);

console.log('Reorder Functionality:');
console.log(`
// Generic reorder function for any section
const reorderItems = async (section, newOrder) => {
  const endpoints = {
    'hero-images': '${BASE_URL}/hero-images/reorderheroimages',
    'statistics': '${BASE_URL}/statistics/reorderstatistics',
    'core-values': '${BASE_URL}/core-values/reordercorevalues',
    'campus-images': '${BASE_URL}/campus-images/reordercampusimages'
  };

  const orderKeys = {
    'hero-images': 'imageOrders',
    'statistics': 'statisticOrders',
    'core-values': 'coreValueOrders',
    'campus-images': 'campusImageOrders'
  };

  const response = await fetch(endpoints[section], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [orderKeys[section]]: newOrder })
  });

  return response.json();
};

// Usage
const newOrder = [
  { id: "item_id_1", order: 3 },
  { id: "item_id_2", order: 1 },
  { id: "item_id_3", order: 2 }
];
await reorderItems('statistics', newOrder);
`);

console.log('\n✅ KEY FEATURES');
console.log('===============');
console.log('• Complete About Us page management');
console.log('• Hero gallery with multiple images');
console.log('• Statistics with numbers and descriptions');
console.log('• Core values with detailed information');
console.log('• Campus images showcase');
console.log('• Content sections for different page areas');
console.log('• Consistent API patterns across all sections');
console.log('• Order-based sequencing');
console.log('• Active/inactive status management');
console.log('• Bulk reordering capabilities');

console.log('\n🎨 UI INTEGRATION PATTERN');
console.log('=========================');
console.log('1. Hero Section: Use hero-images API for carousel/slider');
console.log('2. Statistics: Use statistics API for numbers display');
console.log('3. Core Values: Use core-values API for values grid');
console.log('4. Campus Gallery: Use campus-images API for image showcase');
console.log('5. Content Sections: Use content API for text sections');
console.log('6. Admin Panel: Use all APIs with full CRUD operations');

console.log('\n📚 Complete documentation: docs/ABOUT_US_COMPLETE_API_DOCUMENTATION.md');
