import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/career-posts';

// Test data
const testCareerPost = {
    title: "Software Developer",
    place: "New York, NY",
    description: "We are looking for a talented software developer to join our team. The ideal candidate will have experience with modern web technologies and a passion for creating high-quality software.",
    requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience with JavaScript/TypeScript",
        "Experience with React, Node.js, and MongoDB",
        "Strong problem-solving skills",
        "Excellent communication skills"
    ],
    partTime: false,
    isActive: true
};

const testApplicant = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    resumeUrl: "https://example.com/resume/john-doe.pdf",
    coverLetter: "I am excited to apply for the Software Developer position. I have 5 years of experience in web development and am passionate about creating innovative solutions."
};

const testApplicant2 = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-987-6543",
    resumeUrl: "https://example.com/resume/jane-smith.pdf",
    coverLetter: "I am a dedicated developer with experience in React and Node.js. I believe my skills align perfectly with your requirements."
};

let createdCareerPostId;
let createdApplicantId;

// Helper function to log responses
const logResponse = (endpoint, response) => {
    console.log(`\n✅ ${endpoint}:`);
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, JSON.stringify(response.data, null, 2));
};

// Helper function to log errors
const logError = (endpoint, error) => {
    console.log(`\n❌ ${endpoint}:`);
    console.log(`Status: ${error.response?.status || 'Network Error'}`);
    console.log(`Error:`, error.response?.data || error.message);
};

// ===== CAREER POST TESTS =====

// Test 1: Create a career post
const testCreateCareerPost = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/addcareerpost`, testCareerPost);
        createdCareerPostId = response.data.data._id;
        logResponse('Create Career Post', response);
    } catch (error) {
        logError('Create Career Post', error);
    }
};

// Test 2: Get career post by ID
const testGetCareerPostById = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Get Career Post by ID - no career post created');
        return;
    }
    
    try {
        const response = await axios.get(`${BASE_URL}/getcareerpostbyid/${createdCareerPostId}`);
        logResponse('Get Career Post by ID', response);
    } catch (error) {
        logError('Get Career Post by ID', error);
    }
};

// ===== APPLICANT TESTS =====

// Test 3: Apply to career post
const testApplyToCareerPost = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Apply to Career Post - no career post created');
        return;
    }
    
    try {
        const response = await axios.post(`${BASE_URL}/apply/${createdCareerPostId}`, testApplicant);
        createdApplicantId = response.data.data._id;
        logResponse('Apply to Career Post', response);
    } catch (error) {
        logError('Apply to Career Post', error);
    }
};

// Test 4: Apply with duplicate email (should fail)
const testApplyWithDuplicateEmail = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Duplicate Email Test - no career post created');
        return;
    }
    
    try {
        const response = await axios.post(`${BASE_URL}/apply/${createdCareerPostId}`, testApplicant);
        logResponse('Apply with Duplicate Email (Should Fail)', response);
    } catch (error) {
        logError('Apply with Duplicate Email (Expected)', error);
    }
};

// Test 5: Apply with different email
const testApplyWithDifferentEmail = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Different Email Test - no career post created');
        return;
    }
    
    try {
        const response = await axios.post(`${BASE_URL}/apply/${createdCareerPostId}`, testApplicant2);
        logResponse('Apply with Different Email', response);
    } catch (error) {
        logError('Apply with Different Email', error);
    }
};

// Test 6: Get applicants for career post
const testGetApplicantsForCareerPost = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Get Applicants - no career post created');
        return;
    }
    
    try {
        const response = await axios.get(`${BASE_URL}/applicants/${createdCareerPostId}`);
        logResponse('Get Applicants for Career Post', response);
    } catch (error) {
        logError('Get Applicants for Career Post', error);
    }
};

// Test 7: Get all applicants across all career posts
const testGetAllApplicants = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all-applicants`);
        logResponse('Get All Applicants', response);
    } catch (error) {
        logError('Get All Applicants', error);
    }
};

// Test 8: Update applicant status
const testUpdateApplicantStatus = async () => {
    if (!createdCareerPostId || !createdApplicantId) {
        console.log('\n⚠️  Skipping Update Applicant Status - no applicant created');
        return;
    }
    
    try {
        const response = await axios.put(`${BASE_URL}/applicants/${createdCareerPostId}/${createdApplicantId}/status`, {
            status: 'reviewed'
        });
        logResponse('Update Applicant Status', response);
    } catch (error) {
        logError('Update Applicant Status', error);
    }
};

// Test 9: Get applicants by status
const testGetApplicantsByStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/applicants-by-status/pending`);
        logResponse('Get Applicants by Status (Pending)', response);
    } catch (error) {
        logError('Get Applicants by Status (Pending)', error);
    }
};

// Test 10: Get applicants by reviewed status
const testGetApplicantsByReviewedStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/applicants-by-status/reviewed`);
        logResponse('Get Applicants by Status (Reviewed)', response);
    } catch (error) {
        logError('Get Applicants by Status (Reviewed)', error);
    }
};

// Test 11: Update applicant status to shortlisted
const testUpdateApplicantStatusToShortlisted = async () => {
    if (!createdCareerPostId || !createdApplicantId) {
        console.log('\n⚠️  Skipping Update to Shortlisted - no applicant created');
        return;
    }
    
    try {
        const response = await axios.put(`${BASE_URL}/applicants/${createdCareerPostId}/${createdApplicantId}/status`, {
            status: 'shortlisted'
        });
        logResponse('Update Applicant Status to Shortlisted', response);
    } catch (error) {
        logError('Update Applicant Status to Shortlisted', error);
    }
};

// Test 12: Remove applicant from career post
const testRemoveApplicant = async () => {
    if (!createdCareerPostId || !createdApplicantId) {
        console.log('\n⚠️  Skipping Remove Applicant - no applicant created');
        return;
    }
    
    try {
        const response = await axios.delete(`${BASE_URL}/applicants/${createdCareerPostId}/${createdApplicantId}`);
        logResponse('Remove Applicant from Career Post', response);
    } catch (error) {
        logError('Remove Applicant from Career Post', error);
    }
};

// ===== ERROR HANDLING TESTS =====

// Test 13: Apply to non-existent career post
const testApplyToNonExistentCareerPost = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/apply/507f1f77bcf86cd799439011`, testApplicant);
        logResponse('Apply to Non-existent Career Post', response);
    } catch (error) {
        logError('Apply to Non-existent Career Post (Expected)', error);
    }
};

// Test 14: Apply to inactive career post
const testApplyToInactiveCareerPost = async () => {
    // First create an inactive career post
    const inactiveCareerPost = { ...testCareerPost, isActive: false };
    
    try {
        const createResponse = await axios.post(`${BASE_URL}/addcareerpost`, inactiveCareerPost);
        const inactivePostId = createResponse.data.data._id;
        
        // Try to apply to inactive post
        const applyResponse = await axios.post(`${BASE_URL}/apply/${inactivePostId}`, testApplicant);
        logResponse('Apply to Inactive Career Post', applyResponse);
    } catch (error) {
        logError('Apply to Inactive Career Post (Expected)', error);
    }
};

// Test 15: Update applicant status with invalid status
const testUpdateApplicantStatusInvalid = async () => {
    if (!createdCareerPostId || !createdApplicantId) {
        console.log('\n⚠️  Skipping Invalid Status Test - no applicant created');
        return;
    }
    
    try {
        const response = await axios.put(`${BASE_URL}/applicants/${createdCareerPostId}/${createdApplicantId}/status`, {
            status: 'invalid_status'
        });
        logResponse('Update Applicant Status with Invalid Status', response);
    } catch (error) {
        logError('Update Applicant Status with Invalid Status (Expected)', error);
    }
};

// Test 16: Get applicants by invalid status
const testGetApplicantsByInvalidStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/applicants-by-status/invalid`);
        logResponse('Get Applicants by Invalid Status', response);
    } catch (error) {
        logError('Get Applicants by Invalid Status (Expected)', error);
    }
};

// Test 17: Remove non-existent applicant
const testRemoveNonExistentApplicant = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Remove Non-existent Applicant - no career post created');
        return;
    }
    
    try {
        const response = await axios.delete(`${BASE_URL}/applicants/${createdCareerPostId}/507f1f77bcf86cd799439011`);
        logResponse('Remove Non-existent Applicant', response);
    } catch (error) {
        logError('Remove Non-existent Applicant (Expected)', error);
    }
};

// Test 18: Apply with missing required fields
const testApplyWithMissingFields = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Missing Fields Test - no career post created');
        return;
    }
    
    const incompleteApplicant = {
        name: "Incomplete Applicant",
        // Missing email, phone, resumeUrl
        coverLetter: "This application is incomplete"
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/apply/${createdCareerPostId}`, incompleteApplicant);
        logResponse('Apply with Missing Fields', response);
    } catch (error) {
        logError('Apply with Missing Fields (Expected)', error);
    }
};

// Run all tests
const runAllTests = async () => {
    console.log('🚀 Starting Career Post with Applicants API Tests...\n');
    
    // Career Post Tests
    await testCreateCareerPost();
    await testGetCareerPostById();
    
    // Applicant Tests
    await testApplyToCareerPost();
    await testApplyWithDuplicateEmail();
    await testApplyWithDifferentEmail();
    await testGetApplicantsForCareerPost();
    await testGetAllApplicants();
    await testUpdateApplicantStatus();
    await testGetApplicantsByStatus();
    await testUpdateApplicantStatusToShortlisted();
    await testGetApplicantsByReviewedStatus();
    await testRemoveApplicant();
    
    // Error Handling Tests
    await testApplyToNonExistentCareerPost();
    await testApplyToInactiveCareerPost();
    await testUpdateApplicantStatusInvalid();
    await testGetApplicantsByInvalidStatus();
    await testRemoveNonExistentApplicant();
    await testApplyWithMissingFields();
    
    console.log('\n🎉 Career Post with Applicants API Tests Completed!');
};

// Run tests
runAllTests().catch(console.error); 