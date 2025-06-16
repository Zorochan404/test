import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import AboutUsHeroGallery from '../models/aboutUsHeroGallery.js';
import AboutUsStatistic from '../models/aboutUsStatistic.js';
import AboutUsCoreValue from '../models/aboutUsCoreValue.js';
import AboutUsCampusImage from '../models/aboutUsCampusImage.js';
import AboutUsContent from '../models/aboutUsContent.js';

const seedAboutUsData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing About Us data
        await AboutUsHeroGallery.deleteMany({});
        await AboutUsStatistic.deleteMany({});
        await AboutUsCoreValue.deleteMany({});
        await AboutUsCampusImage.deleteMany({});
        await AboutUsContent.deleteMany({});
        console.log('Cleared existing About Us data');

        // Hero Gallery Images
        const heroImages = [
            {
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
                altText: "Students collaborating in modern design studio",
                order: 1
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
                altText: "State-of-the-art computer lab with latest design software",
                order: 2
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
                altText: "Creative workshop session with students and faculty",
                order: 3
            }
        ];

        // Statistics
        const statistics = [
            {
                number: "500+",
                title: "Students Enrolled",
                description: "Active students pursuing their creative dreams",
                imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 1
            },
            {
                number: "50+",
                title: "Expert Faculty",
                description: "Industry professionals and experienced educators",
                imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 2
            },
            {
                number: "95%",
                title: "Placement Rate",
                description: "Graduates successfully placed in top companies",
                imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 3
            },
            {
                number: "15+",
                title: "Years of Excellence",
                description: "Delivering quality design education since 2009",
                imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 4
            }
        ];

        // Core Values
        const coreValues = [
            {
                title: "Innovation",
                description: "We foster creative thinking and encourage students to push boundaries, explore new ideas, and develop innovative solutions to design challenges.",
                imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 1
            },
            {
                title: "Excellence",
                description: "We maintain the highest standards in education, ensuring our students receive world-class training and develop exceptional skills.",
                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 2
            },
            {
                title: "Collaboration",
                description: "We believe in the power of teamwork and create an environment where students, faculty, and industry partners work together.",
                imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 3
            },
            {
                title: "Integrity",
                description: "We uphold the highest ethical standards and promote honesty, transparency, and respect in all our interactions.",
                imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                order: 4
            }
        ];

        // Campus Images
        const campusImages = [
            {
                imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                altText: "Modern campus building with contemporary architecture",
                order: 1
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                altText: "Students presenting projects in exhibition hall",
                order: 2
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                altText: "Library and study area with extensive resources",
                order: 3
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                altText: "Outdoor campus view with recreational activities",
                order: 4
            }
        ];

        // Content Sections
        const contentSections = [
            {
                sectionType: "who-we-are",
                title: "Who We Are",
                content: "Inframe School is a premier institution dedicated to nurturing creative minds and shaping the future of design education. Established with a vision to bridge the gap between traditional education and industry requirements, we have been at the forefront of design innovation for over a decade.",
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                order: 1
            },
            {
                sectionType: "about-us",
                title: "About Inframe School",
                content: "Our comprehensive programs in graphic design, interior design, fashion design, and digital arts are crafted by industry experts and delivered by experienced faculty. We believe in hands-on learning, practical exposure, and industry collaboration to ensure our students are job-ready from day one.",
                imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                order: 2
            },
            {
                sectionType: "vision",
                title: "Our Vision",
                content: "To be the leading design education institution that empowers students to become innovative designers, creative thinkers, and industry leaders who shape the future of design and make a positive impact on society.",
                imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                order: 3
            },
            {
                sectionType: "mission",
                title: "Our Mission",
                content: "To provide world-class design education that combines theoretical knowledge with practical skills, fostering creativity, innovation, and professional excellence. We are committed to creating an inclusive learning environment that prepares students for successful careers in the dynamic design industry.",
                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                order: 4
            },
            {
                sectionType: "core-values-text",
                title: "Our Core Values",
                content: "At Inframe School, our core values guide everything we do. We believe in innovation that pushes creative boundaries, excellence that sets industry standards, collaboration that builds strong communities, and integrity that forms the foundation of all our relationships.",
                imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                order: 5
            }
        ];

        // Create all data
        const createdHeroImages = await AboutUsHeroGallery.create(heroImages);
        const createdStatistics = await AboutUsStatistic.create(statistics);
        const createdCoreValues = await AboutUsCoreValue.create(coreValues);
        const createdCampusImages = await AboutUsCampusImage.create(campusImages);
        const createdContentSections = await AboutUsContent.create(contentSections);

        console.log('\n📊 About Us Data Created:');
        console.log(`Hero Images: ${createdHeroImages.length}`);
        console.log(`Statistics: ${createdStatistics.length}`);
        console.log(`Core Values: ${createdCoreValues.length}`);
        console.log(`Campus Images: ${createdCampusImages.length}`);
        console.log(`Content Sections: ${createdContentSections.length}`);

        console.log('\n✅ About Us sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding About Us data:', error);
        process.exit(1);
    }
};

seedAboutUsData();
