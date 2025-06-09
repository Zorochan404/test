import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import Download from '../models/download.js';

const seedDownloadData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing download data
        await Download.deleteMany({});
        console.log('Cleared existing download data');

        // Sample download data
        const sampleDownloads = [
            {
                title: "Inframe School Brochure 2025",
                description: "Complete information about our programs, facilities, and admission process. This comprehensive brochure contains everything you need to know about Inframe School.",
                category: "Brochures",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/brochures/inframe-brochure-2025.pdf",
                fileName: "inframe-brochure-2025.pdf",
                fileSize: "3.2 MB",
                uploadDate: "2025-02-28",
                downloadCount: 245,
                isActive: true
            },
            {
                title: "Application Form - Undergraduate Programs",
                description: "Official application form for undergraduate design and arts programs. Fill out this form to apply for admission to our undergraduate courses.",
                category: "Application Forms",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/forms/undergraduate-application-form.pdf",
                fileName: "undergraduate-application-form.pdf",
                fileSize: "1.8 MB",
                uploadDate: "2025-02-25",
                downloadCount: 189,
                isActive: true
            },
            {
                title: "Application Form - Postgraduate Programs",
                description: "Official application form for postgraduate design and arts programs. Complete this form to apply for our advanced degree programs.",
                category: "Application Forms",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/forms/postgraduate-application-form.pdf",
                fileName: "postgraduate-application-form.pdf",
                fileSize: "2.1 MB",
                uploadDate: "2025-02-25",
                downloadCount: 156,
                isActive: true
            },
            {
                title: "Fee Structure 2025-26",
                description: "Detailed fee structure for all programs including tuition fees, hostel charges, and other expenses. Plan your education investment with our transparent fee structure.",
                category: "Fee Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/fees/fee-structure-2025-26.pdf",
                fileName: "fee-structure-2025-26.pdf",
                fileSize: "1.2 MB",
                uploadDate: "2025-02-20",
                downloadCount: 312,
                isActive: true
            },
            {
                title: "Scholarship Guidelines",
                description: "Complete information about available scholarships, eligibility criteria, and application process. Discover financial aid opportunities at Inframe School.",
                category: "Scholarships",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/scholarships/scholarship-guidelines.pdf",
                fileName: "scholarship-guidelines.pdf",
                fileSize: "2.5 MB",
                uploadDate: "2025-02-18",
                downloadCount: 198,
                isActive: true
            },
            {
                title: "Campus Map and Facilities Guide",
                description: "Interactive campus map with detailed information about all facilities, departments, and amenities available at Inframe School.",
                category: "Campus Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/campus/campus-map-facilities.pdf",
                fileName: "campus-map-facilities.pdf",
                fileSize: "4.1 MB",
                uploadDate: "2025-02-15",
                downloadCount: 167,
                isActive: true
            },
            {
                title: "Academic Calendar 2025-26",
                description: "Complete academic calendar with important dates, examination schedules, holidays, and academic events for the year 2025-26.",
                category: "Academic Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/academic/academic-calendar-2025-26.pdf",
                fileName: "academic-calendar-2025-26.pdf",
                fileSize: "1.5 MB",
                uploadDate: "2025-02-12",
                downloadCount: 234,
                isActive: true
            },
            {
                title: "Hostel Information and Rules",
                description: "Comprehensive guide about hostel facilities, accommodation options, rules and regulations, and hostel life at Inframe School.",
                category: "Hostel Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/hostel/hostel-information-rules.pdf",
                fileName: "hostel-information-rules.pdf",
                fileSize: "2.8 MB",
                uploadDate: "2025-02-10",
                downloadCount: 143,
                isActive: true
            },
            {
                title: "Course Curriculum - Graphic Design",
                description: "Detailed curriculum for the Graphic Design program including course modules, learning outcomes, and career prospects.",
                category: "Course Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/curriculum/graphic-design-curriculum.pdf",
                fileName: "graphic-design-curriculum.pdf",
                fileSize: "3.7 MB",
                uploadDate: "2025-02-08",
                downloadCount: 176,
                isActive: true
            },
            {
                title: "Course Curriculum - Interior Design",
                description: "Comprehensive curriculum for the Interior Design program covering all aspects of interior design education and practical training.",
                category: "Course Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/curriculum/interior-design-curriculum.pdf",
                fileName: "interior-design-curriculum.pdf",
                fileSize: "3.9 MB",
                uploadDate: "2025-02-08",
                downloadCount: 154,
                isActive: true
            },
            {
                title: "Alumni Success Stories",
                description: "Inspiring stories of our successful alumni and their achievements in the design industry. Get motivated by their journey and success.",
                category: "Alumni Information",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/alumni/alumni-success-stories.pdf",
                fileName: "alumni-success-stories.pdf",
                fileSize: "5.2 MB",
                uploadDate: "2025-02-05",
                downloadCount: 89,
                isActive: true
            },
            {
                title: "Industry Partnership Brochure",
                description: "Information about our industry partnerships, internship opportunities, and placement assistance programs for students.",
                category: "Industry Relations",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/industry/industry-partnership-brochure.pdf",
                fileName: "industry-partnership-brochure.pdf",
                fileSize: "2.9 MB",
                uploadDate: "2025-02-03",
                downloadCount: 112,
                isActive: true
            },
            {
                title: "Student Handbook 2025",
                description: "Essential guide for students containing policies, procedures, academic regulations, and student services information.",
                category: "Student Resources",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/student/student-handbook-2025.pdf",
                fileName: "student-handbook-2025.pdf",
                fileSize: "4.5 MB",
                uploadDate: "2025-02-01",
                downloadCount: 267,
                isActive: true
            },
            {
                title: "Research Publication Guidelines",
                description: "Guidelines for students and faculty for publishing research papers, project documentation, and academic publications.",
                category: "Research",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/research/research-publication-guidelines.pdf",
                fileName: "research-publication-guidelines.pdf",
                fileSize: "1.9 MB",
                uploadDate: "2025-01-28",
                downloadCount: 67,
                isActive: true
            },
            {
                title: "International Exchange Program",
                description: "Information about international exchange programs, partner universities, and study abroad opportunities for students.",
                category: "International Programs",
                fileUrl: "https://res.cloudinary.com/inframe/image/upload/v1234567890/international/exchange-program-info.pdf",
                fileName: "exchange-program-info.pdf",
                fileSize: "3.4 MB",
                uploadDate: "2025-01-25",
                downloadCount: 98,
                isActive: false
            }
        ];

        // Create downloads
        const createdDownloads = await Download.create(sampleDownloads);
        console.log(`Created ${createdDownloads.length} sample downloads`);

        // Display summary by category
        const categoryCounts = await Download.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const totalDownloads = await Download.countDocuments();
        const activeDownloads = await Download.countDocuments({ isActive: true });
        const totalDownloadCount = await Download.aggregate([
            { $group: { _id: null, total: { $sum: '$downloadCount' } } }
        ]);

        console.log('\n📊 Downloads Summary:');
        console.log(`Total Downloads: ${totalDownloads}`);
        console.log(`Active Downloads: ${activeDownloads}`);
        console.log(`Total Download Count: ${totalDownloadCount[0]?.total || 0}`);
        
        console.log('\nCategory Breakdown:');
        categoryCounts.forEach(category => {
            console.log(`  ${category._id}: ${category.count} files`);
        });

        console.log('\n📈 Most Popular Downloads:');
        const popularDownloads = await Download.find().sort({ downloadCount: -1 }).limit(5);
        popularDownloads.forEach((download, index) => {
            console.log(`${index + 1}. ${download.title} (${download.downloadCount} downloads)`);
        });

        console.log('\n✅ Download sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding download data:', error);
        process.exit(1);
    }
};

seedDownloadData();
