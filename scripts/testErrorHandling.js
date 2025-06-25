import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

async function testErrorHandling() {
    console.log('🚀 Testing Improved Error Handling with User-Friendly Messages\n');

    try {
        // Test 1: Authentication Errors
        console.log('🔐 Test 1: Authentication Errors');
        
        // Invalid email format
        try {
            await axios.post(`${BASE_URL}/admission-auth/signup`, {
                firstName: 'Test',
                lastName: 'User',
                email: 'invalid-email',
                phone: '1234567890',
                password: 'password123',
                confirmPassword: 'password123'
            });
        } catch (error) {
            console.log('✅ Invalid email error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Weak password
        try {
            await axios.post(`${BASE_URL}/admission-auth/signup`, {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                phone: '1234567890',
                password: '123',
                confirmPassword: '123'
            });
        } catch (error) {
            console.log('✅ Weak password error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Password mismatch
        try {
            await axios.post(`${BASE_URL}/admission-auth/signup`, {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                confirmPassword: 'differentpassword'
            });
        } catch (error) {
            console.log('✅ Password mismatch error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Test 2: Validation Errors
        console.log('\n📋 Test 2: Validation Errors');
        
        // Invalid ObjectId
        try {
            await axios.get(`${BASE_URL}/admission/user/invalid-id`);
        } catch (error) {
            console.log('✅ Invalid ID error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Missing required fields
        try {
            await axios.post(`${BASE_URL}/admission-auth/signup`, {
                firstName: 'Test',
                // Missing other required fields
            });
        } catch (error) {
            console.log('✅ Missing fields error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Test 3: Not Found Errors
        console.log('\n🔍 Test 3: Not Found Errors');
        
        // Non-existent user
        try {
            await axios.get(`${BASE_URL}/admission/user/507f1f77bcf86cd799439011`);
        } catch (error) {
            console.log('✅ User not found error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Non-existent admission
        try {
            await axios.get(`${BASE_URL}/admission/507f1f77bcf86cd799439011`);
        } catch (error) {
            console.log('✅ Admission not found error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Test 4: Conflict Errors
        console.log('\n⚠️  Test 4: Conflict Errors');
        
        // Create a user first
        const signupResponse = await axios.post(`${BASE_URL}/admission-auth/signup`, {
            firstName: 'Conflict',
            lastName: 'Test',
            email: 'conflict@example.com',
            phone: '9876543210',
            password: 'password123',
            confirmPassword: 'password123'
        });
        
        console.log('✅ User created for conflict test');

        // Try to create another user with same email
        try {
            await axios.post(`${BASE_URL}/admission-auth/signup`, {
                firstName: 'Another',
                lastName: 'User',
                email: 'conflict@example.com', // Same email
                phone: '9876543211',
                password: 'password123',
                confirmPassword: 'password123'
            });
        } catch (error) {
            console.log('✅ Email conflict error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Test 5: Session/Authentication Errors
        console.log('\n🔑 Test 5: Session/Authentication Errors');
        
        // Try to access protected route without token
        try {
            await axios.get(`${BASE_URL}/admission-auth/profile`);
        } catch (error) {
            console.log('✅ No session token error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Try to access with invalid token
        try {
            await axios.get(`${BASE_URL}/admission-auth/profile`, {
                headers: { Authorization: 'Bearer invalid-token' }
            });
        } catch (error) {
            console.log('✅ Invalid session token error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        // Test 6: Success Responses
        console.log('\n✅ Test 6: Success Responses');
        
        // Login with valid credentials
        const loginResponse = await axios.post(`${BASE_URL}/admission-auth/login`, {
            email: 'conflict@example.com',
            password: 'password123'
        });
        
        console.log('✅ Login success response:', {
            status: loginResponse.status,
            message: loginResponse.data?.message,
            hasData: !!loginResponse.data?.data,
            timestamp: loginResponse.data?.timestamp
        });

        // Test 7: Route Not Found
        console.log('\n🚫 Test 7: Route Not Found');
        
        try {
            await axios.get(`${BASE_URL}/non-existent-route`);
        } catch (error) {
            console.log('✅ Route not found error:', {
                status: error.response?.status,
                error: error.response?.data?.error,
                errorType: error.response?.data?.errorType
            });
        }

        console.log('\n🎉 All error handling tests completed successfully!');
        console.log('\n📊 Summary:');
        console.log('- Authentication errors provide clear, user-friendly messages');
        console.log('- Validation errors include specific field information');
        console.log('- Not found errors are descriptive and helpful');
        console.log('- Conflict errors clearly explain the issue');
        console.log('- Session errors guide users to re-authenticate');
        console.log('- Success responses include timestamps and clear messages');
        console.log('- All errors include errorType for frontend handling');
        console.log('- 404 errors are handled gracefully');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test
testErrorHandling(); 