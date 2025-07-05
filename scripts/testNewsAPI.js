import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/news';

// Test data
const testNews = {
    title: "New Technology Breakthrough",
    type: "Technology",
    subType: "Innovation",
    description: "A revolutionary breakthrough in artificial intelligence technology that promises to transform various industries.",
    pointdetails: [
        "Advanced machine learning algorithms",
        "Improved accuracy by 40%",
        "Reduced processing time by 60%",
        "Enhanced user experience"
    ],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    date: "2024-06-12T10:00:00.000Z",
    time: "10:00 AM",
    tags: ["AI", "Machine Learning", "Technology", "Innovation"],
    isActive: true
};

const testNews2 = {
    title: "Educational Reform Initiative",
    type: "Education",
    subType: "Policy",
    description: "A comprehensive educational reform initiative aimed at improving student outcomes and modernizing curriculum.",
    pointdetails: [
        "Updated curriculum standards",
        "Enhanced teacher training programs",
        "Improved student assessment methods",
        "Increased technology integration"
    ],
    image: "https://images.unsplash.com/photo-1523240794102-9eb5ccbdd663?w=800&h=600&fit=crop",
    date: "2024-06-11T14:30:00.000Z",
    time: "2:30 PM",
    tags: ["Education", "Policy", "Reform", "Students"],
    isActive: true
};

const testNews3 = {
    title: "Business Innovation Summit",
    type: "Business",
    subType: "Conference",
    description: "Annual business innovation summit bringing together industry leaders to discuss future trends and opportunities.",
    pointdetails: [
        "Keynote speeches from industry leaders",
        "Panel discussions on innovation",
        "Networking opportunities",
        "Startup showcase"
    ],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    date: "2024-06-10T09:00:00.000Z",
    time: "9:00 AM",
    tags: ["Business", "Innovation", "Conference", "Networking"],
    isActive: false
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

// Test 1: Create a single news article
const testCreateNews = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, testNews);
        logResult('Create Single News', true, response.data);
        return response.data.data._id;
    } catch (error) {
        logResult('Create Single News', false, null, error);
        return null;
    }
};

// Test 2: Create multiple news articles
const testBulkCreateNews = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/bulk/create`, {
            news: [testNews2, testNews3]
        });
        logResult('Bulk Create News', true, response.data);
        return response.data.data.news.map(article => article._id);
    } catch (error) {
        logResult('Bulk Create News', false, null, error);
        return [];
    }
};

// Test 3: Get all news articles
const testGetAllNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all?page=1&limit=5`);
        logResult('Get All News', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get All News', false, null, error);
        return [];
    }
};

// Test 4: Get news by ID
const testGetNewsById = async (newsId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${newsId}`);
        logResult('Get News by ID', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get News by ID', false, null, error);
        return null;
    }
};

// Test 5: Update news article
const testUpdateNews = async (newsId) => {
    try {
        const updateData = {
            title: "Updated Technology Breakthrough",
            type: "Technology",
            subType: "AI Innovation",
            description: "Updated description with more details about the breakthrough...",
            pointdetails: [
                "Advanced machine learning algorithms",
                "Improved accuracy by 50%",
                "Reduced processing time by 70%",
                "Enhanced user experience",
                "New feature added"
            ],
            tags: ["AI", "Machine Learning", "Technology", "Innovation", "Deep Learning"]
        };
        const response = await axios.put(`${BASE_URL}/${newsId}`, updateData);
        logResult('Update News', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update News', false, null, error);
        return null;
    }
};

// Test 6: Search news
const testSearchNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/search?q=technology&page=1&limit=3`);
        logResult('Search News', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Search News', false, null, error);
        return [];
    }
};

// Test 7: Get news by type
const testGetNewsByType = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/type/Technology?page=1&limit=3`);
        logResult('Get News by Type', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get News by Type', false, null, error);
        return [];
    }
};

// Test 8: Get news by subType
const testGetNewsBySubType = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/subtype/Innovation?page=1&limit=3`);
        logResult('Get News by SubType', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get News by SubType', false, null, error);
        return [];
    }
};

// Test 9: Get news by tags
const testGetNewsByTags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tags/AI,Technology?page=1&limit=3`);
        logResult('Get News by Tags', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get News by Tags', false, null, error);
        return [];
    }
};

// Test 10: Get news by date range
const testGetNewsByDateRange = async () => {
    try {
        const startDate = '2024-06-01';
        const endDate = '2024-06-30';
        const response = await axios.get(`${BASE_URL}/date-range?startDate=${startDate}&endDate=${endDate}&page=1&limit=3`);
        logResult('Get News by Date Range', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get News by Date Range', false, null, error);
        return [];
    }
};

// Test 11: Get latest news
const testGetLatestNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/latest?limit=3`);
        logResult('Get Latest News', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get Latest News', false, null, error);
        return [];
    }
};

// Test 12: Get all types
const testGetAllTypes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/types/all`);
        logResult('Get All Types', true, response.data);
        return response.data.data.types;
    } catch (error) {
        logResult('Get All Types', false, null, error);
        return [];
    }
};

// Test 13: Get all subTypes
const testGetAllSubTypes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/subtypes/all`);
        logResult('Get All SubTypes', true, response.data);
        return response.data.data.subTypes;
    } catch (error) {
        logResult('Get All SubTypes', false, null, error);
        return [];
    }
};

// Test 14: Get all tags
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

// Test 15: Update news image
const testUpdateNewsImage = async (newsId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${newsId}/image`, {
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&updated=true"
        });
        logResult('Update News Image', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update News Image', false, null, error);
        return null;
    }
};

// Test 16: Get news statistics
const testGetNewsStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/stats/overview`);
        logResult('Get News Statistics', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get News Statistics', false, null, error);
        return null;
    }
};

// Test 17: Delete news article
const testDeleteNews = async (newsId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${newsId}`);
        logResult('Delete News', true, response.data);
        return true;
    } catch (error) {
        logResult('Delete News', false, null, error);
        return false;
    }
};

// Test 18: Test invalid ID
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

// Test 19: Test non-existent news
const testNonExistentNews = async () => {
    try {
        await axios.get(`${BASE_URL}/507f1f77bcf86cd799439011`);
        logResult('Test Non-existent News', false, null, { message: 'Should have failed' });
    } catch (error) {
        if (error.response?.status === 404) {
            logResult('Test Non-existent News', true, { message: 'Correctly returned 404' });
        } else {
            logResult('Test Non-existent News', false, null, error);
        }
    }
};

// Test 20: Test sorting and filtering
const testSortingAndFiltering = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all?page=1&limit=3&sortBy=title&sortOrder=asc&type=Technology`);
        logResult('Test Sorting and Filtering', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Test Sorting and Filtering', false, null, error);
        return [];
    }
};

// Test 21: Get active news articles
const testGetActiveNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/active?page=1&limit=5`);
        logResult('Get Active News', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get Active News', false, null, error);
        return [];
    }
};

// Test 22: Get inactive news articles
const testGetInactiveNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/inactive?page=1&limit=5`);
        logResult('Get Inactive News', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Get Inactive News', false, null, error);
        return [];
    }
};

// Test 23: Toggle news status
const testToggleNewsStatus = async (newsId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${newsId}/toggle-status`);
        logResult('Toggle News Status', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Toggle News Status', false, null, error);
        return null;
    }
};

// Test 24: Filter news by isActive status
const testFilterByActiveStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all?page=1&limit=5&isActive=true`);
        logResult('Filter by Active Status', true, response.data);
        return response.data.data.news;
    } catch (error) {
        logResult('Filter by Active Status', false, null, error);
        return [];
    }
};

// Main test runner
const runAllTests = async () => {
    console.log('🚀 Starting News API Tests...\n');
    
    // Create news articles
    const newsId1 = await testCreateNews();
    const newsIds = await testBulkCreateNews();
    
    // Wait a bit for database operations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test basic operations
    await testGetAllNews();
    
    if (newsId1) {
        await testGetNewsById(newsId1);
        await testUpdateNews(newsId1);
        await testUpdateNewsImage(newsId1);
    }
    
    // Test search and filtering
    await testSearchNews();
    await testGetNewsByType();
    await testGetNewsBySubType();
    await testGetNewsByTags();
    await testGetNewsByDateRange();
    await testGetLatestNews();
    await testSortingAndFiltering();
    
    // Test isActive functionality
    await testGetActiveNews();
    await testGetInactiveNews();
    await testFilterByActiveStatus();
    
    if (newsId1) {
        await testToggleNewsStatus(newsId1);
    }
    
    // Test utility endpoints
    await testGetAllTypes();
    await testGetAllSubTypes();
    await testGetAllTags();
    await testGetNewsStats();
    
    // Test error cases
    await testInvalidId();
    await testNonExistentNews();
    
    // Clean up - delete test news articles
    if (newsId1) {
        await testDeleteNews(newsId1);
    }
    
    for (const newsId of newsIds) {
        await testDeleteNews(newsId);
    }
    
    console.log('\n🎉 All News API tests completed!');
};

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests().catch(console.error);
}

export {
    testCreateNews,
    testBulkCreateNews,
    testGetAllNews,
    testGetNewsById,
    testUpdateNews,
    testSearchNews,
    testGetNewsByType,
    testGetNewsBySubType,
    testGetNewsByTags,
    testGetNewsByDateRange,
    testGetLatestNews,
    testGetAllTypes,
    testGetAllSubTypes,
    testGetAllTags,
    testUpdateNewsImage,
    testGetNewsStats,
    testDeleteNews,
    testInvalidId,
    testNonExistentNews,
    testSortingAndFiltering,
    runAllTests
}; 