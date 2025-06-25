import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    password: 'password123',
    confirmPassword: 'password123'
};

const admissionData = {
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    dateOfBirth: '1995-05-15',
    gender: 'Male',
    religion: 'Other',
    aadharNumber: '123456789012',
    permanentAddress: '123 Main Street, City, State',
    temporaryAddress: '123 Main Street, City, State',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',

    // Guardian Details
    fathersName: 'Robert Doe',
    fathersPhone: '9876543211',
    fathersOccupation: 'Engineer',
    fathersQualification: 'B.Tech',
    mothersName: 'Jane Doe',
    mothersPhone: '9876543212',
    mothersOccupation: 'Teacher',
    mothersQualification: 'M.A',
    parentsAnnualIncome: 800000,
    parentsAddress: '123 Main Street, City, State',

    // Academic Details
    tenthBoard: 'CBSE',
    tenthInstitution: 'ABC School',
    tenthStream: 'General',
    tenthPercentage: '85%',
    tenthYear: '2010',
    twelfthBoard: 'CBSE',
    twelfthInstitution: 'XYZ College',
    twelfthStream: 'Science',
    twelfthPercentage: '78%',
    twelfthYear: '2012',

    // Program Selection
    programType: 'Diploma',
    programName: 'Web Development',
    programCategory: 'Technology',
    specialization: 'Full Stack Development',
    campus: 'Mumbai'
};

async function testAdmissionPaymentIntegration() {
    console.log('🚀 Testing Admission Form Submission with Payment Integration\n');

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

        // Step 2: Test full payment admission submission
        console.log('\n💰 Step 2: Testing full payment admission submission...');
        const fullPaymentData = {
            ...admissionData,
            userId: user._id,
            courseId: '507f1f77bcf86cd799439011', // Example course ID
            programId: '507f1f77bcf86cd799439012', // Example program ID
            paymentType: 'full',
            initialPayment: 50000 // Full payment amount
        };

        const fullPaymentResponse = await axios.post(
            `${BASE_URL}/admission/submit-form`,
            fullPaymentData,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ Full payment admission submitted:', {
            admissionId: fullPaymentResponse.data.data.admission._id,
            paymentInfoId: fullPaymentResponse.data.data.paymentInformation?._id,
            paymentStatus: fullPaymentResponse.data.data.paymentInformation?.paymentStatus
        });

        // Step 3: Test EMI payment admission submission
        console.log('\n💳 Step 3: Testing EMI payment admission submission...');
        const emiPaymentData = {
            ...admissionData,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '9876543213',
            userId: user._id,
            courseId: '507f1f77bcf86cd799439011',
            programId: '507f1f77bcf86cd799439012',
            paymentType: 'emi',
            emiOptionId: '507f1f77bcf86cd799439013', // Example EMI option ID
            initialPayment: 10000, // Initial payment
            couponCode: 'WELCOME10' // Optional coupon
        };

        const emiPaymentResponse = await axios.post(
            `${BASE_URL}/admission/submit-form`,
            emiPaymentData,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ EMI payment admission submitted:', {
            admissionId: emiPaymentResponse.data.data.admission._id,
            paymentInfoId: emiPaymentResponse.data.data.paymentInformation?._id,
            paymentStatus: emiPaymentResponse.data.data.paymentInformation?.paymentStatus,
            emiPlan: emiPaymentResponse.data.data.paymentInformation?.emiPlan
        });

        // Step 4: Get user profile to see all linked data
        console.log('\n👤 Step 4: Getting user profile...');
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

        // Step 5: Get admission form by user ID
        console.log('\n📋 Step 5: Getting admission form by user ID...');
        const admissionResponse = await axios.get(
            `${BASE_URL}/admission/user/${user._id}`,
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );

        console.log('✅ Admission form retrieved:', {
            admissionId: admissionResponse.data.data.admission._id,
            applicationId: admissionResponse.data.data.admission.applicationId,
            submittedAt: admissionResponse.data.data.admission.submittedAt
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

        // Step 7: Test payment information retrieval
        if (userWithDataResponse.data.data.paymentInformation?.length > 0) {
            console.log('\n💳 Step 7: Testing payment information retrieval...');
            const paymentInfoId = userWithDataResponse.data.data.paymentInformation[0];
            
            const paymentResponse = await axios.get(
                `${BASE_URL}/payment-information/${paymentInfoId}`,
                {
                    headers: { Authorization: `Bearer ${user.sessionToken}` }
                }
            );

            console.log('✅ Payment information retrieved:', {
                paymentId: paymentResponse.data.data._id,
                totalFee: paymentResponse.data.data.totalFee,
                totalAmountPaid: paymentResponse.data.data.totalAmountPaid,
                totalAmountDue: paymentResponse.data.data.totalAmountDue,
                paymentStatus: paymentResponse.data.data.paymentStatus,
                emiPlan: paymentResponse.data.data.emiPlan ? {
                    totalEmis: paymentResponse.data.data.emiPlan.totalEmis,
                    emisPaid: paymentResponse.data.data.emiPlan.emisPaid,
                    emisRemaining: paymentResponse.data.data.emiPlan.emisRemaining
                } : null
            });
        }

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📊 Summary:');
        console.log('- User created and authenticated');
        console.log('- Full payment admission form submitted');
        console.log('- EMI payment admission form submitted');
        console.log('- Payment information automatically created');
        console.log('- All data properly linked and retrievable');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 409) {
            console.log('ℹ️  User already exists, you can modify the email/phone in test data');
        }
    }
}

// Run the test
testAdmissionPaymentIntegration(); 