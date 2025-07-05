import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import User from '../models/user.js';
import Admission from '../models/admission.js';
import PaymentInformation from '../models/paymentInformation.js';

// Connect to MongoDB
await mongoose.connect(DB_URI);
console.log('✅ Connected to MongoDB');

try {
    // Test data
    const testUserId = '507f1f77bcf86cd799439011'; // Example ObjectId
    const testCourseId = '507f1f77bcf86cd799439012'; // Example ObjectId
    
    // Create test user
    const testUser = new User({
        _id: testUserId,
        email: 'test@example.com',
        phone: '1234567890',
        password: 'testpassword123'
    });
    await testUser.save();
    console.log('✅ Test user created');

    // Test admission submission data
    const admissionData = {
        userId: testUserId,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456',
        phone: '1234567890',
        email: 'test@example.com',
        education: 'Bachelor\'s Degree',
        workExperience: '2 years'
    };

    // Simulate the admission submission process
    console.log('\n🔄 Testing admission submission flow...');
    
    // Step 1: Create admission
    const newAdmission = await Admission.create({
        userId: admissionData.userId,
        firstName: admissionData.firstName,
        lastName: admissionData.lastName,
        dateOfBirth: admissionData.dateOfBirth,
        gender: admissionData.gender,
        address: admissionData.address,
        city: admissionData.city,
        state: admissionData.state,
        pincode: admissionData.pincode,
        phone: admissionData.phone,
        email: admissionData.email,
        education: admissionData.education,
        workExperience: admissionData.workExperience,
        submittedAt: new Date()
    });
    console.log('✅ Step 1: Admission created with ID:', newAdmission._id);

    // Step 2: Link admission to user
    testUser.admissionFormId = newAdmission._id;
    await testUser.save();
    console.log('✅ Step 2: Admission linked to user');

    // Step 3: Create payment information (simplified)
    const paymentInfo = new PaymentInformation({
        userId: admissionData.userId,
        admissionId: newAdmission._id, // Link to the saved admission
        courseId: testCourseId,
        programId: 'program1',
        totalFee: 50000,
        registrationFee: 5000,
        processingFee: 1000,
        totalAmountPaid: 10000,
        totalAmountDue: 40000,
        paymentStatus: 'partial',
        totalDiscount: 0,
        remarks: 'Payment created for admission form submission. Payment type: full',
        documents: {
            feeReceipts: [],
            emiAgreement: null,
            paymentProofs: []
        }
    });

    await paymentInfo.save();
    console.log('✅ Step 3: Payment information created with ID:', paymentInfo._id);

    // Step 4: Link payment information to user
    testUser.paymentInformation.push(paymentInfo._id);
    await testUser.save();
    console.log('✅ Step 4: Payment information linked to user');

    // Verify the complete flow
    const finalUser = await User.findById(testUserId)
        .populate('admissionFormId')
        .populate('paymentInformation');

    console.log('\n📋 Final Verification:');
    console.log('User ID:', finalUser._id);
    console.log('Admission Form ID:', finalUser.admissionFormId?._id);
    console.log('Payment Information IDs:', finalUser.paymentInformation.map(p => p._id));
    console.log('Admission linked to payment:', finalUser.paymentInformation[0]?.admissionId);
    console.log('Payment status:', finalUser.paymentInformation[0]?.paymentStatus);
    console.log('Total amount paid:', finalUser.paymentInformation[0]?.totalAmountPaid);
    console.log('Total amount due:', finalUser.paymentInformation[0]?.totalAmountDue);

    // Verify the relationship
    const admissionInPayment = finalUser.paymentInformation[0]?.admissionId;
    const userAdmission = finalUser.admissionFormId?._id;
    
    if (admissionInPayment && userAdmission && admissionInPayment.toString() === userAdmission.toString()) {
        console.log('✅ SUCCESS: Admission is properly linked to payment information');
    } else {
        console.log('❌ ERROR: Admission is not properly linked to payment information');
    }

    console.log('\n✅ Admission and payment flow test completed successfully!');

} catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
} finally {
    // Cleanup test data
    await User.deleteMany({ email: 'test@example.com' });
    await Admission.deleteMany({ email: 'test@example.com' });
    await PaymentInformation.deleteMany({ userId: '507f1f77bcf86cd799439011' });
    console.log('🧹 Test data cleaned up');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
} 