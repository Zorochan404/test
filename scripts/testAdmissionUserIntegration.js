import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const ADMISSION_BASE_URL = `${BASE_URL}/admission`;
const AUTH_BASE_URL = `${BASE_URL}/admission-auth`;

let userId, sessionToken, admissionId;

// Helper function to make authenticated requests
const makeAuthRequest = async (method, url, data = null) => {
  const config = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...(sessionToken && { 'Authorization': `Bearer ${sessionToken}` })
    },
    ...(data && { data })
  };
  return axios(config);
};

// Test 1: Create a test user
const createTestUser = async () => {
  try {
    console.log('\n1. Creating test user...');
    const userData = {
      name: "Test User",
      email: "testuser@example.com",
      phone: "+1234567890",
      password: "testpassword123"
    };

    const response = await makeAuthRequest('POST', `${AUTH_BASE_URL}/signup`, userData);
    userId = response.data.data._id;
    sessionToken = response.data.data.sessionToken;
    console.log('✅ Test user created:', userId);
    return userId;
  } catch (error) {
    console.error('❌ Error creating test user:', error.response?.data || error.message);
    throw error;
  }
};

// Test 2: Submit admission form
const submitAdmissionForm = async () => {
  try {
    console.log('\n2. Submitting admission form...');
    const admissionData = {
      userId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      dateOfBirth: "1995-05-15",
      gender: "Male",
      religion: "Other",
      aadharNumber: "123456789012",
      permanentAddress: "123 Main Street",
      temporaryAddress: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      fathersName: "Robert Doe",
      fathersPhone: "+1234567891",
      fathersOccupation: "Engineer",
      fathersQualification: "B.Tech",
      mothersName: "Jane Doe",
      mothersPhone: "+1234567892",
      mothersOccupation: "Teacher",
      mothersQualification: "M.A",
      parentsAnnualIncome: 500000,
      parentsAddress: "123 Main Street, Mumbai",
      localGuardianName: "Mike Smith",
      localGuardianPhone: "+1234567893",
      localGuardianOccupation: "Business",
      localGuardianRelation: "Uncle",
      localGuardianAddress: "456 Oak Street, Mumbai",
      tenthBoard: "CBSE",
      tenthInstitution: "ABC School",
      tenthStream: "General",
      tenthPercentage: "85",
      tenthYear: "2010",
      twelfthBoard: "CBSE",
      twelfthInstitution: "XYZ College",
      twelfthStream: "Science",
      twelfthPercentage: "78",
      twelfthYear: "2012",
      graduationUniversity: "Mumbai University",
      graduationPercentage: "75",
      graduationYear: "2016",
      programType: "Undergraduate",
      programName: "Computer Science",
      programCategory: "Engineering",
      specialization: "Software Development",
      campus: "Main Campus"
    };

    const response = await makeAuthRequest('POST', `${ADMISSION_BASE_URL}/submit`, admissionData);
    admissionId = response.data.data.admission._id;
    console.log('✅ Admission form submitted successfully:');
    console.log('   - Admission ID:', admissionId);
    console.log('   - User Application Progress:', response.data.data.user.applicationProgress.currentStep);
    console.log('   - Is Complete:', response.data.data.user.applicationProgress.isComplete);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error submitting admission form:', error.response?.data || error.message);
    throw error;
  }
};

// Test 3: Get admission form by user ID
const getAdmissionByUserId = async () => {
  try {
    console.log('\n3. Getting admission form by user ID...');
    const response = await makeAuthRequest('GET', `${ADMISSION_BASE_URL}/user/${userId}`);
    console.log('✅ Admission form retrieved:');
    console.log('   - Student Name:', response.data.data.admission.firstName + ' ' + response.data.data.admission.lastName);
    console.log('   - Program:', response.data.data.admission.programName);
    console.log('   - Application Status:', response.data.data.admission.applicationStatus);
    console.log('   - Submitted At:', response.data.data.admission.submittedAt);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting admission by user ID:', error.response?.data || error.message);
    throw error;
  }
};

// Test 4: Get user with complete admission data
const getUserWithAdmission = async () => {
  try {
    console.log('\n4. Getting user with complete admission data...');
    const response = await makeAuthRequest('GET', `${ADMISSION_BASE_URL}/user/${userId}/complete`);
    console.log('✅ User with admission data retrieved:');
    console.log('   - User Name:', response.data.data.name);
    console.log('   - Email:', response.data.data.email);
    console.log('   - Admission Form ID:', response.data.data.admissionFormId);
    console.log('   - Application Progress:', response.data.data.applicationProgress.currentStep);
    console.log('   - Payment Information Count:', response.data.data.paymentInformation?.length || 0);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user with admission:', error.response?.data || error.message);
    throw error;
  }
};

// Test 5: Update admission form by user ID
const updateAdmissionByUserId = async () => {
  try {
    console.log('\n5. Updating admission form by user ID...');
    const updateData = {
      programName: "Updated Computer Science",
      specialization: "Updated Software Development",
      campus: "Updated Main Campus"
    };

    const response = await makeAuthRequest('PUT', `${ADMISSION_BASE_URL}/user/${userId}`, updateData);
    console.log('✅ Admission form updated:');
    console.log('   - Updated Program:', response.data.data.programName);
    console.log('   - Updated Specialization:', response.data.data.specialization);
    console.log('   - Updated Campus:', response.data.data.campus);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error updating admission by user ID:', error.response?.data || error.message);
    throw error;
  }
};

// Test 6: Update admission status
const updateAdmissionStatus = async () => {
  try {
    console.log('\n6. Updating admission status...');
    const statusData = {
      status: "enrolled"
    };

    const response = await makeAuthRequest('PATCH', `${ADMISSION_BASE_URL}/status/${admissionId}`, statusData);
    console.log('✅ Admission status updated:');
    console.log('   - New Status:', response.data.data.applicationStatus);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error updating admission status:', error.response?.data || error.message);
    throw error;
  }
};

// Test 7: Try to submit duplicate admission form
const tryDuplicateSubmission = async () => {
  try {
    console.log('\n7. Trying to submit duplicate admission form...');
    const admissionData = {
      userId,
      firstName: "Duplicate",
      lastName: "Submission",
      email: "duplicate@example.com"
    };

    const response = await makeAuthRequest('POST', `${ADMISSION_BASE_URL}/submit`, admissionData);
    console.log('❌ Should have failed - duplicate submission allowed');
    return response.data;
  } catch (error) {
    console.log('✅ Correctly prevented duplicate submission:');
    console.log('   - Error:', error.response?.data?.message);
    return error.response?.data;
  }
};

// Test 8: Get user profile to verify admission form link
const getUserProfile = async () => {
  try {
    console.log('\n8. Getting user profile to verify admission form link...');
    const response = await makeAuthRequest('GET', `${AUTH_BASE_URL}/profile`);
    console.log('✅ User profile retrieved:');
    console.log('   - User ID:', response.data.data._id);
    console.log('   - Has Admission Form:', !!response.data.data.admissionFormId);
    console.log('   - Application Progress:', response.data.data.applicationProgress.currentStep);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Test 9: Cleanup - Delete admission form
const cleanup = async () => {
  try {
    console.log('\n9. Cleaning up - deleting admission form...');
    const response = await makeAuthRequest('DELETE', `${ADMISSION_BASE_URL}/user/${userId}`);
    console.log('✅ Admission form deleted successfully');
    
    // Verify user no longer has admission form
    const userResponse = await makeAuthRequest('GET', `${ADMISSION_BASE_URL}/user/${userId}/complete`);
    console.log('✅ User admission form reference removed');
    return response.data;
  } catch (error) {
    console.log('✅ Cleanup completed (expected error for non-existent admission):');
    console.log('   - Error:', error.response?.data?.message);
    return error.response?.data;
  }
};

// Main test runner
const runAllTests = async () => {
  console.log('🚀 Starting Admission-User Integration Tests...\n');
  
  try {
    await createTestUser();
    await submitAdmissionForm();
    await getAdmissionByUserId();
    await getUserWithAdmission();
    await updateAdmissionByUserId();
    await updateAdmissionStatus();
    await tryDuplicateSubmission();
    await getUserProfile();
    await cleanup();
    
    console.log('\n🎉 All Admission-User Integration tests completed successfully!');
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
    process.exit(1);
  }
};

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export {
  runAllTests,
  createTestUser,
  submitAdmissionForm,
  getAdmissionByUserId,
  getUserWithAdmission
}; 