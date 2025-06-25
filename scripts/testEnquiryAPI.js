import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api/v1/enquiries';

// Test configuration
const testConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Utility function to make API calls
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...testConfig,
      ...options,
    });
    
    const data = await response.json();
    
    return {
      status: response.status,
      ok: response.ok,
      data,
    };
  } catch (error) {
    console.error('Request failed:', error.message);
    return {
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

// Test functions
async function testGetEnquiries() {
  console.log('\n🧪 Testing GET /enquiries');
  
  const result = await makeRequest(API_BASE_URL);
  
  if (result.ok && result.data.success) {
    console.log('✅ Get Enquiries - SUCCESS');
    console.log(`   Found ${result.data.data.length} enquiries`);
  } else {
    console.log('❌ Get Enquiries - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testGetEnquiryStats() {
  console.log('\n🧪 Testing GET /enquiries/stats');
  
  const result = await makeRequest(`${API_BASE_URL}/stats`);
  
  if (result.ok && result.data.success) {
    console.log('✅ Get Enquiry Stats - SUCCESS');
    console.log('   Stats:', result.data.data);
  } else {
    console.log('❌ Get Enquiry Stats - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testCreateEnquiry() {
  console.log('\n🧪 Testing POST /enquiries');
  
  const newEnquiry = {
    name: 'Test User',
    phoneNumber: '+91 1234567890',
    email: 'test@example.com',
    city: 'Test City',
    course: 'Test Course',
    message: 'This is a test enquiry',
    source: 'Test Source',
  };
  
  const result = await makeRequest(API_BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newEnquiry),
  });
  
  if (result.ok && result.data.success) {
    console.log('✅ Create Enquiry - SUCCESS');
    console.log('   Created enquiry ID:', result.data.data._id);
    return result.data.data._id;
  } else {
    console.log('❌ Create Enquiry - FAILED');
    console.log('   Response:', result.data);
    return null;
  }
}

async function testGetEnquiryById(enquiryId) {
  if (!enquiryId) {
    console.log('\n🧪 Testing GET /enquiries/:id - SKIPPED (no enquiry ID)');
    return;
  }
  
  console.log('\n🧪 Testing GET /enquiries/:id');
  
  const result = await makeRequest(`${API_BASE_URL}/${enquiryId}`);
  
  if (result.ok && result.data.success) {
    console.log('✅ Get Enquiry by ID - SUCCESS');
    console.log('   Enquiry:', result.data.data.name);
  } else {
    console.log('❌ Get Enquiry by ID - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testUpdateEnquiryStatus(enquiryId) {
  if (!enquiryId) {
    console.log('\n🧪 Testing PATCH /enquiries/:id/status - SKIPPED (no enquiry ID)');
    return;
  }
  
  console.log('\n🧪 Testing PATCH /enquiries/:id/status');
  
  const updateData = {
    status: 'contacted',
    notes: 'Test status update - contacted the customer',
  };
  
  const result = await makeRequest(`${API_BASE_URL}/${enquiryId}/status`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
  
  if (result.ok && result.data.success) {
    console.log('✅ Update Enquiry Status - SUCCESS');
    console.log('   Updated status to:', result.data.data.status);
  } else {
    console.log('❌ Update Enquiry Status - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testUpdateEnquiry(enquiryId) {
  if (!enquiryId) {
    console.log('\n🧪 Testing PUT /enquiries/:id - SKIPPED (no enquiry ID)');
    return;
  }
  
  console.log('\n🧪 Testing PUT /enquiries/:id');
  
  const updateData = {
    name: 'Updated Test User',
    phoneNumber: '+91 9876543210',
    notes: 'Updated via API test',
  };
  
  const result = await makeRequest(`${API_BASE_URL}/${enquiryId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
  
  if (result.ok && result.data.success) {
    console.log('✅ Update Enquiry - SUCCESS');
    console.log('   Updated name to:', result.data.data.name);
  } else {
    console.log('❌ Update Enquiry - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testSearchEnquiries() {
  console.log('\n🧪 Testing GET /enquiries/search');
  
  const result = await makeRequest(`${API_BASE_URL}/search?query=test`);
  
  if (result.ok && result.data.success) {
    console.log('✅ Search Enquiries - SUCCESS');
    console.log(`   Found ${result.data.data.length} matching enquiries`);
  } else {
    console.log('❌ Search Enquiries - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testGetEnquiriesByStatus() {
  console.log('\n🧪 Testing GET /enquiries/status/:status');
  
  const result = await makeRequest(`${API_BASE_URL}/status/new`);
  
  if (result.ok && result.data.success) {
    console.log('✅ Get Enquiries by Status - SUCCESS');
    console.log(`   Found ${result.data.data.length} enquiries with status 'new'`);
  } else {
    console.log('❌ Get Enquiries by Status - FAILED');
    console.log('   Response:', result.data);
  }
}

async function testDeleteEnquiry(enquiryId) {
  if (!enquiryId) {
    console.log('\n🧪 Testing DELETE /enquiries/:id - SKIPPED (no enquiry ID)');
    return;
  }
  
  console.log('\n🧪 Testing DELETE /enquiries/:id');
  
  const result = await makeRequest(`${API_BASE_URL}/${enquiryId}`, {
    method: 'DELETE',
  });
  
  if (result.ok && result.data.success) {
    console.log('✅ Delete Enquiry - SUCCESS');
    console.log('   Enquiry deleted successfully');
  } else {
    console.log('❌ Delete Enquiry - FAILED');
    console.log('   Response:', result.data);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Enquiry API Tests...');
  console.log('📍 API Base URL:', API_BASE_URL);
  
  try {
    // Test 1: Get all enquiries
    await testGetEnquiries();
    
    // Test 2: Get enquiry statistics
    await testGetEnquiryStats();
    
    // Test 3: Create new enquiry
    const enquiryId = await testCreateEnquiry();
    
    // Test 4: Get enquiry by ID
    await testGetEnquiryById(enquiryId);
    
    // Test 5: Update enquiry status
    await testUpdateEnquiryStatus(enquiryId);
    
    // Test 6: Update enquiry
    await testUpdateEnquiry(enquiryId);
    
    // Test 7: Search enquiries
    await testSearchEnquiries();
    
    // Test 8: Get enquiries by status
    await testGetEnquiriesByStatus();
    
    // Test 9: Delete enquiry
    await testDeleteEnquiry(enquiryId);
    
    console.log('\n🎉 All Enquiry API tests completed!');
    
  } catch (error) {
    console.error('\n💥 Test execution failed:', error);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export { runAllTests }; 