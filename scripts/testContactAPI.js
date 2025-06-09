// Test script for Contact Us API
// This script provides examples for testing all contact endpoints

const BASE_URL = 'http://localhost:5500/api/v1/contact';

console.log('Contact Us API Test Guide');
console.log('========================\n');

console.log('🚀 Start your server first:');
console.log('   npm run dev\n');

console.log('📊 Seed sample data:');
console.log('   node scripts/seedContactData.js\n');

console.log('🧪 Test the following endpoints:\n');

// Basic CRUD Operations
console.log('📝 BASIC CRUD OPERATIONS');
console.log('========================');

console.log('GET All Contacts:');
console.log(`   curl ${BASE_URL}/getcontacts\n`);

console.log('GET Contact by ID:');
console.log(`   curl ${BASE_URL}/getcontactbyid/CONTACT_ID\n`);

console.log('POST Create Contact:');
console.log(`   curl -X POST ${BASE_URL}/addcontact \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"Test message for inquiry about programs."}\'\n');

console.log('PUT Update Contact:');
console.log(`   curl -X PUT ${BASE_URL}/updatecontact/CONTACT_ID \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"status":"read","isRead":true}\'\n');

console.log('DELETE Contact:');
console.log(`   curl -X DELETE ${BASE_URL}/deletecontact/CONTACT_ID\n`);

// Status Management
console.log('📊 STATUS MANAGEMENT');
console.log('===================');

console.log('GET Contacts by Status (new):');
console.log(`   curl ${BASE_URL}/getcontactsbystatus/new\n`);

console.log('GET Contacts by Status (read):');
console.log(`   curl ${BASE_URL}/getcontactsbystatus/read\n`);

console.log('GET Contacts by Status (replied):');
console.log(`   curl ${BASE_URL}/getcontactsbystatus/replied\n`);

console.log('GET Contacts by Status (resolved):');
console.log(`   curl ${BASE_URL}/getcontactsbystatus/resolved\n`);

console.log('GET Unread Contacts:');
console.log(`   curl ${BASE_URL}/getunreadcontacts\n`);

console.log('PUT Mark Contact as Read:');
console.log(`   curl -X PUT ${BASE_URL}/markcontactasread/CONTACT_ID\n`);

console.log('PUT Update Contact Status:');
console.log(`   curl -X PUT ${BASE_URL}/updatecontactstatus/CONTACT_ID \\`);
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"status":"replied"}\'\n');

// Frontend Integration Examples
console.log('📱 FRONTEND INTEGRATION EXAMPLES');
console.log('================================');

console.log('Contact Form Submission:');
console.log(`
const submitContactForm = async (formData) => {
  const response = await fetch('${BASE_URL}/addcontact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    alert('Thank you for your message! We will get back to you soon.');
  } else {
    alert('Error submitting form. Please try again.');
  }
};
`);

console.log('Admin Dashboard - List View:');
console.log(`
// Get all contacts for admin list view
fetch('${BASE_URL}/getcontacts')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      data.data.forEach(contact => {
        console.log(\`\${contact.firstName} \${contact.lastName} - \${contact.email}\`);
      });
    }
  });
`);

console.log('Admin Dashboard - Details View:');
console.log(`
// Get contact details when clicked
const contactId = 'CONTACT_ID_HERE';
fetch(\`${BASE_URL}/getcontactbyid/\${contactId}\`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const contact = data.data;
      console.log(\`
        Name: \${contact.firstName} \${contact.lastName}
        Email: \${contact.email}
        Message: \${contact.message}
        Status: \${contact.status}
        Date: \${new Date(contact.createdAt).toLocaleString()}
      \`);
    }
  });
`);

console.log('Notification Count:');
console.log(`
// Get unread count for notifications
fetch('${BASE_URL}/getunreadcontacts')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const unreadCount = data.data.length;
      document.getElementById('notification-badge').textContent = unreadCount;
    }
  });
`);

// Sample Data Examples
console.log('📋 SAMPLE DATA EXAMPLES');
console.log('=======================');

console.log('Valid Contact Form Data:');
console.log(JSON.stringify({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  message: "I am interested in learning more about your computer science program. Could you please provide me with information about the curriculum and admission requirements?"
}, null, 2));

console.log('\nStatus Update Data:');
console.log(JSON.stringify({
  status: "replied"
}, null, 2));

// Expected Responses
console.log('\n🎯 EXPECTED RESPONSE FORMATS');
console.log('============================');

console.log('Success Response (Create/Get):');
console.log(JSON.stringify({
  success: true,
  data: {
    _id: "contact_id",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    message: "I am interested in learning more about your programs.",
    status: "new",
    isRead: false,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  }
}, null, 2));

console.log('\nSuccess Response (Delete):');
console.log(JSON.stringify({
  success: true,
  message: "Contact deleted successfully"
}, null, 2));

console.log('\nError Response:');
console.log(JSON.stringify({
  success: false,
  message: "Contact not found"
}, null, 2));

console.log('\n📊 STATUS WORKFLOW');
console.log('==================');
console.log('new → read → replied → resolved');
console.log('');
console.log('Status Descriptions:');
console.log('• new: Newly submitted contact form (default)');
console.log('• read: Contact has been viewed by admin');
console.log('• replied: Admin has responded to the contact');
console.log('• resolved: Issue/inquiry has been resolved');

console.log('\n✅ VALIDATION RULES');
console.log('===================');
console.log('• First Name: 2-50 characters, required');
console.log('• Last Name: 2-50 characters, required');
console.log('• Email: Valid email format, required');
console.log('• Message: 10-2000 characters, required');
console.log('• Status: Must be one of: new, read, replied, resolved');

console.log('\n🎨 UI INTEGRATION PATTERN');
console.log('=========================');
console.log('1. Contact Form Page: Use POST /addcontact');
console.log('2. Admin List Page: Use GET /getcontacts (show name + email)');
console.log('3. Admin Details Page: Use GET /getcontactbyid/:id (show full message)');
console.log('4. Notification Badge: Use GET /getunreadcontacts (count)');
console.log('5. Status Management: Use PUT /updatecontactstatus/:id');

console.log('\n📚 Complete documentation: docs/CONTACT_API_DOCUMENTATION.md');
