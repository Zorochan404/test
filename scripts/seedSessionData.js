import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import Session from '../models/session.js';

const seedSessionData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing session data
        await Session.deleteMany({});
        console.log('Cleared existing session data');

        // Sample data for sessions
        const sampleSessions = [
            {
                name: 'John Doe',
                phoneNumber: '+1234567890',
                email: 'john.doe@example.com',
                city: 'New York',
                course: 'Web Development'
            },
            {
                name: 'Jane Smith',
                phoneNumber: '+1987654321',
                email: 'jane.smith@example.com',
                city: 'Los Angeles',
                course: 'Data Science'
            },
            {
                name: 'Mike Johnson',
                phoneNumber: '+1122334455',
                email: 'mike.johnson@example.com',
                city: 'Chicago',
                course: 'Mobile App Development'
            },
            {
                name: 'Sarah Wilson',
                phoneNumber: '+1555666777',
                email: 'sarah.wilson@example.com',
                city: 'Houston',
                course: 'UI/UX Design'
            },
            {
                name: 'David Brown',
                phoneNumber: '+1999888777',
                email: 'david.brown@example.com',
                city: 'Phoenix',
                course: 'Cybersecurity'
            },
            {
                name: 'Emily Davis',
                phoneNumber: '+1444555666',
                email: 'emily.davis@example.com',
                city: 'Philadelphia',
                course: 'Machine Learning'
            },
            {
                name: 'Robert Miller',
                phoneNumber: '+1777888999',
                email: 'robert.miller@example.com',
                city: 'San Antonio',
                course: 'Cloud Computing'
            },
            {
                name: 'Lisa Garcia',
                phoneNumber: '+1333444555',
                email: 'lisa.garcia@example.com',
                city: 'San Diego',
                course: 'DevOps'
            },
            {
                name: 'James Rodriguez',
                phoneNumber: '+1666777888',
                email: 'james.rodriguez@example.com',
                city: 'Dallas',
                course: 'Blockchain Development'
            },
            {
                name: 'Maria Martinez',
                phoneNumber: '+1222333444',
                email: 'maria.martinez@example.com',
                city: 'San Jose',
                course: 'Artificial Intelligence'
            }
        ];

        // Add some additional fields to each session
        const sessionsWithDetails = sampleSessions.map((session, index) => ({
            ...session,
            loginTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random time in last 30 days
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
            isActive: Math.random() > 0.3 // 70% chance of being active
        }));

        // Create sessions
        const createdSessions = await Session.create(sessionsWithDetails);
        console.log(`Created ${createdSessions.length} sample sessions`);

        // Display created sessions
        console.log('\nSample sessions created:');
        createdSessions.forEach((session, index) => {
            console.log(`${index + 1}. ${session.name} - ${session.phoneNumber} - ${session.city} - ${session.course}`);
        });

        console.log('\n✅ Session sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding session data:', error);
        process.exit(1);
    }
};

seedSessionData();
