import Mentor from '../models/mentors.js';
import { connectDB } from '../database/mongodb.js';

// Sample mentor data
const sampleMentors = [
    {
        name: "Sarah Johnson",
        role: "Senior Software Engineer",
        description: "Experienced software engineer with 12+ years in full-stack development. Specializes in JavaScript, React, Node.js, and cloud technologies. Passionate about mentoring junior developers and contributing to open-source projects.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        tags: ["JavaScript", "React", "Node.js", "AWS", "MongoDB", "TypeScript"]
    },
    {
        name: "Michael Chen",
        role: "UI/UX Designer",
        description: "Creative UI/UX designer with 8+ years of experience creating user-centered digital experiences. Expert in design systems, prototyping, and user research. Previously worked at top tech companies.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        tags: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"]
    },
    {
        name: "Emily Rodriguez",
        role: "Data Scientist",
        description: "Data scientist with expertise in machine learning, statistical analysis, and big data processing. PhD in Computer Science with focus on AI/ML. Experienced in Python, TensorFlow, and data visualization.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        tags: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL", "Tableau"]
    },
    {
        name: "David Kim",
        role: "DevOps Engineer",
        description: "DevOps engineer with 10+ years of experience in infrastructure automation, CI/CD pipelines, and cloud architecture. Expert in Docker, Kubernetes, and AWS. Passionate about infrastructure as code.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        tags: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"]
    },
    {
        name: "Lisa Wang",
        role: "Product Manager",
        description: "Product manager with 7+ years of experience in agile product development. Expert in user research, market analysis, and product strategy. Successfully launched multiple products with millions of users.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        tags: ["Product Management", "Agile", "User Research", "Market Analysis", "Product Strategy", "A/B Testing"]
    },
    {
        name: "James Wilson",
        role: "Mobile App Developer",
        description: "Mobile app developer specializing in iOS and Android development. 9+ years of experience with React Native, Swift, and Kotlin. Created apps with millions of downloads across various categories.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        tags: ["React Native", "iOS", "Android", "Swift", "Kotlin", "Mobile Development"]
    },
    {
        name: "Amanda Foster",
        role: "Frontend Developer",
        description: "Frontend developer with 6+ years of experience in modern web technologies. Expert in React, Vue.js, and CSS frameworks. Passionate about creating accessible and performant user interfaces.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        tags: ["React", "Vue.js", "JavaScript", "CSS", "Accessibility", "Performance"]
    },
    {
        name: "Robert Taylor",
        role: "Backend Developer",
        description: "Backend developer with 11+ years of experience in server-side development. Expert in Java, Spring Boot, and microservices architecture. Experienced in building scalable and secure APIs.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        tags: ["Java", "Spring Boot", "Microservices", "REST APIs", "PostgreSQL", "Redis"]
    },
    {
        name: "Jennifer Lee",
        role: "Full Stack Developer",
        description: "Full stack developer with 8+ years of experience across the entire development stack. Expert in MERN stack, cloud deployment, and database design. Passionate about clean code and best practices.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
        tags: ["MERN Stack", "JavaScript", "React", "Node.js", "MongoDB", "AWS"]
    },
    {
        name: "Thomas Anderson",
        role: "Cybersecurity Specialist",
        description: "Cybersecurity specialist with 10+ years of experience in security assessment, penetration testing, and security architecture. Expert in ethical hacking, security tools, and compliance frameworks.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        tags: ["Cybersecurity", "Penetration Testing", "Ethical Hacking", "Security Tools", "Compliance", "Network Security"]
    },
    {
        name: "Rachel Green",
        role: "QA Engineer",
        description: "QA engineer with 7+ years of experience in software testing and quality assurance. Expert in automated testing, test planning, and quality processes. Experienced in Selenium, Cypress, and performance testing.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        tags: ["QA Testing", "Automated Testing", "Selenium", "Cypress", "Performance Testing", "Test Planning"]
    },
    {
        name: "Kevin Martinez",
        role: "Blockchain Developer",
        description: "Blockchain developer with 5+ years of experience in smart contracts, DeFi protocols, and blockchain architecture. Expert in Solidity, Ethereum, and Web3 technologies. Passionate about decentralized applications.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        tags: ["Blockchain", "Solidity", "Ethereum", "Smart Contracts", "DeFi", "Web3"]
    },
    {
        name: "Sophie Brown",
        role: "AI/ML Engineer",
        description: "AI/ML engineer with 6+ years of experience in machine learning, deep learning, and artificial intelligence. Expert in Python, TensorFlow, PyTorch, and computer vision. PhD in Machine Learning.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        tags: ["AI/ML", "Python", "TensorFlow", "PyTorch", "Computer Vision", "Deep Learning"]
    },
    {
        name: "Alex Thompson",
        role: "Game Developer",
        description: "Game developer with 8+ years of experience in Unity, Unreal Engine, and mobile game development. Expert in C#, C++, and game design principles. Created multiple successful games across different platforms.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        tags: ["Unity", "Unreal Engine", "C#", "C++", "Game Development", "Mobile Games"]
    },
    {
        name: "Maria Garcia",
        role: "Cloud Architect",
        description: "Cloud architect with 12+ years of experience in cloud infrastructure and architecture design. Expert in AWS, Azure, and Google Cloud Platform. Experienced in designing scalable and cost-effective cloud solutions.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        tags: ["Cloud Architecture", "AWS", "Azure", "Google Cloud", "Infrastructure", "Scalability"]
    }
];

// Function to seed mentor data
const seedMentorData = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log('📦 Connected to database');

        // Clear existing mentor data
        await Mentor.deleteMany({});
        console.log('🗑️  Cleared existing mentor data');

        // Insert sample mentors
        const createdMentors = await Mentor.insertMany(sampleMentors);
        console.log(`✅ Successfully created ${createdMentors.length} mentors`);

        // Display created mentors
        console.log('\n📋 Created Mentors:');
        createdMentors.forEach((mentor, index) => {
            console.log(`${index + 1}. ${mentor.name} - ${mentor.role}`);
        });

        // Get statistics
        const totalMentors = await Mentor.countDocuments();
        const roles = await Mentor.distinct('role');
        const tags = await Mentor.distinct('tags');

        console.log('\n📊 Mentor Statistics:');
        console.log(`Total Mentors: ${totalMentors}`);
        console.log(`Unique Roles: ${roles.length}`);
        console.log(`Unique Tags: ${tags.length}`);

        console.log('\n🎯 Available Roles:');
        roles.forEach(role => console.log(`- ${role}`));

        console.log('\n🏷️  Available Tags:');
        tags.slice(0, 20).forEach(tag => console.log(`- ${tag}`));
        if (tags.length > 20) {
            console.log(`... and ${tags.length - 20} more tags`);
        }

        console.log('\n🎉 Mentor data seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding mentor data:', error);
        process.exit(1);
    }
};

// Function to add a single mentor
const addSingleMentor = async (mentorData) => {
    try {
        await connectDB();
        console.log('📦 Connected to database');

        const newMentor = await Mentor.create(mentorData);
        console.log('✅ Successfully created mentor:', newMentor.name);
        
        return newMentor;
    } catch (error) {
        console.error('❌ Error creating mentor:', error);
        throw error;
    }
};

// Function to get mentor statistics
const getMentorStats = async () => {
    try {
        await connectDB();
        console.log('📦 Connected to database');

        const totalMentors = await Mentor.countDocuments();
        const roles = await Mentor.distinct('role');
        const tags = await Mentor.distinct('tags');

        // Get mentors count by role
        const mentorsByRole = await Mentor.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        // Get most common tags
        const tagStats = await Mentor.aggregate([
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

        console.log('\n📊 Mentor Statistics:');
        console.log(`Total Mentors: ${totalMentors}`);
        console.log(`Unique Roles: ${roles.length}`);
        console.log(`Unique Tags: ${tags.length}`);

        console.log('\n👥 Mentors by Role:');
        mentorsByRole.forEach(item => {
            console.log(`- ${item._id}: ${item.count} mentors`);
        });

        console.log('\n🏷️  Top Tags:');
        tagStats.forEach(item => {
            console.log(`- ${item._id}: ${item.count} mentors`);
        });

        return {
            totalMentors,
            uniqueRoles: roles.length,
            uniqueTags: tags.length,
            mentorsByRole,
            topTags: tagStats
        };

    } catch (error) {
        console.error('❌ Error getting mentor statistics:', error);
        throw error;
    }
};

// Run seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const command = process.argv[2];
    
    switch (command) {
        case 'seed':
            seedMentorData();
            break;
        case 'stats':
            getMentorStats().then(() => process.exit(0));
            break;
        default:
            console.log('Usage: node seedMentorData.js [seed|stats]');
            console.log('  seed  - Seed the database with sample mentor data');
            console.log('  stats - Display mentor statistics');
            process.exit(0);
    }
}

export {
    seedMentorData,
    addSingleMentor,
    getMentorStats,
    sampleMentors
}; 