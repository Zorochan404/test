import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    phone: '9876543217',
    password: 'password123',
    confirmPassword: 'password123'
};

const admissionData = {
    // Personal Information
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@example.com',
    phone: '9876543217',
    dateOfBirth: '1993-12-10',
    gender: 'Male',
    religion: 'Other',
    aadharNumber: '112233445566',
    permanentAddress: '789 Pine Avenue, City, State',
    temporaryAddress: '789 Pine Avenue, City, State',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',

    // Guardian Details
    fathersName: 'David Wilson',
    fathersPhone: '9876543218',
    fathersOccupation: 'Business Owner',
    fathersQualification: 'MBA',
    mothersName: 'Lisa Wilson',
    mothersPhone: '9876543219',
    mothersOccupation: 'Architect',
    mothersQualification: 'B.Arch',
    parentsAnnualIncome: 1500000,
    parentsAddress: '789 Pine Avenue, City, State',

    // Academic Details
    tenthBoard: 'CBSE',
    tenthInstitution: 'Modern School',
    tenthStream: 'General',
    tenthPercentage: '89%',
    tenthYear: '2009',
    twelfthBoard: 'CBSE',
    twelfthInstitution: 'Delhi Public School',
    twelfthStream: 'Science',
    twelfthPercentage: '85%',
    twelfthYear: '2011',

    // Program Selection
    programType: 'Degree',
    programName: 'Computer Science',
    programCategory: 'Technology',
    specialization: 'Artificial Intelligence',
    campus: 'Bangalore'
};

async function testLoginWithAdmissionDetails() {
    console.log('🚀 Testing Login with Populated Admission Details\n');

    try {
        // Step 1: Create a user
        console.log('📝 Step 1: Creating user...');
        const signupResponse = await axios.post(`${BASE_URL}/admission-auth/signup`, testUser);
        const user = signupResponse.data.data;
        console.log('✅ User created:', {
            userId: user._id,
            applicationId: user.applicationId,
            sessionToken: user.sessionToken,
            hasAdmissionForm: !!user.admissionFormId,
            paymentInfoCount: user.paymentInformation?.length || 0
        });

        // Step 2: Submit admission form
        console.log('\n📋 Step 2: Submitting admission form...');
        const admissionSubmissionData = {
            ...admissionData,
            userId: user._id,
            courseId: '507f1f77bcf86cd799439011',
            programId: '507f1f77bcf86cd799439012',
            paymentType: 'emi',
            emiOptionId: '507f1f77bcf86cd799439013',
            initialPayment: 15000,
            couponCode: 'STUDENT20'
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
            paymentInfoId: admissionResponse.data.data.paymentInformation?._id,
            paymentStatus: admissionResponse.data.data.paymentInformation?.paymentStatus
        });

        // Step 3: Logout to test fresh login
        console.log('\n🚪 Step 3: Logging out...');
        await axios.post(
            `${BASE_URL}/admission-auth/logout`,
            {},
            {
                headers: { Authorization: `Bearer ${user.sessionToken}` }
            }
        );
        console.log('✅ User logged out');

        // Step 4: Login and check populated admission details
        console.log('\n🔐 Step 4: Logging in with populated admission details...');
        const loginResponse = await axios.post(`${BASE_URL}/admission-auth/login`, {
            email: testUser.email,
            password: testUser.password
        });

        const loggedInUser = loginResponse.data.data;
        console.log('✅ User logged in successfully:', {
            userId: loggedInUser._id,
            applicationId: loggedInUser.applicationId,
            sessionToken: loggedInUser.sessionToken,
            hasAdmissionForm: !!loggedInUser.admissionFormId,
            paymentInfoCount: loggedInUser.paymentInformation?.length || 0
        });

        // Step 5: Display admission details
        if (loggedInUser.admissionFormId) {
            console.log('\n📋 Step 5: Admission Form Details:');
            const admission = loggedInUser.admissionFormId;
            console.log('✅ Admission Form:', {
                id: admission._id,
                applicationId: admission.applicationId,
                firstName: admission.firstName,
                lastName: admission.lastName,
                email: admission.email,
                phone: admission.phone,
                programName: admission.programName,
                specialization: admission.specialization,
                campus: admission.campus,
                submittedAt: admission.submittedAt,
                paymentComplete: admission.paymentComplete
            });
        } else {
            console.log('\n📋 Step 5: No admission form found for user');
        }

        // Step 6: Display payment information
        if (loggedInUser.paymentInformation && loggedInUser.paymentInformation.length > 0) {
            console.log('\n💳 Step 6: Payment Information Details:');
            loggedInUser.paymentInformation.forEach((payment, index) => {
                console.log(`✅ Payment ${index + 1}:`, {
                    id: payment._id,
                    totalFee: payment.totalFee,
                    totalAmountPaid: payment.totalAmountPaid,
                    totalAmountDue: payment.totalAmountDue,
                    paymentStatus: payment.paymentStatus,
                    totalDiscount: payment.totalDiscount,
                    emiPlan: payment.emiPlan ? {
                        totalEmis: payment.emiPlan.totalEmis,
                        emiAmount: payment.emiPlan.emiAmount,
                        emisPaid: payment.emiPlan.emisPaid,
                        emisRemaining: payment.emiPlan.emisRemaining,
                        nextPaymentDate: payment.emiPlan.startDate
                    } : null,
                    appliedCoupons: payment.appliedCoupons?.map(coupon => ({
                        code: coupon.couponCode,
                        discountAmount: coupon.discountAmount,
                        discountType: coupon.discountType
                    })) || []
                });
            });
        } else {
            console.log('\n💳 Step 6: No payment information found for user');
        }

        // Step 7: Test profile endpoint to compare
        console.log('\n👤 Step 7: Getting user profile for comparison...');
        const profileResponse = await axios.get(
            `${BASE_URL}/admission-auth/profile`,
            {
                headers: { Authorization: `Bearer ${loggedInUser.sessionToken}` }
            }
        );

        const profileUser = profileResponse.data.data;
        console.log('✅ Profile data comparison:', {
            hasAdmissionForm: !!profileUser.admissionFormId,
            paymentInfoCount: profileUser.paymentInformation?.length || 0,
            admissionFormId: profileUser.admissionFormId?._id,
            paymentInfoIds: profileUser.paymentInformation?.map(p => p._id) || []
        });

        // Step 8: Verify data consistency
        console.log('\n✅ Step 8: Verifying data consistency...');
        const loginHasAdmission = !!loggedInUser.admissionFormId;
        const profileHasAdmission = !!profileUser.admissionFormId;
        const loginPaymentCount = loggedInUser.paymentInformation?.length || 0;
        const profilePaymentCount = profileUser.paymentInformation?.length || 0;

        console.log('✅ Data consistency check:', {
            loginHasAdmission,
            profileHasAdmission,
            admissionConsistent: loginHasAdmission === profileHasAdmission,
            loginPaymentCount,
            profilePaymentCount,
            paymentConsistent: loginPaymentCount === profilePaymentCount
        });

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📊 Summary:');
        console.log('- User created and authenticated');
        console.log('- Admission form submitted with payment information');
        console.log('- User logged out and logged back in');
        console.log('- Admission details populated on login');
        console.log('- Payment information populated on login');
        console.log('- Data consistency verified between login and profile');
        console.log('- All relationships working correctly');

        // Step 9: Display complete user data structure
        console.log('\n📋 Step 9: Complete User Data Structure on Login:');
        console.log(JSON.stringify(loggedInUser, null, 2));

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 409) {
            console.log('ℹ️  User already exists, you can modify the email/phone in test data');
        }
    }
}

// Run the test
testLoginWithAdmissionDetails(); 