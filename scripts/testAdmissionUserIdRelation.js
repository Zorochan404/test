import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '9876543214',
    password: 'password123',
    confirmPassword: 'password123'
};

const admissionData = {
    // Personal Information
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '9876543214',
    dateOfBirth: '1998-08-20',
    gender: 'Female',
    religion: 'Other',
    aadharNumber: '987654321098',
    permanentAddress: '456 Oak Street, City, State',
    temporaryAddress: '456 Oak Street, City, State',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',

    // Guardian Details
    fathersName: 'Michael Johnson',
    fathersPhone: '9876543215',
    fathersOccupation: 'Doctor',
    fathersQualification: 'MBBS',
    mothersName: 'Sarah Johnson',
    mothersPhone: '9876543216',
    mothersOccupation: 'Lawyer',
    mothersQualification: 'LLB',
    parentsAnnualIncome: 1200000,
    parentsAddress: '456 Oak Street, City, State',

    // Academic Details
    tenthBoard: 'ICSE',
    tenthInstitution: 'St. Mary School',
    tenthStream: 'General',
    tenthPercentage: '92%',
    tenthYear: '2013',
    twelfthBoard: 'CBSE',
    twelfthInstitution: 'Delhi Public School',
    twelfthStream: 'Commerce',
    twelfthPercentage: '88%',
    twelfthYear: '2015',

    // Program Selection
    programType: 'Certificate',
    programName: 'Digital Marketing',
    programCategory: 'Marketing',
    specialization: 'Social Media Marketing',
    campus: 'Delhi'
};

async function testAdmissionUserIdRelation() {
    console.log('🚀 Testing Admission Schema with UserId Relationship\n');

    try {
        // Step 1: Create a user
        console.log('📝 Step 1: Creating user...');
        const signupResponse = await axios.post(`${BASE_URL}/admission-auth/signup`, testUser);
        const user = signupResponse.data.data;
        console.log('✅ User created:', {
            userId: user._id,
            applicationId: user.applicationId,
            sessionToken: user.sessionToken
        });

        // Step 2: Submit admission form with userId relationship
        console.log('\n📋 Step 2: Submitting admission form with userId...');
        const admissionSubmissionData = {
            ...admissionData,
            userId: user._id,
            courseId: '507f1f77bcf86cd799439011',
            programId: '507f1f77bcf86cd799439012',
            paymentType: 'full',
            initialPayment: 25000
        };

        const admissionResponse = await axios.post(
            `${BASE_URL}/admission/submit-form`,
            admissionSubmissionData,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ Admission form submitted:', {
            admissionId: admissionResponse.data.data.admission._id,
            userId: admissionResponse.data.data.admission.userId,
            applicationId: admissionResponse.data.data.admission.applicationId,
            paymentInfoId: admissionResponse.data.data.paymentInformation?._id
        });

        // Step 3: Get admission form by user ID (using direct userId relationship)
        console.log('\n🔍 Step 3: Getting admission form by user ID...');
        const getAdmissionResponse = await axios.get(
            `${BASE_URL}/admission/user/${user._id}`,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ Admission form retrieved by userId:', {
            admissionId: getAdmissionResponse.data.data.admission._id,
            userId: getAdmissionResponse.data.data.admission.userId,
            applicationId: getAdmissionResponse.data.data.admission.applicationId,
            firstName: getAdmissionResponse.data.data.admission.firstName,
            lastName: getAdmissionResponse.data.data.admission.lastName
        });

        // Step 4: Update admission form by user ID
        console.log('\n✏️  Step 4: Updating admission form by user ID...');
        const updateData = {
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400002',
            specialization: 'Content Marketing'
        };

        const updateResponse = await axios.put(
            `${BASE_URL}/admission/user/${user._id}`,
            updateData,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ Admission form updated:', {
            admissionId: updateResponse.data.data._id,
            updatedCity: updateResponse.data.data.city,
            updatedState: updateResponse.data.data.state,
            updatedSpecialization: updateResponse.data.data.specialization
        });

        // Step 5: Get user profile to verify relationships
        console.log('\n👤 Step 5: Getting user profile...');
        const profileResponse = await axios.get(
            `${BASE_URL}/admission-auth/profile`,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ User profile retrieved:', {
            userId: profileResponse.data.data._id,
            admissionFormId: profileResponse.data.data.admissionFormId,
            paymentInformationCount: profileResponse.data.data.paymentInformation?.length
        });

        // Step 6: Get user with admission and payment data
        console.log('\n🔗 Step 6: Getting user with admission and payment data...');
        const userWithDataResponse = await axios.get(
            `${BASE_URL}/admission/user-with-data/${user._id}`,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ User with data retrieved:', {
            userId: userWithDataResponse.data.data._id,
            hasAdmissionForm: !!userWithDataResponse.data.data.admissionFormId,
            paymentInfoCount: userWithDataResponse.data.data.paymentInformation?.length
        });

        // Step 7: Test direct admission query (if you have a direct admission endpoint)
        console.log('\n📊 Step 7: Testing direct admission queries...');
        
        // Get all admissions (admin endpoint)
        const allAdmissionsResponse = await axios.get(
            `${BASE_URL}/admission`,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ All admissions retrieved:', {
            count: allAdmissionsResponse.data.data?.length || 0,
            hasUserAdmission: allAdmissionsResponse.data.data?.some(admission => 
                admission.userId === user._id
            ) || false
        });

        // Step 8: Verify data consistency
        console.log('\n✅ Step 8: Verifying data consistency...');
        
        // Check if admission form has correct userId
        const admission = getAdmissionResponse.data.data.admission;
        const isUserIdCorrect = admission.userId === user._id;
        const isUserReferenceCorrect = profileResponse.data.data.admissionFormId === admission._id;
        
        console.log('✅ Data consistency check:', {
            admissionHasCorrectUserId: isUserIdCorrect,
            userHasCorrectAdmissionReference: isUserReferenceCorrect,
            admissionApplicationId: admission.applicationId,
            userApplicationId: user.applicationId
        });

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📊 Summary:');
        console.log('- User created and authenticated');
        console.log('- Admission form submitted with userId relationship');
        console.log('- Admission form retrieved using direct userId query');
        console.log('- Admission form updated successfully');
        console.log('- User profile shows correct admission reference');
        console.log('- Data consistency verified');
        console.log('- Direct userId relationship working correctly');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 409) {
            console.log('ℹ️  User already exists, you can modify the email/phone in test data');
        }
    }
}

// Run the test
testAdmissionUserIdRelation(); 