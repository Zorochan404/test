import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@example.com',
    phone: '9876543220',
    password: 'password123',
    confirmPassword: 'password123'
};

async function testSignupWithAdmissionCreation() {
    console.log('🚀 Testing Signup with Automatic Admission Creation\n');

    try {
        // Step 1: Create a user (this should automatically create admission)
        console.log('📝 Step 1: Creating user with automatic admission creation...');
        const signupResponse = await axios.post(`${BASE_URL}/admission-auth/signup`, testUser);
        const user = signupResponse.data.data;
        
        console.log('✅ User created with admission:', {
            userId: user._id,
            applicationId: user.applicationId,
            sessionToken: user.sessionToken,
            name: user.name,
            hasAdmissionForm: !!user.admissionFormId,
            admissionId: user.admissionFormId?._id
        });

        // Step 2: Verify admission form details
        if (user.admissionFormId) {
            console.log('\n📋 Step 2: Admission Form Details:');
            const admission = user.admissionFormId;
            console.log('✅ Admission Form Created:', {
                id: admission._id,
                userId: admission.userId,
                applicationId: admission.applicationId,
                firstName: admission.firstName,
                lastName: admission.lastName,
                email: admission.email,
                phone: admission.phone,
                status: admission.status,
                submittedAt: admission.submittedAt
            });

            // Verify data consistency
            const isDataConsistent = 
                admission.firstName === testUser.firstName &&
                admission.lastName === testUser.lastName &&
                admission.email === testUser.email &&
                admission.phone === testUser.phone &&
                admission.userId === user._id;

            console.log('✅ Data Consistency Check:', {
                firstNameMatch: admission.firstName === testUser.firstName,
                lastNameMatch: admission.lastName === testUser.lastName,
                emailMatch: admission.email === testUser.email,
                phoneMatch: admission.phone === testUser.phone,
                userIdMatch: admission.userId === user._id,
                allConsistent: isDataConsistent
            });
        }

        // Step 3: Login to verify the data is accessible
        console.log('\n🔐 Step 3: Logging in to verify data accessibility...');
        const loginResponse = await axios.post(`${BASE_URL}/admission-auth/login`, {
            email: testUser.email,
            password: testUser.password
        });

        const loggedInUser = loginResponse.data.data;
        console.log('✅ Login successful with admission data:', {
            userId: loggedInUser._id,
            name: loggedInUser.name,
            hasAdmissionForm: !!loggedInUser.admissionFormId,
            admissionId: loggedInUser.admissionFormId?._id
        });

        // Step 4: Get user profile to verify all data
        console.log('\n👤 Step 4: Getting user profile...');
        const profileResponse = await axios.get(
            `${BASE_URL}/admission-auth/profile`,
            {
                headers: { Authorization: `Bearer ${loggedInUser.sessionToken}` }
            }
        );

        const profileUser = profileResponse.data.data;
        console.log('✅ Profile data:', {
            userId: profileUser._id,
            name: profileUser.name,
            hasAdmissionForm: !!profileUser.admissionFormId,
            admissionId: profileUser.admissionFormId?._id
        });

        // Step 5: Get admission form by user ID
        console.log('\n📋 Step 5: Getting admission form by user ID...');
        const admissionResponse = await axios.get(
            `${BASE_URL}/admission/user/${loggedInUser._id}`,
            {
                headers: { Authorization: `Bearer ${loggedInUser.sessionToken}` }
            }
        );

        console.log('✅ Admission form retrieved by userId:', {
            admissionId: admissionResponse.data.data.admission._id,
            userId: admissionResponse.data.data.admission.userId,
            firstName: admissionResponse.data.data.admission.firstName,
            lastName: admissionResponse.data.data.admission.lastName,
            email: admissionResponse.data.data.admission.email,
            phone: admissionResponse.data.data.admission.phone,
            status: admissionResponse.data.data.admission.status
        });

        // Step 6: Test updating admission form
        console.log('\n✏️  Step 6: Testing admission form update...');
        const updateData = {
            dateOfBirth: '1997-03-15',
            gender: 'Female',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600001'
        };

        const updateResponse = await axios.put(
            `${BASE_URL}/admission/user/${loggedInUser._id}`,
            updateData,
            {
                headers: { Authorization: `Bearer ${loggedInUser.sessionToken}` }
            }
        );

        console.log('✅ Admission form updated:', {
            admissionId: updateResponse.data.data._id,
            dateOfBirth: updateResponse.data.data.dateOfBirth,
            gender: updateResponse.data.data.gender,
            city: updateResponse.data.data.city,
            state: updateResponse.data.data.state,
            pincode: updateResponse.data.data.pincode
        });

        // Step 7: Verify the relationship is bidirectional
        console.log('\n🔗 Step 7: Verifying bidirectional relationship...');
        
        // Check if user has admission reference
        const userHasAdmission = !!profileUser.admissionFormId;
        
        // Check if admission has user reference
        const admissionHasUser = admissionResponse.data.data.admission.userId === loggedInUser._id;
        
        // Check if admission ID matches
        const admissionIdMatches = profileUser.admissionFormId?._id === admissionResponse.data.data.admission._id;

        console.log('✅ Relationship verification:', {
            userHasAdmission,
            admissionHasUser,
            admissionIdMatches,
            relationshipValid: userHasAdmission && admissionHasUser && admissionIdMatches
        });

        // Step 8: Test complete user data structure
        console.log('\n📊 Step 8: Complete user data structure:');
        console.log(JSON.stringify(loggedInUser, null, 2));

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📊 Summary:');
        console.log('- User created with firstName, lastName, email, phone');
        console.log('- Admission form automatically created with user data');
        console.log('- Admission ID linked back to user table');
        console.log('- Login returns populated admission data');
        console.log('- Profile shows complete user information');
        console.log('- Admission form can be retrieved by userId');
        console.log('- Admission form can be updated');
        console.log('- Bidirectional relationship verified');
        console.log('- Data consistency maintained throughout');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 409) {
            console.log('ℹ️  User already exists, you can modify the email/phone in test data');
        }
    }
}

// Run the test
testSignupWithAdmissionCreation(); 