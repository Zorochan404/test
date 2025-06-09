import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import LifeAtInframeSection from '../models/lifeAtInframeSection.js';
import StudentService from '../models/studentService.js';
import StudentClub from '../models/studentClub.js';
import CampusEvent from '../models/campusEvent.js';
import GalleryImage from '../models/galleryImage.js';
import SportsFacility from '../models/sportsFacility.js';

const seedLifeAtInframeData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing data
        await LifeAtInframeSection.deleteMany({});
        await StudentService.deleteMany({});
        await StudentClub.deleteMany({});
        await CampusEvent.deleteMany({});
        await GalleryImage.deleteMany({});
        await SportsFacility.deleteMany({});
        console.log('Cleared existing Life at Inframe data');

        // Create Life at Inframe Sections
        const sections = await LifeAtInframeSection.create([
            {
                sectionType: 'hero',
                title: 'Welcome to Life at Inframe',
                description: 'Experience the vibrant campus life at Inframe School',
                content: 'Discover a world of opportunities, friendships, and growth at our dynamic campus.',
                images: ['hero-image-1.jpg', 'hero-image-2.jpg'],
                order: 1,
                isActive: true
            },
            {
                sectionType: 'welcome',
                title: 'Your Journey Begins Here',
                description: 'A warm welcome to our diverse and inclusive community',
                content: 'At Inframe, we believe in nurturing not just academic excellence but also personal growth and character development.',
                images: ['welcome-image.jpg'],
                order: 2,
                isActive: true
            },
            {
                sectionType: 'services',
                title: 'Student Services',
                description: 'Comprehensive support services for our students',
                order: 3,
                isActive: true
            },
            {
                sectionType: 'clubs',
                title: 'Student Clubs & Organizations',
                description: 'Join clubs that match your interests and passions',
                order: 4,
                isActive: true
            },
            {
                sectionType: 'sports',
                title: 'Sports & Recreation',
                description: 'State-of-the-art sports facilities and programs',
                order: 5,
                isActive: true
            },
            {
                sectionType: 'events',
                title: 'Campus Events',
                description: 'Exciting events throughout the academic year',
                order: 6,
                isActive: true
            },
            {
                sectionType: 'gallery',
                title: 'Campus Gallery',
                description: 'Glimpses of life at our beautiful campus',
                order: 7,
                isActive: true
            },
            {
                sectionType: 'tour',
                title: 'Virtual Campus Tour',
                description: 'Take a virtual tour of our facilities',
                order: 8,
                isActive: true
            }
        ]);

        // Create Student Services
        const services = await StudentService.create([
            {
                title: 'Academic Support',
                description: 'Tutoring, study groups, and academic counseling services',
                icon: 'academic-icon.svg',
                order: 1
            },
            {
                title: 'Career Services',
                description: 'Career guidance, internship placement, and job search assistance',
                icon: 'career-icon.svg',
                order: 2
            },
            {
                title: 'Health & Wellness',
                description: 'Medical services, counseling, and wellness programs',
                icon: 'health-icon.svg',
                order: 3
            },
            {
                title: 'Library Services',
                description: 'Extensive digital and physical library resources',
                icon: 'library-icon.svg',
                order: 4
            },
            {
                title: 'Technology Support',
                description: 'IT help desk, software access, and technical assistance',
                icon: 'tech-icon.svg',
                order: 5
            },
            {
                title: 'Student Housing',
                description: 'Comfortable and safe on-campus accommodation',
                icon: 'housing-icon.svg',
                order: 6
            }
        ]);

        // Create Student Clubs
        const clubs = await StudentClub.create([
            {
                name: 'Drama Club',
                category: 'arts',
                description: 'Express yourself through theater and dramatic performances',
                image: 'drama-club.jpg',
                order: 1
            },
            {
                name: 'Photography Club',
                category: 'arts',
                description: 'Capture moments and develop your photography skills',
                image: 'photography-club.jpg',
                order: 2
            },
            {
                name: 'Basketball Team',
                category: 'sports',
                description: 'Competitive basketball team representing Inframe',
                image: 'basketball-team.jpg',
                order: 3
            },
            {
                name: 'Soccer Club',
                category: 'sports',
                description: 'Join our passionate soccer community',
                image: 'soccer-club.jpg',
                order: 4
            },
            {
                name: 'Debate Society',
                category: 'academic',
                description: 'Develop critical thinking and public speaking skills',
                image: 'debate-society.jpg',
                order: 5
            },
            {
                name: 'Science Club',
                category: 'academic',
                description: 'Explore scientific concepts through hands-on experiments',
                image: 'science-club.jpg',
                order: 6
            },
            {
                name: 'Cultural Society',
                category: 'cultural',
                description: 'Celebrate diversity and cultural heritage',
                image: 'cultural-society.jpg',
                order: 7
            },
            {
                name: 'Music Ensemble',
                category: 'cultural',
                description: 'Create beautiful music together',
                image: 'music-ensemble.jpg',
                order: 8
            }
        ]);

        // Create Campus Events
        const events = await CampusEvent.create([
            {
                title: 'Annual Arts Festival',
                description: 'A celebration of creativity featuring student artwork, performances, and exhibitions',
                category: 'arts-culture',
                image: 'arts-festival.jpg',
                order: 1
            },
            {
                title: 'Spring Concert',
                description: 'Musical performances by student bands and solo artists',
                category: 'arts-culture',
                image: 'spring-concert.jpg',
                order: 2
            },
            {
                title: 'Inter-School Sports Meet',
                description: 'Competitive sports events with schools from across the region',
                category: 'sports-recreation',
                image: 'sports-meet.jpg',
                order: 3
            },
            {
                title: 'Fun Run Marathon',
                description: 'Annual charity run promoting health and community service',
                category: 'sports-recreation',
                image: 'fun-run.jpg',
                order: 4
            },
            {
                title: 'Student Government Elections',
                description: 'Democratic process for selecting student representatives',
                category: 'organizations',
                image: 'elections.jpg',
                order: 5
            },
            {
                title: 'Club Fair',
                description: 'Showcase of all student clubs and organizations',
                category: 'organizations',
                image: 'club-fair.jpg',
                order: 6
            }
        ]);

        // Create Gallery Images
        const galleryImages = await GalleryImage.create([
            {
                title: 'Campus Courtyard',
                imageUrl: 'campus-courtyard.jpg',
                category: 'Campus',
                order: 1
            },
            {
                title: 'Modern Library',
                imageUrl: 'modern-library.jpg',
                category: 'Facilities',
                order: 2
            },
            {
                title: 'Science Laboratory',
                imageUrl: 'science-lab.jpg',
                category: 'Facilities',
                order: 3
            },
            {
                title: 'Student Lounge',
                imageUrl: 'student-lounge.jpg',
                category: 'Campus',
                order: 4
            },
            {
                title: 'Graduation Ceremony',
                imageUrl: 'graduation.jpg',
                category: 'Events',
                order: 5
            },
            {
                title: 'Sports Day',
                imageUrl: 'sports-day.jpg',
                category: 'Events',
                order: 6
            },
            {
                title: 'Art Exhibition',
                imageUrl: 'art-exhibition.jpg',
                category: 'Events',
                order: 7
            },
            {
                title: 'Cafeteria',
                imageUrl: 'cafeteria.jpg',
                category: 'Facilities',
                order: 8
            }
        ]);

        // Create Sports Facilities
        const sportsFacilities = await SportsFacility.create([
            {
                name: 'Olympic Swimming Pool',
                description: 'Professional-grade swimming pool with 8 lanes',
                image: 'swimming-pool.jpg',
                category: 'Aquatic Sports'
            },
            {
                name: 'Basketball Courts',
                description: 'Two full-size indoor basketball courts',
                image: 'basketball-courts.jpg',
                category: 'Indoor Sports'
            },
            {
                name: 'Soccer Field',
                description: 'FIFA-standard soccer field with natural grass',
                image: 'soccer-field.jpg',
                category: 'Outdoor Sports'
            },
            {
                name: 'Tennis Courts',
                description: 'Four professional tennis courts with lighting',
                image: 'tennis-courts.jpg',
                category: 'Outdoor Sports'
            },
            {
                name: 'Fitness Center',
                description: 'Modern gym with cardio and strength training equipment',
                image: 'fitness-center.jpg',
                category: 'Fitness'
            },
            {
                name: 'Track and Field',
                description: '400-meter running track with field event areas',
                image: 'track-field.jpg',
                category: 'Athletics'
            }
        ]);

        console.log(`✅ Created ${sections.length} Life at Inframe sections`);
        console.log(`✅ Created ${services.length} student services`);
        console.log(`✅ Created ${clubs.length} student clubs`);
        console.log(`✅ Created ${events.length} campus events`);
        console.log(`✅ Created ${galleryImages.length} gallery images`);
        console.log(`✅ Created ${sportsFacilities.length} sports facilities`);

        console.log('\n🎉 Life at Inframe sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding Life at Inframe data:', error);
        process.exit(1);
    }
};

seedLifeAtInframeData();
