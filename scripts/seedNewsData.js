import News from '../models/news.js';
import { connectDB } from '../database/mongodb.js';

// Sample news data
const sampleNews = [
    {
        title: "New AI Technology Breakthrough",
        type: "Technology",
        subType: "Innovation",
        description: "A revolutionary breakthrough in artificial intelligence technology that promises to transform various industries with advanced machine learning capabilities.",
        pointdetails: [
            "Advanced machine learning algorithms with 95% accuracy",
            "Improved processing speed by 60%",
            "Enhanced natural language processing",
            "Real-time data analysis capabilities",
            "Scalable cloud-based architecture"
        ],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        date: "2024-06-12T10:00:00.000Z",
        time: "10:00 AM",
        tags: ["AI", "Machine Learning", "Technology", "Innovation", "Cloud Computing"],
        isActive: true
    },
    {
        title: "Educational Reform Initiative Launched",
        type: "Education",
        subType: "Policy",
        description: "A comprehensive educational reform initiative aimed at improving student outcomes and modernizing curriculum for the digital age.",
        pointdetails: [
            "Updated curriculum standards for modern skills",
            "Enhanced teacher training programs",
            "Improved student assessment methods",
            "Increased technology integration in classrooms",
            "Focus on critical thinking and problem-solving"
        ],
        image: "https://images.unsplash.com/photo-1523240794102-9eb5ccbdd663?w=800&h=600&fit=crop",
        date: "2024-06-11T14:30:00.000Z",
        time: "2:30 PM",
        tags: ["Education", "Policy", "Reform", "Students", "Technology"],
        isActive: true
    },
    {
        title: "Annual Business Innovation Summit",
        type: "Business",
        subType: "Conference",
        description: "Annual business innovation summit bringing together industry leaders to discuss future trends and opportunities in the rapidly evolving business landscape.",
        pointdetails: [
            "Keynote speeches from industry leaders",
            "Panel discussions on innovation strategies",
            "Networking opportunities with executives",
            "Startup showcase and pitch competitions",
            "Workshops on digital transformation"
        ],
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
        date: "2024-06-10T09:00:00.000Z",
        time: "9:00 AM",
        tags: ["Business", "Innovation", "Conference", "Networking", "Startups"],
        isActive: true
    },
    {
        title: "Healthcare Technology Advancements",
        type: "Health",
        subType: "Medical",
        description: "Latest advancements in healthcare technology including telemedicine, AI diagnostics, and personalized medicine solutions.",
        pointdetails: [
            "AI-powered diagnostic tools",
            "Telemedicine platform improvements",
            "Personalized treatment plans",
            "Remote patient monitoring systems",
            "Enhanced medical imaging technology"
        ],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        date: "2024-06-09T16:00:00.000Z",
        time: "4:00 PM",
        tags: ["Healthcare", "Technology", "AI", "Telemedicine", "Medical"],
        isActive: true
    },
    {
        title: "Environmental Conservation Project",
        type: "Environment",
        subType: "Conservation",
        description: "Major environmental conservation project launched to protect endangered species and restore natural habitats.",
        pointdetails: [
            "Habitat restoration initiatives",
            "Endangered species protection programs",
            "Community engagement and education",
            "Sustainable development practices",
            "Climate change mitigation strategies"
        ],
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        date: "2024-06-08T11:00:00.000Z",
        time: "11:00 AM",
        tags: ["Environment", "Conservation", "Sustainability", "Climate Change", "Wildlife"],
        isActive: true
    },
    {
        title: "Sports Championship Finals",
        type: "Sports",
        subType: "Championship",
        description: "Exciting championship finals featuring top athletes competing for the ultimate prize in their respective sports.",
        pointdetails: [
            "Multiple sports championships",
            "World-class athletes competing",
            "Record-breaking performances",
            "International audience engagement",
            "Advanced sports technology integration"
        ],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        date: "2024-06-07T19:00:00.000Z",
        time: "7:00 PM",
        tags: ["Sports", "Championship", "Athletes", "Competition", "Entertainment"],
        isActive: false
    },
    {
        title: "Entertainment Industry Awards",
        type: "Entertainment",
        subType: "Awards",
        description: "Annual entertainment industry awards ceremony celebrating excellence in film, music, and television.",
        pointdetails: [
            "Award categories for various media",
            "Celebrity performances and presentations",
            "Industry recognition and networking",
            "Live broadcast to millions worldwide",
            "Charity fundraising initiatives"
        ],
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
        date: "2024-06-06T20:00:00.000Z",
        time: "8:00 PM",
        tags: ["Entertainment", "Awards", "Film", "Music", "Television"],
        isActive: true
    },
    {
        title: "Scientific Research Discovery",
        type: "Science",
        subType: "Research",
        description: "Groundbreaking scientific research discovery that could revolutionize our understanding of fundamental physics.",
        pointdetails: [
            "Breakthrough in quantum physics",
            "New particle discovery",
            "Advanced research methodology",
            "International collaboration",
            "Potential applications in technology"
        ],
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
        date: "2024-06-05T13:00:00.000Z",
        time: "1:00 PM",
        tags: ["Science", "Research", "Physics", "Quantum", "Discovery"],
        isActive: true
    },
    {
        title: "Financial Market Analysis",
        type: "Finance",
        subType: "Analysis",
        description: "Comprehensive analysis of global financial markets including trends, predictions, and investment opportunities.",
        pointdetails: [
            "Market trend analysis",
            "Investment opportunity identification",
            "Risk assessment strategies",
            "Economic indicator review",
            "Future market predictions"
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        date: "2024-06-04T15:30:00.000Z",
        time: "3:30 PM",
        tags: ["Finance", "Markets", "Investment", "Analysis", "Economics"],
        isActive: true
    },
    {
        title: "Space Exploration Mission",
        type: "Science",
        subType: "Space",
        description: "Ambitious space exploration mission to study distant planets and search for signs of extraterrestrial life.",
        pointdetails: [
            "Advanced spacecraft technology",
            "Planetary exploration objectives",
            "Scientific instrument deployment",
            "International space collaboration",
            "Public engagement and education"
        ],
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop",
        date: "2024-06-03T12:00:00.000Z",
        time: "12:00 PM",
        tags: ["Space", "Exploration", "Science", "Technology", "Astronomy"],
        isActive: true
    },
    {
        title: "Cultural Festival Celebration",
        type: "Culture",
        subType: "Festival",
        description: "Vibrant cultural festival celebrating diversity, traditions, and artistic expressions from around the world.",
        pointdetails: [
            "International cultural performances",
            "Traditional art exhibitions",
            "Culinary experiences from various cultures",
            "Educational workshops and seminars",
            "Community building activities"
        ],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        date: "2024-06-02T18:00:00.000Z",
        time: "6:00 PM",
        tags: ["Culture", "Festival", "Art", "Diversity", "Community"],
        isActive: true
    },
    {
        title: "Technology Startup Success",
        type: "Business",
        subType: "Startup",
        description: "Promising technology startup achieves major milestone with innovative product launch and significant funding round.",
        pointdetails: [
            "Innovative product development",
            "Successful funding round",
            "Market expansion strategies",
            "Team growth and hiring",
            "Future product roadmap"
        ],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        date: "2024-06-01T10:00:00.000Z",
        time: "10:00 AM",
        tags: ["Startup", "Technology", "Innovation", "Funding", "Business"],
        isActive: true
    },
    {
        title: "Climate Change Conference",
        type: "Environment",
        subType: "Conference",
        description: "International climate change conference bringing together world leaders to discuss environmental policies and solutions.",
        pointdetails: [
            "Global policy discussions",
            "Environmental impact assessments",
            "Sustainable solution proposals",
            "International cooperation agreements",
            "Public awareness campaigns"
        ],
        image: "https://images.unsplash.com/photo-1569163139397-4b1ac19c6d9c?w=800&h=600&fit=crop",
        date: "2024-05-31T14:00:00.000Z",
        time: "2:00 PM",
        tags: ["Climate Change", "Environment", "Policy", "International", "Sustainability"]
    },
    {
        title: "Digital Art Exhibition",
        type: "Art",
        subType: "Exhibition",
        description: "Revolutionary digital art exhibition showcasing cutting-edge technology and creative expressions in the digital realm.",
        pointdetails: [
            "Interactive digital installations",
            "Virtual reality art experiences",
            "AI-generated artwork displays",
            "Artist workshops and demonstrations",
            "Technology and art fusion"
        ],
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
        date: "2024-05-30T16:00:00.000Z",
        time: "4:00 PM",
        tags: ["Art", "Digital", "Technology", "Exhibition", "Innovation"]
    },
    {
        title: "Mental Health Awareness Campaign",
        type: "Health",
        subType: "Awareness",
        description: "Comprehensive mental health awareness campaign aimed at reducing stigma and promoting mental well-being.",
        pointdetails: [
            "Public education initiatives",
            "Mental health resource distribution",
            "Professional support services",
            "Community outreach programs",
            "Stigma reduction efforts"
        ],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        date: "2024-05-29T11:00:00.000Z",
        time: "11:00 AM",
        tags: ["Mental Health", "Awareness", "Wellness", "Community", "Support"]
    }
];

// Function to seed news data
const seedNewsData = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log('📦 Connected to database');

        // Clear existing news data
        await News.deleteMany({});
        console.log('🗑️  Cleared existing news data');

        // Insert sample news
        const createdNews = await News.insertMany(sampleNews);
        console.log(`✅ Successfully created ${createdNews.length} news articles`);

        // Display created news
        console.log('\n📋 Created News Articles:');
        createdNews.forEach((article, index) => {
            console.log(`${index + 1}. ${article.title} - ${article.type} (${article.subType})`);
        });

        // Get statistics
        const totalNews = await News.countDocuments();
        const types = await News.distinct('type');
        const subTypes = await News.distinct('subType');
        const tags = await News.distinct('tags');

        console.log('\n📊 News Statistics:');
        console.log(`Total News Articles: ${totalNews}`);
        console.log(`Unique Types: ${types.length}`);
        console.log(`Unique SubTypes: ${subTypes.length}`);
        console.log(`Unique Tags: ${tags.length}`);

        console.log('\n🎯 Available Types:');
        types.forEach(type => console.log(`- ${type}`));

        console.log('\n📑 Available SubTypes:');
        subTypes.forEach(subType => console.log(`- ${subType}`));

        console.log('\n🏷️  Available Tags:');
        tags.slice(0, 20).forEach(tag => console.log(`- ${tag}`));
        if (tags.length > 20) {
            console.log(`... and ${tags.length - 20} more tags`);
        }

        console.log('\n🎉 News data seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding news data:', error);
        process.exit(1);
    }
};

// Function to add a single news article
const addSingleNews = async (newsData) => {
    try {
        await connectDB();
        console.log('📦 Connected to database');

        const newNews = await News.create(newsData);
        console.log('✅ Successfully created news article:', newNews.title);
        
        return newNews;
    } catch (error) {
        console.error('❌ Error creating news article:', error);
        throw error;
    }
};

// Function to get news statistics
const getNewsStats = async () => {
    try {
        await connectDB();
        console.log('📦 Connected to database');

        const totalNews = await News.countDocuments();
        const types = await News.distinct('type');
        const subTypes = await News.distinct('subType');
        const tags = await News.distinct('tags');

        // Get news count by type
        const newsByType = await News.aggregate([
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        // Get news count by subType
        const newsBySubType = await News.aggregate([
            {
                $group: {
                    _id: '$subType',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        // Get most common tags
        const tagStats = await News.aggregate([
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            { $limit: 10 }
        ]);

        // Get news count by month (last 12 months)
        const newsByMonth = await News.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': -1, '_id.month': -1 }
            },
            { $limit: 12 }
        ]);

        console.log('\n📊 News Statistics:');
        console.log(`Total News Articles: ${totalNews}`);
        console.log(`Unique Types: ${types.length}`);
        console.log(`Unique SubTypes: ${subTypes.length}`);
        console.log(`Unique Tags: ${tags.length}`);

        console.log('\n📰 News by Type:');
        newsByType.forEach(item => {
            console.log(`- ${item._id}: ${item.count} articles`);
        });

        console.log('\n📑 News by SubType:');
        newsBySubType.forEach(item => {
            console.log(`- ${item._id}: ${item.count} articles`);
        });

        console.log('\n🏷️  Top Tags:');
        tagStats.forEach(item => {
            console.log(`- ${item._id}: ${item.count} articles`);
        });

        console.log('\n📅 News by Month (Last 12 months):');
        newsByMonth.forEach(item => {
            console.log(`- ${item._id.year}-${item._id.month}: ${item.count} articles`);
        });

        return {
            totalNews,
            uniqueTypes: types.length,
            uniqueSubTypes: subTypes.length,
            uniqueTags: tags.length,
            newsByType,
            newsBySubType,
            topTags: tagStats,
            newsByMonth
        };

    } catch (error) {
        console.error('❌ Error getting news statistics:', error);
        throw error;
    }
};

// Run seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const command = process.argv[2];
    
    switch (command) {
        case 'seed':
            seedNewsData();
            break;
        case 'stats':
            getNewsStats().then(() => process.exit(0));
            break;
        default:
            console.log('Usage: node seedNewsData.js [seed|stats]');
            console.log('  seed  - Seed the database with sample news data');
            console.log('  stats - Display news statistics');
            process.exit(0);
    }
}

export {
    seedNewsData,
    addSingleNews,
    getNewsStats,
    sampleNews
}; 