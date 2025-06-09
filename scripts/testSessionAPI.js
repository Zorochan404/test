// Test script for Session Login Details API
// This script demonstrates how to test the API endpoints

const BASE_URL = 'http://localhost:3000/api/v1/session';

// Sample session data for testing
const sampleSession = {
    name: 'Test User',
    phoneNumber: '+1234567890',
    email: 'testuser@example.com',
    city: 'Test City',
    course: 'Test Course'
};

console.log('Session Login Details API Test Guide');
console.log('=====================================\n');

console.log('1. Start your server first:');
console.log('   npm run dev\n');

console.log('2. Seed sample data:');
console.log('   node scripts/seedSessionData.js\n');

console.log('3. Test the following endpoints:\n');

console.log('📋 GET All Sessions:');
console.log(`   curl ${BASE_URL}/getsessions\n`);

console.log('👤 GET Session by ID:');
console.log(`   curl ${BASE_URL}/getsessionbyid/SESSION_ID_HERE\n`);

console.log('🏙️ GET Sessions by City:');
console.log(`   curl ${BASE_URL}/getsessionsbycity/New%20York\n`);

console.log('📚 GET Sessions by Course:');
console.log(`   curl ${BASE_URL}/getsessionsbycourse/Web%20Development\n`);

console.log('✅ GET Active Sessions:');
console.log(`   curl ${BASE_URL}/getactivesessions\n`);

console.log('➕ POST Create Session:');
console.log(`   curl -X POST ${BASE_URL}/addsession \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log(`     -d '${JSON.stringify(sampleSession, null, 2)}'\n`);

console.log('✏️ PUT Update Session:');
console.log(`   curl -X PUT ${BASE_URL}/updatesession/SESSION_ID_HERE \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"isActive": false}\'\n');

console.log('🗑️ DELETE Session:');
console.log(`   curl -X DELETE ${BASE_URL}/deletesession/SESSION_ID_HERE\n`);

console.log('Expected Response Format:');
console.log('========================');
console.log('Success Response:');
console.log(JSON.stringify({
    success: true,
    data: {
        _id: "session_id",
        name: "John Doe",
        phoneNumber: "+1234567890",
        email: "john.doe@example.com",
        city: "New York",
        course: "Web Development",
        loginTime: "2024-01-15T10:30:00.000Z",
        isActive: true,
        createdAt: "2024-01-15T10:30:00.000Z",
        updatedAt: "2024-01-15T10:30:00.000Z"
    }
}, null, 2));

console.log('\nError Response:');
console.log(JSON.stringify({
    success: false,
    message: "Error description"
}, null, 2));

console.log('\n🎯 UI Integration Example:');
console.log('=========================');
console.log('For a list view showing name and phone number:');
console.log(`
fetch('${BASE_URL}/getsessions')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(session => {
        console.log(\`\${session.name} - \${session.phoneNumber}\`);
      });
    }
  });
`);

console.log('For a details view when clicking on a session:');
console.log(`
const sessionId = 'SESSION_ID_HERE';
fetch(\`${BASE_URL}/getsessionbyid/\${sessionId}\`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const session = data.data;
      console.log(\`
        Name: \${session.name}
        Phone: \${session.phoneNumber}
        Email: \${session.email}
        City: \${session.city}
        Course: \${session.course}
        Login Time: \${new Date(session.loginTime).toLocaleString()}
      \`);
    }
  });
`);
