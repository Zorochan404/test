import mongoose from 'mongoose';
import CareerPost from '../models/careerPost.js';
import { MONGODB_URI } from '../config/env.js';

// Sample career post data
const careerPostsData = [
    {
        title: "Senior Software Developer",
        place: "San Francisco, CA",
        description: "We are seeking a Senior Software Developer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions. The ideal candidate will have strong technical skills and experience with modern web technologies.",
        requirements: [
            "Bachelor's degree in Computer Science or related field",
            "5+ years of experience in software development",
            "Proficiency in JavaScript, Python, or Java",
            "Experience with cloud platforms (AWS, Azure, or GCP)",
            "Strong understanding of database design and SQL",
            "Experience with microservices architecture",
            "Excellent problem-solving and analytical skills",
            "Strong communication and teamwork abilities"
        ],
        partTime: false,
        isActive: true
    },
    {
        title: "Marketing Coordinator",
        place: "New York, NY",
        description: "Join our marketing team as a Marketing Coordinator. You will assist in developing and implementing marketing strategies, managing social media accounts, and coordinating marketing campaigns. This is a great opportunity for someone passionate about digital marketing.",
        requirements: [
            "Bachelor's degree in Marketing, Communications, or related field",
            "1-2 years of experience in marketing or related field",
            "Experience with social media platforms and digital marketing tools",
            "Proficiency in Microsoft Office Suite and Google Analytics",
            "Strong written and verbal communication skills",
            "Creative mindset and attention to detail",
            "Ability to work in a fast-paced environment"
        ],
        partTime: false,
        isActive: true
    },
    {
        title: "Data Science Intern",
        place: "Remote",
        description: "We are offering an exciting internship opportunity for a Data Science student. You will work on real-world projects, analyze data, and develop machine learning models. This internship will provide valuable hands-on experience in the field of data science.",
        requirements: [
            "Currently pursuing a degree in Data Science, Statistics, or related field",
            "Basic knowledge of Python and data analysis libraries (pandas, numpy)",
            "Understanding of statistical concepts and machine learning",
            "Experience with SQL and database management",
            "Strong analytical and problem-solving skills",
            "Good communication skills and ability to work in a team",
            "Available for 20-30 hours per week"
        ],
        partTime: true,
        isActive: true
    },
    {
        title: "UX/UI Designer",
        place: "Austin, TX",
        description: "We are looking for a talented UX/UI Designer to create beautiful and functional user experiences. You will work closely with our development team to design intuitive interfaces and improve user engagement across our products.",
        requirements: [
            "Bachelor's degree in Design, Human-Computer Interaction, or related field",
            "3+ years of experience in UX/UI design",
            "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
            "Experience with user research and usability testing",
            "Strong portfolio showcasing web and mobile design work",
            "Understanding of design principles and user-centered design",
            "Experience with prototyping tools and design systems",
            "Excellent communication and presentation skills"
        ],
        partTime: false,
        isActive: true
    },
    {
        title: "Content Writer",
        place: "Chicago, IL",
        description: "Join our content team as a Content Writer. You will create engaging and informative content for our website, blog, and marketing materials. The ideal candidate will have a passion for writing and the ability to adapt their style to different audiences.",
        requirements: [
            "Bachelor's degree in English, Journalism, Communications, or related field",
            "2+ years of experience in content writing or copywriting",
            "Excellent writing, editing, and proofreading skills",
            "Experience with SEO best practices and content optimization",
            "Ability to research and write about various topics",
            "Familiarity with content management systems",
            "Strong attention to detail and ability to meet deadlines",
            "Portfolio of published work"
        ],
        partTime: true,
        isActive: true
    },
    {
        title: "DevOps Engineer",
        place: "Seattle, WA",
        description: "We are seeking a DevOps Engineer to help us build and maintain our infrastructure. You will work on automating deployment processes, managing cloud infrastructure, and ensuring system reliability and performance.",
        requirements: [
            "Bachelor's degree in Computer Science, Information Technology, or related field",
            "3+ years of experience in DevOps or system administration",
            "Experience with cloud platforms (AWS, Azure, or GCP)",
            "Proficiency in scripting languages (Python, Bash, or PowerShell)",
            "Experience with containerization (Docker, Kubernetes)",
            "Knowledge of CI/CD pipelines and automation tools",
            "Experience with monitoring and logging tools",
            "Strong problem-solving and troubleshooting skills"
        ],
        partTime: false,
        isActive: true
    },
    {
        title: "Sales Representative",
        place: "Boston, MA",
        description: "Join our sales team as a Sales Representative. You will be responsible for generating leads, building relationships with clients, and closing deals. This role offers excellent growth opportunities and competitive compensation.",
        requirements: [
            "Bachelor's degree in Business, Marketing, or related field",
            "1-2 years of experience in sales or customer service",
            "Strong interpersonal and communication skills",
            "Ability to build and maintain client relationships",
            "Experience with CRM systems (Salesforce preferred)",
            "Goal-oriented and self-motivated",
            "Ability to work independently and as part of a team",
            "Willingness to travel occasionally"
        ],
        partTime: false,
        isActive: false
    },
    {
        title: "Product Manager",
        place: "Denver, CO",
        description: "We are looking for a Product Manager to lead product development initiatives. You will work with cross-functional teams to define product strategy, prioritize features, and ensure successful product launches.",
        requirements: [
            "Bachelor's degree in Business, Engineering, or related field",
            "5+ years of experience in product management",
            "Experience with agile development methodologies",
            "Strong analytical and strategic thinking skills",
            "Excellent communication and leadership abilities",
            "Experience with product analytics and user research",
            "Ability to work with technical and non-technical stakeholders",
            "Proven track record of successful product launches"
        ],
        partTime: false,
        isActive: true
    }
];

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Clear existing career posts
const clearCareerPosts = async () => {
    try {
        await CareerPost.deleteMany({});
        console.log('🗑️  Cleared existing career posts');
    } catch (error) {
        console.error('❌ Error clearing career posts:', error);
    }
};

// Seed career posts
const seedCareerPosts = async () => {
    try {
        const createdCareerPosts = await CareerPost.insertMany(careerPostsData);
        console.log(`✅ Successfully seeded ${createdCareerPosts.length} career posts`);
        
        // Display summary
        console.log('\n📊 Career Posts Summary:');
        console.log(`- Total career posts: ${createdCareerPosts.length}`);
        console.log(`- Full-time positions: ${createdCareerPosts.filter(post => !post.partTime).length}`);
        console.log(`- Part-time positions: ${createdCareerPosts.filter(post => post.partTime).length}`);
        console.log(`- Active positions: ${createdCareerPosts.filter(post => post.isActive).length}`);
        console.log(`- Inactive positions: ${createdCareerPosts.filter(post => !post.isActive).length}`);
        
        // Display unique places
        const places = [...new Set(createdCareerPosts.map(post => post.place))];
        console.log(`- Locations: ${places.join(', ')}`);
        
    } catch (error) {
        console.error('❌ Error seeding career posts:', error);
    }
};

// Main function
const main = async () => {
    console.log('🚀 Starting Career Post Data Seeding...\n');
    
    await connectToDatabase();
    await clearCareerPosts();
    await seedCareerPosts();
    
    console.log('\n🎉 Career Post Data Seeding Completed!');
    
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
};

// Run the seeding
main().catch(console.error); 