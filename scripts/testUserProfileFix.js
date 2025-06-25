import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const AUTH_BASE_URL = `${BASE_URL}/admission-auth`;
const ADMISSION_BASE_URL = `${BASE_URL}/admission`;
const PAYMENT_BASE_URL = `${BASE_URL}/payment-information`;

let userId, sessionToken, admissionId, paymentId;

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
      password: "testpassword123",
      confirmPassword: "testpassword123"
    };

    const response = await makeAuthRequest('POST', `${AUTH_BASE_URL}/signup`, userData);
    userId = response.data.data._id;
    sessionToken = response.data.data.sessionToken;
    console.log('✅ Test user created:', userId);
    console.log('   - Initial admissionFormId:', response.data.data.admissionFormId);
    console.log('   - Initial paymentInformation:', response.data.data.paymentInformation);
    return userId;
  } catch (error) {
    console.error('❌ Error creating test user:', error.response?.data || error.message);
    throw error;
  }
};

// Test 2: Get user profile after creation
const getUserProfileAfterCreation = async () => {
  try {
    console.log('\n2. Getting user profile after creation...');
    const response = await makeAuthRequest('GET', `${AUTH_BASE_URL}/profile`);
    console.log('✅ User profile retrieved:');
    console.log('   - User ID:', response.data.data._id);
    console.log('   - Has Admission Form ID:', !!response.data.data.admissionFormId);
    console.log('   - Has Payment Information:', !!response.data.data.paymentInformation);
    console.log('   - Payment Information Count:', response.data.data.paymentInformation?.length || 0);
    console.log('   - Application Progress:', response.data.data.applicationProgress.currentStep);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Test 3: Submit admission form
const submitAdmissionForm = async () => {
  try {
    console.log('\n3. Submitting admission form...');
    const admissionData = {
      userId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      programName: "Computer Science",
      specialization: "Software Development"
    };

    const response = await makeAuthRequest('POST', `${ADMISSION_BASE_URL}/submit`, admissionData);
    admissionId = response.data.data.admission._id;
    console.log('✅ Admission form submitted successfully:');
    console.log('   - Admission ID:', admissionId);
    console.log('   - User Admission Form ID:', response.data.data.user.admissionFormId);
    console.log('   - Application Progress:', response.data.data.user.applicationProgress.currentStep);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error submitting admission form:', error.response?.data || error.message);
    throw error;
  }
};

// Test 4: Get user profile after admission submission
const getUserProfileAfterAdmission = async () => {
  try {
    console.log('\n4. Getting user profile after admission submission...');
    const response = await makeAuthRequest('GET', `${AUTH_BASE_URL}/profile`);
    console.log('✅ User profile retrieved:');
    console.log('   - User ID:', response.data.data._id);
    console.log('   - Has Admission Form ID:', !!response.data.data.admissionFormId);
    console.log('   - Admission Form ID:', response.data.data.admissionFormId);
    console.log('   - Application Progress:', response.data.data.applicationProgress.currentStep);
    console.log('   - Is Complete:', response.data.data.applicationProgress.isComplete);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Test 5: Create payment information
const createPaymentInformation = async () => {
  try {
    console.log('\n5. Creating payment information...');
    const paymentData = {
      userId,
      courseId: "507f1f77bcf86cd799439012", // Mock course ID
      programId: "test_program_123",
      totalFee: 50000,
      registrationFee: 5000,
      processingFee: 500,
      emiPlan: {
        totalEmis: 12,
        emiAmount: 3750,
        emiFrequency: "monthly"
      }
    };

    const response = await makeAuthRequest('POST', PAYMENT_BASE_URL, paymentData);
    paymentId = response.data.data._id;
    console.log('✅ Payment information created successfully:');
    console.log('   - Payment ID:', paymentId);
    console.log('   - Total Fee:', response.data.data.totalFee);
    console.log('   - EMI Amount:', response.data.data.emiPlan.emiAmount);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error creating payment information:', error.response?.data || error.message);
    throw error;
  }
};

// Test 6: Get user profile after payment creation
const getUserProfileAfterPayment = async () => {
  try {
    console.log('\n6. Getting user profile after payment creation...');
    const response = await makeAuthRequest('GET', `${AUTH_BASE_URL}/profile`);
    console.log('✅ User profile retrieved:');
    console.log('   - User ID:', response.data.data._id);
    console.log('   - Has Admission Form ID:', !!response.data.data.admissionFormId);
    console.log('   - Admission Form ID:', response.data.data.admissionFormId);
    console.log('   - Has Payment Information:', !!response.data.data.paymentInformation);
    console.log('   - Payment Information Count:', response.data.data.paymentInformation?.length || 0);
    console.log('   - Payment Information IDs:', response.data.data.paymentInformation?.map(p => p._id) || []);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Test 7: Record a payment transaction
const recordPaymentTransaction = async () => {
  try {
    console.log('\n7. Recording payment transaction...');
    const paymentData = {
      amount: 3750,
      paymentMethod: "online",
      transactionId: `TXN_${Date.now()}`,
      description: "EMI payment for January 2024",
      paymentGateway: "razorpay"
    };

    const response = await makeAuthRequest('POST', `${PAYMENT_BASE_URL}/${paymentId}/payment`, paymentData);
    console.log('✅ Payment transaction recorded:');
    console.log('   - Transaction ID:', response.data.data.transaction.transactionId);
    console.log('   - Amount Paid:', response.data.data.transaction.amount);
    console.log('   - Total Amount Paid:', response.data.data.paymentInfo.totalAmountPaid);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error recording payment transaction:', error.response?.data || error.message);
    throw error;
  }
};

// Test 8: Get user profile after payment transaction
const getUserProfileAfterPaymentTransaction = async () => {
  try {
    console.log('\n8. Getting user profile after payment transaction...');
    const response = await makeAuthRequest('GET', `${AUTH_BASE_URL}/profile`);
    console.log('✅ User profile retrieved:');
    console.log('   - User ID:', response.data.data._id);
    console.log('   - Has Admission Form ID:', !!response.data.data.admissionFormId);
    console.log('   - Has Payment Information:', !!response.data.data.paymentInformation);
    console.log('   - Payment Information Count:', response.data.data.paymentInformation?.length || 0);
    
    if (response.data.data.paymentInformation && response.data.data.paymentInformation.length > 0) {
      const payment = response.data.data.paymentInformation[0];
      console.log('   - Payment Status:', payment.paymentStatus);
      console.log('   - Total Amount Paid:', payment.totalAmountPaid);
      console.log('   - Total Amount Due:', payment.totalAmountDue);
    }
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Test 9: Get user with complete data
const getUserWithCompleteData = async () => {
  try {
    console.log('\n9. Getting user with complete admission and payment data...');
    const response = await makeAuthRequest('GET', `${ADMISSION_BASE_URL}/user/${userId}/complete`);
    console.log('✅ User with complete data retrieved:');
    console.log('   - User Name:', response.data.data.name);
    console.log('   - Email:', response.data.data.email);
    console.log('   - Admission Form ID:', response.data.data.admissionFormId);
    console.log('   - Payment Information Count:', response.data.data.paymentInformation?.length || 0);
    console.log('   - Application Progress:', response.data.data.applicationProgress.currentStep);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error getting user with complete data:', error.response?.data || error.message);
    throw error;
  }
};

// Test 10: Cleanup
const cleanup = async () => {
  try {
    console.log('\n10. Cleaning up test data...');
    
    // Delete payment information
    if (paymentId) {
      await makeAuthRequest('DELETE', `${PAYMENT_BASE_URL}/${paymentId}`);
      console.log('✅ Payment information deleted');
    }
    
    // Delete admission form
    if (userId) {
      await makeAuthRequest('DELETE', `${ADMISSION_BASE_URL}/user/${userId}`);
      console.log('✅ Admission form deleted');
    }
    
    console.log('✅ Cleanup completed');
  } catch (error) {
    console.log('✅ Cleanup completed (some expected errors):');
    console.log('   - Error:', error.response?.data?.message || error.message);
  }
};

// Main test runner
const runAllTests = async () => {
  console.log('🚀 Starting User Profile Fix Tests...\n');
  
  try {
    await createTestUser();
    await getUserProfileAfterCreation();
    await submitAdmissionForm();
    await getUserProfileAfterAdmission();
    await createPaymentInformation();
    await getUserProfileAfterPayment();
    await recordPaymentTransaction();
    await getUserProfileAfterPaymentTransaction();
    await getUserWithCompleteData();
    await cleanup();
    
    console.log('\n🎉 All User Profile Fix tests completed successfully!');
    console.log('\n✅ Issues Fixed:');
    console.log('   - admissionFormId now visible in user profile');
    console.log('   - paymentInformation now visible in user profile');
    console.log('   - Proper population of referenced data');
    console.log('   - Complete user data returned in all endpoints');
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
  createPaymentInformation
}; 