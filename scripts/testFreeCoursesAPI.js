import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/free-courses';

// Test data
const testFreeCourse = {
    name: "Introduction to Web Development",
    shortDescription: "Learn the basics of HTML, CSS, and JavaScript",
    details: [
        {
            duration: 8,
            mode: "Online",
            certificate: "Yes",
            level: "Beginner"
        }
    ],
    whyLearnThisCourse: "Web development is one of the most in-demand skills in today's job market. This course will give you a solid foundation to start your career in web development.",
    whatYouWillLearn: [
        "HTML fundamentals and structure",
        "CSS styling and layout",
        "JavaScript basics and DOM manipulation",
        "Responsive web design principles"
    ],
    careerOpportunities: "Frontend Developer, Web Designer, UI/UX Developer, Full Stack Developer",
    courseBenefits: [
        "Free access to all course materials",
        "Certificate upon completion",
        "Lifetime access to course content",
        "Community support and forums"
    ],
    imageUrl: "https://example.com/web-dev-course.jpg",
    metaTitle: "Free Web Development Course - Learn HTML, CSS, JavaScript",
    metaDescription: "Start your web development journey with our free course covering HTML, CSS, and JavaScript fundamentals.",
    metaKeywords: "web development, HTML, CSS, JavaScript, free course, programming"
};

let createdCourseId;
let createdDetailId;

async function testFreeCoursesAPI() {
    console.log('🧪 Testing FreeCourses API...\n');

    try {
        // Test 1: Create a new free course
        console.log('1. Testing CREATE free course...');
        const createResponse = await axios.post(BASE_URL, testFreeCourse);
        console.log('✅ Create successful:', createResponse.data.success);
        createdCourseId = createResponse.data.data._id;
        console.log('Created course ID:', createdCourseId, '\n');

        // Test 2: Get all free courses
        console.log('2. Testing GET all free courses...');
        const getAllResponse = await axios.get(BASE_URL);
        console.log('✅ Get all successful:', getAllResponse.data.success);
        console.log('Total courses:', getAllResponse.data.data.length, '\n');

        // Test 3: Get active free courses
        console.log('3. Testing GET active free courses...');
        const getActiveResponse = await axios.get(`${BASE_URL}/active`);
        console.log('✅ Get active successful:', getActiveResponse.data.success);
        console.log('Active courses:', getActiveResponse.data.data.length, '\n');

        // Test 4: Get free course by ID
        console.log('4. Testing GET free course by ID...');
        const getByIdResponse = await axios.get(`${BASE_URL}/${createdCourseId}`);
        console.log('✅ Get by ID successful:', getByIdResponse.data.success);
        console.log('Course name:', getByIdResponse.data.data.name, '\n');

        // Test 5: Add course detail
        console.log('5. Testing ADD course detail...');
        const newDetail = {
            duration: 12,
            mode: "Hybrid",
            certificate: "Yes",
            level: "Intermediate"
        };
        const addDetailResponse = await axios.post(`${BASE_URL}/${createdCourseId}/details`, newDetail);
        console.log('✅ Add detail successful:', addDetailResponse.data.success);
        createdDetailId = addDetailResponse.data.data._id;
        console.log('Created detail ID:', createdDetailId, '\n');

        // Test 6: Update course detail
        console.log('6. Testing UPDATE course detail...');
        const updatedDetail = {
            duration: 10,
            mode: "Online",
            certificate: "Yes",
            level: "Advanced"
        };
        const updateDetailResponse = await axios.put(`${BASE_URL}/${createdCourseId}/details/${createdDetailId}`, updatedDetail);
        console.log('✅ Update detail successful:', updateDetailResponse.data.success);
        console.log('Updated duration:', updateDetailResponse.data.data.duration, '\n');

        // Test 7: Add what you will learn item
        console.log('7. Testing ADD what you will learn...');
        const newLearningItem = { item: "Advanced JavaScript concepts and ES6 features" };
        const addLearningResponse = await axios.post(`${BASE_URL}/${createdCourseId}/what-you-will-learn`, newLearningItem);
        console.log('✅ Add learning item successful:', addLearningResponse.data.success);
        console.log('Added item:', addLearningResponse.data.data.item, '\n');

        // Test 8: Update what you will learn item
        console.log('8. Testing UPDATE what you will learn...');
        const updatedLearningItem = { item: "Advanced JavaScript concepts, ES6+ features, and modern frameworks" };
        const updateLearningResponse = await axios.put(`${BASE_URL}/${createdCourseId}/what-you-will-learn/4`, updatedLearningItem);
        console.log('✅ Update learning item successful:', updateLearningResponse.data.success);
        console.log('Updated item:', updateLearningResponse.data.data.item, '\n');

        // Test 9: Add course benefit
        console.log('9. Testing ADD course benefit...');
        const newBenefit = { benefit: "Real-world project portfolio building" };
        const addBenefitResponse = await axios.post(`${BASE_URL}/${createdCourseId}/course-benefits`, newBenefit);
        console.log('✅ Add benefit successful:', addBenefitResponse.data.success);
        console.log('Added benefit:', addBenefitResponse.data.data.benefit, '\n');

        // Test 10: Update course benefit
        console.log('10. Testing UPDATE course benefit...');
        const updatedBenefit = { benefit: "Real-world project portfolio building with industry best practices" };
        const updateBenefitResponse = await axios.put(`${BASE_URL}/${createdCourseId}/course-benefits/4`, updatedBenefit);
        console.log('✅ Update benefit successful:', updateBenefitResponse.data.success);
        console.log('Updated benefit:', updateBenefitResponse.data.data.benefit, '\n');

        // Test 11: Update free course
        console.log('11. Testing UPDATE free course...');
        const updateData = {
            name: "Advanced Web Development Fundamentals",
            shortDescription: "Master HTML, CSS, and JavaScript with advanced concepts"
        };
        const updateResponse = await axios.put(`${BASE_URL}/${createdCourseId}`, updateData);
        console.log('✅ Update successful:', updateResponse.data.success);
        console.log('Updated name:', updateResponse.data.data.name, '\n');

        // Test 12: Toggle course status
        console.log('12. Testing TOGGLE course status...');
        const toggleResponse = await axios.put(`${BASE_URL}/${createdCourseId}/toggle-status`);
        console.log('✅ Toggle status successful:', toggleResponse.data.success);
        console.log('Status message:', toggleResponse.data.message, '\n');

        // Test 13: Delete what you will learn item
        console.log('13. Testing DELETE what you will learn...');
        const deleteLearningResponse = await axios.delete(`${BASE_URL}/${createdCourseId}/what-you-will-learn/4`);
        console.log('✅ Delete learning item successful:', deleteLearningResponse.data.success);
        console.log('Message:', deleteLearningResponse.data.message, '\n');

        // Test 14: Delete course benefit
        console.log('14. Testing DELETE course benefit...');
        const deleteBenefitResponse = await axios.delete(`${BASE_URL}/${createdCourseId}/course-benefits/4`);
        console.log('✅ Delete benefit successful:', deleteBenefitResponse.data.success);
        console.log('Message:', deleteBenefitResponse.data.message, '\n');

        // Test 15: Delete course detail
        console.log('15. Testing DELETE course detail...');
        const deleteDetailResponse = await axios.delete(`${BASE_URL}/${createdCourseId}/details/${createdDetailId}`);
        console.log('✅ Delete detail successful:', deleteDetailResponse.data.success);
        console.log('Message:', deleteDetailResponse.data.message, '\n');

        // Test 16: Delete free course
        console.log('16. Testing DELETE free course...');
        const deleteResponse = await axios.delete(`${BASE_URL}/${createdCourseId}`);
        console.log('✅ Delete successful:', deleteResponse.data.success);
        console.log('Message:', deleteResponse.data.message, '\n');

        // Test 17: Verify deletion
        console.log('17. Testing GET deleted course (should return 404)...');
        try {
            await axios.get(`${BASE_URL}/${createdCourseId}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✅ Course successfully deleted (404 returned as expected)');
            } else {
                console.log('❌ Unexpected error:', error.message);
            }
        }

        console.log('\n🎉 All FreeCourses API tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response ? error.response.data : error.message);
    }
}

// Run the tests
testFreeCoursesAPI(); 