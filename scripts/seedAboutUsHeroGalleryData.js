import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import AboutUsHeroGallery from '../models/aboutUsHeroGallery.js';

const seedAboutUsHeroGalleryData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing hero gallery data
        await AboutUsHeroGallery.deleteMany({});
        console.log('Cleared existing About Us hero gallery data');

        // Sample hero gallery images
        const sampleHeroImages = [
            {
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Students collaborating in modern design studio at Inframe School",
                order: 1,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "State-of-the-art computer lab with latest design software",
                order: 2,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Creative workshop session with students and faculty",
                order: 3,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Modern campus building showcasing contemporary architecture",
                order: 4,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Students presenting their design projects in exhibition hall",
                order: 5,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Library and study area with extensive design resources",
                order: 6,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Outdoor campus view with students enjoying recreational activities",
                order: 7,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Faculty mentoring students in hands-on design project",
                order: 8,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Graduation ceremony celebrating student achievements",
                order: 9,
                isActive: true
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                altText: "Industry expert guest lecture in modern auditorium",
                order: 10,
                isActive: false // This one is inactive for testing
            }
        ];

        // Create hero gallery images
        const createdImages = await AboutUsHeroGallery.create(sampleHeroImages);
        console.log(`Created ${createdImages.length} hero gallery images`);

        // Display summary
        const totalImages = await AboutUsHeroGallery.countDocuments();
        const activeImages = await AboutUsHeroGallery.countDocuments({ isActive: true });
        const inactiveImages = await AboutUsHeroGallery.countDocuments({ isActive: false });

        console.log('\n📸 About Us Hero Gallery Summary:');
        console.log(`Total Images: ${totalImages}`);
        console.log(`Active Images: ${activeImages}`);
        console.log(`Inactive Images: ${inactiveImages}`);

        console.log('\n🖼️ Hero Gallery Images:');
        const allImages = await AboutUsHeroGallery.find().sort({ order: 1 });
        allImages.forEach((image, index) => {
            const statusIcon = image.isActive ? '✅' : '❌';
            console.log(`${image.order}. ${statusIcon} ${image.altText}`);
        });

        console.log('\n✅ About Us Hero Gallery sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding About Us hero gallery data:', error);
        process.exit(1);
    }
};

seedAboutUsHeroGalleryData();
