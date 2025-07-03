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

const testPartTimeCareerPost = {
    title: "Marketing Intern",
    place: "Remote",
    description: "Join our marketing team as an intern and gain valuable experience in digital marketing, social media management, and content creation.",
    requirements: [
        "Currently pursuing a degree in Marketing or related field",
        "Basic knowledge of social media platforms",
        "Creative mindset",
        "Good written and verbal communication skills"
    ],
    partTime: true,
    isActive: true
};

let createdCareerPostId;
let createdPartTimeCareerPostId;

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

// Test 2: Create a part-time career post
const testCreatePartTimeCareerPost = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/addcareerpost`, testPartTimeCareerPost);
        createdPartTimeCareerPostId = response.data.data._id;
        logResponse('Create Part-Time Career Post', response);
    } catch (error) {
        logError('Create Part-Time Career Post', error);
    }
};

// Test 3: Get all career posts
const testGetAllCareerPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getallcareerposts`);
        logResponse('Get All Career Posts', response);
    } catch (error) {
        logError('Get All Career Posts', error);
    }
};

// Test 4: Get active career posts
const testGetActiveCareerPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getcareerposts`);
        logResponse('Get Active Career Posts', response);
    } catch (error) {
        logError('Get Active Career Posts', error);
    }
};

// Test 5: Get career post by ID
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

// Test 6: Get career posts by type (fulltime)
const testGetCareerPostsByTypeFulltime = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getcareerpostsbytype/fulltime`);
        logResponse('Get Full-Time Career Posts', response);
    } catch (error) {
        logError('Get Full-Time Career Posts', error);
    }
};

// Test 7: Get career posts by type (parttime)
const testGetCareerPostsByTypeParttime = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getcareerpostsbytype/parttime`);
        logResponse('Get Part-Time Career Posts', response);
    } catch (error) {
        logError('Get Part-Time Career Posts', error);
    }
};

// Test 8: Get career posts by place
const testGetCareerPostsByPlace = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getcareerpostsbyplace/New York`);
        logResponse('Get Career Posts by Place', response);
    } catch (error) {
        logError('Get Career Posts by Place', error);
    }
};

// Test 9: Search career posts
const testSearchCareerPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/searchcareerposts?query=developer`);
        logResponse('Search Career Posts', response);
    } catch (error) {
        logError('Search Career Posts', error);
    }
};

// Test 10: Update career post
const testUpdateCareerPost = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Update Career Post - no career post created');
        return;
    }
    
    const updateData = {
        title: "Senior Software Developer",
        description: "Updated description for senior position"
    };
    
    try {
        const response = await axios.put(`${BASE_URL}/updatecareerpost/${createdCareerPostId}`, updateData);
        logResponse('Update Career Post', response);
    } catch (error) {
        logError('Update Career Post', error);
    }
};

// Test 11: Deactivate career post
const testDeactivateCareerPost = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Deactivate Career Post - no career post created');
        return;
    }
    
    try {
        const response = await axios.put(`${BASE_URL}/deactivatecareerpost/${createdCareerPostId}`);
        logResponse('Deactivate Career Post', response);
    } catch (error) {
        logError('Deactivate Career Post', error);
    }
};

// Test 12: Get inactive career posts
const testGetInactiveCareerPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getinactivecareerposts`);
        logResponse('Get Inactive Career Posts', response);
    } catch (error) {
        logError('Get Inactive Career Posts', error);
    }
};

// Test 13: Activate career post
const testActivateCareerPost = async () => {
    if (!createdCareerPostId) {
        console.log('\n⚠️  Skipping Activate Career Post - no career post created');
        return;
    }
    
    try {
        const response = await axios.put(`${BASE_URL}/activatecareerpost/${createdCareerPostId}`);
        logResponse('Activate Career Post', response);
    } catch (error) {
        logError('Activate Career Post', error);
    }
};

// Test 14: Toggle career post status
const testToggleCareerPostStatus = async () => {
    if (!createdPartTimeCareerPostId) {
        console.log('\n⚠️  Skipping Toggle Career Post Status - no part-time career post created');
        return;
    }
    
    try {
        const response = await axios.put(`${BASE_URL}/togglecareerpoststatus/${createdPartTimeCareerPostId}`);
        logResponse('Toggle Career Post Status', response);
    } catch (error) {
        logError('Toggle Career Post Status', error);
    }
};

// Test 15: Delete career post
const testDeleteCareerPost = async () => {
    if (!createdPartTimeCareerPostId) {
        console.log('\n⚠️  Skipping Delete Career Post - no part-time career post created');
        return;
    }
    
    try {
        const response = await axios.delete(`${BASE_URL}/deletecareerpost/${createdPartTimeCareerPostId}`);
        logResponse('Delete Career Post', response);
    } catch (error) {
        logError('Delete Career Post', error);
    }
};

// Test 16: Error handling - Invalid type
const testInvalidType = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getcareerpostsbytype/invalid`);
        logResponse('Invalid Type Test', response);
    } catch (error) {
        logError('Invalid Type Test (Expected)', error);
    }
};

// Test 17: Error handling - Search without query
const testSearchWithoutQuery = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/searchcareerposts`);
        logResponse('Search Without Query Test', response);
    } catch (error) {
        logError('Search Without Query Test (Expected)', error);
    }
};

// Test 18: Error handling - Get non-existent career post
const testGetNonExistentCareerPost = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getcareerpostbyid/507f1f77bcf86cd799439011`);
        logResponse('Get Non-existent Career Post Test', response);
    } catch (error) {
        logError('Get Non-existent Career Post Test (Expected)', error);
    }
};

// Run all tests
const runAllTests = async () => {
    console.log('🚀 Starting Career Post API Tests...\n');
    
    await testCreateCareerPost();
    await testCreatePartTimeCareerPost();
    await testGetAllCareerPosts();
    await testGetActiveCareerPosts();
    await testGetCareerPostById();
    await testGetCareerPostsByTypeFulltime();
    await testGetCareerPostsByTypeParttime();
    await testGetCareerPostsByPlace();
    await testSearchCareerPosts();
    await testUpdateCareerPost();
    await testDeactivateCareerPost();
    await testGetInactiveCareerPosts();
    await testActivateCareerPost();
    await testToggleCareerPostStatus();
    await testDeleteCareerPost();
    
    // Error handling tests
    await testInvalidType();
    await testSearchWithoutQuery();
    await testGetNonExistentCareerPost();
    
    console.log('\n🎉 Career Post API Tests Completed!');
};

// Run tests
runAllTests().catch(console.error); 