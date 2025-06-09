import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import Contact from '../models/contact.js';

const seedContactData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing contact data
        await Contact.deleteMany({});
        console.log('Cleared existing contact data');

        // Sample contact data
        const sampleContacts = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                message: 'I am interested in learning more about your computer science program. Could you please provide me with information about the curriculum, admission requirements, and application deadlines?',
                status: 'new',
                isRead: false
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                message: 'Hello, I would like to schedule a campus tour. I am particularly interested in seeing the engineering facilities and laboratories. What dates are available next month?',
                status: 'read',
                isRead: true
            },
            {
                firstName: 'Michael',
                lastName: 'Johnson',
                email: 'michael.johnson@example.com',
                message: 'I am a current student and I am having trouble with my course registration. The system is not allowing me to enroll in the advanced mathematics course. Can someone help me with this issue?',
                status: 'replied',
                isRead: true
            },
            {
                firstName: 'Sarah',
                lastName: 'Wilson',
                email: 'sarah.wilson@example.com',
                message: 'I am interested in the scholarship opportunities available at your institution. Could you please send me information about merit-based scholarships for international students?',
                status: 'new',
                isRead: false
            },
            {
                firstName: 'David',
                lastName: 'Brown',
                email: 'david.brown@example.com',
                message: 'I would like to inquire about the part-time MBA program. What are the class schedules like, and is it possible to complete the program while working full-time?',
                status: 'resolved',
                isRead: true
            },
            {
                firstName: 'Emily',
                lastName: 'Davis',
                email: 'emily.davis@example.com',
                message: 'Hi, I am a prospective student interested in the art and design program. Do you offer portfolio review sessions for applicants? I would appreciate any guidance on preparing my application.',
                status: 'new',
                isRead: false
            },
            {
                firstName: 'Robert',
                lastName: 'Miller',
                email: 'robert.miller@example.com',
                message: 'I am experiencing technical difficulties with the online learning platform. The videos are not loading properly and I cannot access my assignments. Please help me resolve this issue.',
                status: 'read',
                isRead: true
            },
            {
                firstName: 'Lisa',
                lastName: 'Garcia',
                email: 'lisa.garcia@example.com',
                message: 'I would like to know more about the student housing options available on campus. Are there different types of accommodations, and what are the costs associated with each option?',
                status: 'new',
                isRead: false
            },
            {
                firstName: 'James',
                lastName: 'Rodriguez',
                email: 'james.rodriguez@example.com',
                message: 'I am interested in transferring to your university from another institution. What is the process for transfer students, and how many credits can typically be transferred?',
                status: 'replied',
                isRead: true
            },
            {
                firstName: 'Maria',
                lastName: 'Martinez',
                email: 'maria.martinez@example.com',
                message: 'Could you please provide information about the career services available to students and alumni? I am particularly interested in job placement rates and internship opportunities.',
                status: 'new',
                isRead: false
            },
            {
                firstName: 'Christopher',
                lastName: 'Anderson',
                email: 'christopher.anderson@example.com',
                message: 'I am a parent of a prospective student and I have questions about the financial aid process. What documents are required, and when is the deadline for submitting the FAFSA?',
                status: 'resolved',
                isRead: true
            },
            {
                firstName: 'Amanda',
                lastName: 'Taylor',
                email: 'amanda.taylor@example.com',
                message: 'I would like to inquire about the study abroad programs offered by your university. What destinations are available, and what are the requirements for participation?',
                status: 'new',
                isRead: false
            }
        ];

        // Add random timestamps to make data more realistic
        const contactsWithTimestamps = sampleContacts.map((contact, index) => ({
            ...contact,
            // Create contacts over the last 30 days
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        }));

        // Create contacts
        const createdContacts = await Contact.create(contactsWithTimestamps);
        console.log(`Created ${createdContacts.length} sample contacts`);

        // Display summary
        const statusCounts = await Contact.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const unreadCount = await Contact.countDocuments({ isRead: false });

        console.log('\n📊 Contact Summary:');
        console.log(`Total Contacts: ${createdContacts.length}`);
        console.log(`Unread Contacts: ${unreadCount}`);
        console.log('\nStatus Breakdown:');
        statusCounts.forEach(status => {
            console.log(`  ${status._id}: ${status.count}`);
        });

        console.log('\n✅ Contact sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding contact data:', error);
        process.exit(1);
    }
};

seedContactData();
