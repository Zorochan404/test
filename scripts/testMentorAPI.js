import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/mentor';

// Test data
const testMentor = {
    name: "John Doe",
    role: "Senior Software Engineer",
    description: "Experienced software engineer with 10+ years in web development, specializing in JavaScript, React, and Node.js",
    image: "https://example.com/mentor-images/john-doe.jpg",
    tags: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"]
};

const testMentor2 = {
    name: "Jane Smith",
    role: "UI/UX Designer",
    description: "Creative designer with 8+ years of experience in user interface and user experience design",
    image: "https://example.com/mentor-images/jane-smith.jpg",
    tags: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"]
};

const testMentor3 = {
    name: "Mike Johnson",
    role: "Data Scientist",
    description: "Data scientist with expertise in machine learning, Python, and statistical analysis",
    image: "https://example.com/mentor-images/mike-johnson.jpg",
    tags: ["Python", "Machine Learning", "Data Analysis", "TensorFlow", "SQL"]
};

// Helper function to log results
const logResult = (testName, success, data = null, error = null) => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Test: ${testName}`);
    console.log(`Status: ${success ? '✅ PASSED' : '❌ FAILED'}`);
    if (data) {
        console.log('Response:', JSON.stringify(data, null, 2));
    }
    if (error) {
        console.log('Error:', error.response?.data || error.message);
    }
    console.log(`${'='.repeat(50)}`);
};

// Test 1: Create a single mentor
const testCreateMentor = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, testMentor);
        logResult('Create Single Mentor', true, response.data);
        return response.data.data._id;
    } catch (error) {
        logResult('Create Single Mentor', false, null, error);
        return null;
    }
};

// Test 2: Create multiple mentors
const testBulkCreateMentors = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/bulk/create`, {
            mentors: [testMentor2, testMentor3]
        });
        logResult('Bulk Create Mentors', true, response.data);
        return response.data.data.mentors.map(mentor => mentor._id);
    } catch (error) {
        logResult('Bulk Create Mentors', false, null, error);
        return [];
    }
};

// Test 3: Get all mentors
const testGetAllMentors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all?page=1&limit=5`);
        logResult('Get All Mentors', true, response.data);
        return response.data.data.mentors;
    } catch (error) {
        logResult('Get All Mentors', false, null, error);
        return [];
    }
};

// Test 4: Get mentor by ID
const testGetMentorById = async (mentorId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${mentorId}`);
        logResult('Get Mentor by ID', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get Mentor by ID', false, null, error);
        return null;
    }
};

// Test 5: Update mentor
const testUpdateMentor = async (mentorId) => {
    try {
        const updateData = {
            name: "John Doe Updated",
            role: "Lead Software Engineer",
            description: "Updated description with more experience",
            tags: ["JavaScript", "React", "Node.js", "TypeScript", "Team Leadership"]
        };
        const response = await axios.put(`${BASE_URL}/${mentorId}`, updateData);
        logResult('Update Mentor', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update Mentor', false, null, error);
        return null;
    }
};

// Test 6: Search mentors
const testSearchMentors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/search?q=JavaScript&page=1&limit=3`);
        logResult('Search Mentors', true, response.data);
        return response.data.data.mentors;
    } catch (error) {
        logResult('Search Mentors', false, null, error);
        return [];
    }
};

// Test 7: Get mentors by role
const testGetMentorsByRole = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/role/Software%20Engineer?page=1&limit=3`);
        logResult('Get Mentors by Role', true, response.data);
        return response.data.data.mentors;
    } catch (error) {
        logResult('Get Mentors by Role', false, null, error);
        return [];
    }
};

// Test 8: Get mentors by tags
const testGetMentorsByTags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tags/JavaScript,React?page=1&limit=3`);
        logResult('Get Mentors by Tags', true, response.data);
        return response.data.data.mentors;
    } catch (error) {
        logResult('Get Mentors by Tags', false, null, error);
        return [];
    }
};

// Test 9: Get all roles
const testGetAllRoles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/roles/all`);
        logResult('Get All Roles', true, response.data);
        return response.data.data.roles;
    } catch (error) {
        logResult('Get All Roles', false, null, error);
        return [];
    }
};

// Test 10: Get all tags
const testGetAllTags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tags/all`);
        logResult('Get All Tags', true, response.data);
        return response.data.data.tags;
    } catch (error) {
        logResult('Get All Tags', false, null, error);
        return [];
    }
};

// Test 11: Update mentor image
const testUpdateMentorImage = async (mentorId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${mentorId}/image`, {
            image: "https://example.com/mentor-images/john-doe-updated.jpg"
        });
        logResult('Update Mentor Image', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update Mentor Image', false, null, error);
        return null;
    }
};

// Test 12: Get mentor statistics
const testGetMentorStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/stats/overview`);
        logResult('Get Mentor Statistics', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get Mentor Statistics', false, null, error);
        return null;
    }
};

// Test 13: Delete mentor
const testDeleteMentor = async (mentorId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${mentorId}`);
        logResult('Delete Mentor', true, response.data);
        return true;
    } catch (error) {
        logResult('Delete Mentor', false, null, error);
        return false;
    }
};

// Test 14: Test invalid ID
const testInvalidId = async () => {
    try {
        await axios.get(`${BASE_URL}/invalid-id`);
        logResult('Test Invalid ID', false, null, { message: 'Should have failed' });
    } catch (error) {
        if (error.response?.status === 400) {
            logResult('Test Invalid ID', true, { message: 'Correctly rejected invalid ID' });
        } else {
            logResult('Test Invalid ID', false, null, error);
        }
    }
};

// Test 15: Test non-existent mentor
const testNonExistentMentor = async () => {
    try {
        await axios.get(`${BASE_URL}/507f1f77bcf86cd799439011`);
        logResult('Test Non-existent Mentor', false, null, { message: 'Should have failed' });
    } catch (error) {
        if (error.response?.status === 404) {
            logResult('Test Non-existent Mentor', true, { message: 'Correctly returned 404' });
        } else {
            logResult('Test Non-existent Mentor', false, null, error);
        }
    }
};

// Main test runner
const runAllTests = async () => {
    console.log('🚀 Starting Mentor API Tests...\n');
    
    // Create mentors
    const mentorId1 = await testCreateMentor();
    const mentorIds = await testBulkCreateMentors();
    
    // Wait a bit for database operations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test basic operations
    await testGetAllMentors();
    
    if (mentorId1) {
        await testGetMentorById(mentorId1);
        await testUpdateMentor(mentorId1);
        await testUpdateMentorImage(mentorId1);
    }
    
    // Test search and filtering
    await testSearchMentors();
    await testGetMentorsByRole();
    await testGetMentorsByTags();
    
    // Test utility endpoints
    await testGetAllRoles();
    await testGetAllTags();
    await testGetMentorStats();
    
    // Test error cases
    await testInvalidId();
    await testNonExistentMentor();
    
    // Clean up - delete test mentors
    if (mentorId1) {
        await testDeleteMentor(mentorId1);
    }
    
    for (const mentorId of mentorIds) {
        await testDeleteMentor(mentorId);
    }
    
    console.log('\n🎉 All Mentor API tests completed!');
};

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests().catch(console.error);
}

export {
    testCreateMentor,
    testBulkCreateMentors,
    testGetAllMentors,
    testGetMentorById,
    testUpdateMentor,
    testSearchMentors,
    testGetMentorsByRole,
    testGetMentorsByTags,
    testGetAllRoles,
    testGetAllTags,
    testUpdateMentorImage,
    testGetMentorStats,
    testDeleteMentor,
    testInvalidId,
    testNonExistentMentor,
    runAllTests
}; 