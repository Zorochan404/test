import mongoose from 'mongoose';
import Enquiry from '../models/enquiry.js';
import { MONGODB_URI } from '../config/env.js';

// Sample enquiry data
const sampleEnquiries = [
  {
    name: 'John Doe',
    phoneNumber: '+91 9876543210',
    email: 'john.doe@example.com',
    city: 'Mumbai',
    course: 'Interior Design',
    status: 'new',
    message: 'I am interested in learning interior design. Please provide more information about the course.',
    source: 'Website',
  },
  {
    name: 'Jane Smith',
    phoneNumber: '+91 8765432109',
    email: 'jane.smith@example.com',
    city: 'Delhi',
    course: 'Fashion Design',
    status: 'contacted',
    message: 'Looking for fashion design course details and admission process.',
    source: 'Social Media',
    notes: 'Called on 2024-01-15, interested in weekend batch',
  },
  {
    name: 'Mike Johnson',
    phoneNumber: '+91 7654321098',
    email: 'mike.johnson@example.com',
    city: 'Bangalore',
    course: 'Graphic Design',
    status: 'enrolled',
    message: 'Want to enroll in graphic design program.',
    source: 'Referral',
    notes: 'Enrolled in March 2024 batch',
  },
  {
    name: 'Sarah Wilson',
    phoneNumber: '+91 6543210987',
    email: 'sarah.wilson@example.com',
    city: 'Chennai',
    course: 'UI/UX Design',
    status: 'not-interested',
    message: 'Interested in UI/UX design but looking for online options.',
    source: 'Google Search',
    notes: 'Prefers online courses, not interested in offline',
  },
  {
    name: 'David Brown',
    phoneNumber: '+91 5432109876',
    email: 'david.brown@example.com',
    city: 'Hyderabad',
    course: 'Interior Design',
    status: 'new',
    message: 'Need information about interior design course duration and fees.',
    source: 'Website',
  },
  {
    name: 'Emily Davis',
    phoneNumber: '+91 4321098765',
    email: 'emily.davis@example.com',
    city: 'Pune',
    course: 'Fashion Design',
    status: 'contacted',
    message: 'Interested in fashion design, please call me.',
    source: 'Instagram',
    notes: 'Called on 2024-01-20, will visit campus next week',
  },
  {
    name: 'Robert Miller',
    phoneNumber: '+91 3210987654',
    email: 'robert.miller@example.com',
    city: 'Kolkata',
    course: 'Graphic Design',
    status: 'enrolled',
    message: 'Ready to enroll in graphic design course.',
    source: 'Facebook',
    notes: 'Enrolled in April 2024 batch, paid full fees',
  },
  {
    name: 'Lisa Garcia',
    phoneNumber: '+91 2109876543',
    email: 'lisa.garcia@example.com',
    city: 'Ahmedabad',
    course: 'UI/UX Design',
    status: 'new',
    message: 'Looking for UI/UX design course with placement assistance.',
    source: 'LinkedIn',
  },
  {
    name: 'James Wilson',
    phoneNumber: '+91 1098765432',
    email: 'james.wilson@example.com',
    city: 'Jaipur',
    course: 'Interior Design',
    status: 'contacted',
    message: 'Interested in interior design course, need fee structure.',
    source: 'Website',
    notes: 'Emailed fee structure, waiting for response',
  },
  {
    name: 'Maria Rodriguez',
    phoneNumber: '+91 0987654321',
    email: 'maria.rodriguez@example.com',
    city: 'Lucknow',
    course: 'Fashion Design',
    status: 'not-interested',
    message: 'Course fees are too high for my budget.',
    source: 'Website',
    notes: 'Budget constraint, suggested to check back in 6 months',
  },
];

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Seed enquiry data
async function seedEnquiryData() {
  try {
    console.log('🌱 Starting enquiry data seeding...');
    
    // Clear existing enquiries
    await Enquiry.deleteMany({});
    console.log('🗑️  Cleared existing enquiries');
    
    // Insert sample enquiries
    const enquiries = await Enquiry.insertMany(sampleEnquiries);
    console.log(`✅ Successfully seeded ${enquiries.length} enquiries`);
    
    // Display sample data
    console.log('\n📊 Sample Enquiries Created:');
    enquiries.forEach((enquiry, index) => {
      console.log(`${index + 1}. ${enquiry.name} - ${enquiry.course} (${enquiry.status})`);
    });
    
    // Get statistics
    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\n📈 Enquiry Statistics:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });
    
    console.log('\n🎉 Enquiry data seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding enquiry data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  connectToDatabase().then(seedEnquiryData);
}

export { seedEnquiryData }; 