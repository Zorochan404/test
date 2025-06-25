import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5500/api/v1/admission-auth';

// Test data
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    password: 'password123',
    confirmPassword: 'password123'
};

const testLogin = {
    email: 'test@example.com',
    password: 'password123'
};

let sessionToken = null;

// Utility function to make API calls
async function makeRequest(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, finalOptions);
        const data = await response.json();
        
        return {
            status: response.status,
            data,
            success: response.ok
        };
    } catch (error) {
        console.error(`❌ Request failed: ${error.message}`);
        return {
            status: 0,
            data: { error: error.message },
            success: false
        };
    }
}

// Test functions
async function testHealthCheck() {
    console.log('\n🔍 Testing Health Check...');
    const result = await makeRequest('/health');
    
    if (result.success) {
        console.log('✅ Health check passed');
        console.log('📊 Response:', result.data);
    } else {
        console.log('❌ Health check failed');
        console.log('📊 Response:', result.data);
    }
}

async function testSignup() {
    console.log('\n🔍 Testing User Signup...');
    const result = await makeRequest('/signup', {
        method: 'POST',
        body: JSON.stringify(testUser)
    });
    
    if (result.success) {
        console.log('✅ Signup successful');
        console.log('📊 User ID:', result.data.data.user.id);
        console.log('📊 Application ID:', result.data.data.user.applicationId);
        console.log('📊 Session Token:', result.data.data.sessionToken);
        
        // Store session token for other tests
        sessionToken = result.data.data.sessionToken;
    } else {
        console.log('❌ Signup failed');
        console.log('📊 Error:', result.data.error);
    }
}

async function testLogin() {
    console.log('\n🔍 Testing User Login...');
    const result = await makeRequest('/login', {
        method: 'POST',
        body: JSON.stringify(testLogin)
    });
    
    if (result.success) {
        console.log('✅ Login successful');
        console.log('📊 User ID:', result.data.data.user.id);
        console.log('📊 Session Token:', result.data.data.sessionToken);
        
        // Update session token
        sessionToken = result.data.data.sessionToken;
    } else {
        console.log('❌ Login failed');
        console.log('📊 Error:', result.data.error);
    }
}

async function testGetProfile() {
    console.log('\n🔍 Testing Get Profile...');
    
    if (!sessionToken) {
        console.log('❌ No session token available');
        return;
    }
    
    const result = await makeRequest('/profile', {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    });
    
    if (result.success) {
        console.log('✅ Profile retrieved successfully');
        console.log('📊 User:', result.data.data.user.name);
        console.log('📊 Application Progress Step:', result.data.data.applicationProgress.currentStep);
    } else {
        console.log('❌ Profile retrieval failed');
        console.log('📊 Error:', result.data.error);
    }
}

async function testUpdateApplicationProgress() {
    console.log('\n🔍 Testing Update Application Progress...');
    
    if (!sessionToken) {
        console.log('❌ No session token available');
        return;
    }
    
    const updateData = {
        step: 'personal-info',
        data: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1995-05-15',
            gender: 'Male',
            religion: 'Hindu',
            aadharNumber: '123456789012',
            permanentAddress: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            fathersName: 'Robert Doe',
            fathersPhone: '9876543211',
            fathersOccupation: 'Engineer',
            fathersQualification: 'B.Tech',
            mothersName: 'Jane Doe',
            mothersPhone: '9876543212',
            mothersOccupation: 'Teacher',
            mothersQualification: 'M.A',
            parentsAnnualIncome: '800000',
            parentsAddress: '123 Main Street, Mumbai'
        }
    };
    
    const result = await makeRequest('/application-progress', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(updateData)
    });
    
    if (result.success) {
        console.log('✅ Application progress updated successfully');
        console.log('📊 Current Step:', result.data.data.applicationProgress.currentStep);
        console.log('📊 First Name:', result.data.data.applicationProgress.personalInfo.firstName);
    } else {
        console.log('❌ Application progress update failed');
        console.log('📊 Error:', result.data.error);
    }
}

async function testLogout() {
    console.log('\n🔍 Testing Logout...');
    
    if (!sessionToken) {
        console.log('❌ No session token available');
        return;
    }
    
    const result = await makeRequest('/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    });
    
    if (result.success) {
        console.log('✅ Logout successful');
        console.log('📊 Message:', result.data.message);
        
        // Clear session token
        sessionToken = null;
    } else {
        console.log('❌ Logout failed');
        console.log('📊 Error:', result.data.error);
    }
}

// Main test runner
async function runAllTests() {
    console.log('🚀 Starting Admission Auth API Tests...');
    console.log('📍 Base URL:', BASE_URL);
    
    try {
        await testHealthCheck();
        await testSignup();
        await testLogin();
        await testGetProfile();
        await testUpdateApplicationProgress();
        await testLogout();
        
        console.log('\n🎉 All tests completed!');
        
    } catch (error) {
        console.error('\n💥 Test suite failed:', error.message);
    }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests();
}

export {
    runAllTests,
    makeRequest,
    testHealthCheck,
    testSignup,
    testLogin,
    testGetProfile,
    testUpdateApplicationProgress,
    testLogout
}; 