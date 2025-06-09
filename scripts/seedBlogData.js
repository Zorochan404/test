import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import Blog from '../models/blog.js';

const seedBlogData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing blog data
        await Blog.deleteMany({});
        console.log('Cleared existing blog data');

        // Sample blog data based on your JSON structure
        const blogData = {
            slug: "top-5-reasons-to-choose-inframe-school",
            title: "Top 5 Reasons to Choose Inframe School for Your Child's Education",
            excerpt: "Discover why Inframe School stands out as one of the best design schools in India and the top arts & design school in Rajasthan.",
            heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
            category: "Education",
            date: "February 28, 2025",
            readTime: "5 min read",
            author: {
                name: "Inframe School Team",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            sections: [
                {
                    id: "intro",
                    title: "Introduction",
                    content: "In today's rapidly changing world, selecting the right school for your child is a crucial decision. As parents, you want a place where your child can not only grow academically but also thrive in creativity and innovation. Inframe School offers an outstanding educational experience for students interested in design, arts, and creative fields. If you're considering the best design school in India or the top arts & design school in Rajasthan, here are five compelling reasons why Inframe School stands out as the top choice for your child's education."
                },
                {
                    id: "reason1",
                    title: "1. Focused Curriculum Tailored for Creative Excellence",
                    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    content: "At Inframe School, the curriculum is designed to nurture the creative minds of tomorrow. Whether your child is interested in arts, design, or technology, the school offers a specialized approach that caters to individual talents. The school's unique combination of theoretical learning and hands-on training in design and art ensures students gain not just academic knowledge but practical skills that set them apart in the real world.\n\nInframe School is one of the best design schools in India, offering personalized learning paths that align with your child's passion for design, arts, and creativity.",
                    quote: "Creativity is intelligence having fun.",
                    quoteAuthor: "Albert Einstein"
                },
                {
                    id: "reason2",
                    title: "2. World-Class Infrastructure and State-of-the-Art Facilities",
                    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    content: "Inframe School prides itself on its modern infrastructure. The school is equipped with cutting-edge facilities that provide students with the resources they need to thrive. From spacious art studios to fully-equipped design labs, the school's infrastructure is built to foster creativity and innovation. It's a place where students can experiment with new ideas and technologies to bring their visions to life.\n\nIf you are looking for the best designing school in Rajasthan, Inframe School's state-of-the-art design labs and facilities are second to none.",
                    quote: "The best way to predict the future is to create it.",
                    quoteAuthor: "Peter Drucker"
                },
                {
                    id: "reason3",
                    title: "3. Expert Faculty with Industry Experience",
                    image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    content: "The Inframe School faculty comprises highly skilled professionals with extensive experience in the design and art industries. This expertise ensures that students receive education and mentorship from the very best in the field. The hands-on learning approach with industry professionals helps students stay ahead of the curve and prepares them for future success.\n\nWhether your child is pursuing design, architecture, or other creative fields, Inframe School's expert faculty will guide them every step of the way.",
                    highlights: [
                        "Industry professionals with real-world experience",
                        "Mentorship beyond the classroom",
                        "Up-to-date knowledge of current design trends",
                        "Personalized guidance for each student"
                    ],
                    highlightTitle: "Learning from the Best: Why Inframe School's Faculty is Key to Your Child's Success"
                },
                {
                    id: "reason4",
                    title: "4. Placement Opportunities and Industry Exposure",
                    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    content: "Inframe School not only focuses on academics but also prioritizes real-world experience. The school has partnerships with leading companies and organizations in the design and arts sectors. Through these partnerships, students gain valuable internship and placement opportunities that give them a competitive edge in the job market.\n\nAs one of the top arts & design schools in Rajasthan, Inframe School's network and exposure to industry leaders ensures your child is always in the loop about the latest trends and opportunities in design.",
                    quote: "Success is where preparation and opportunity meet.",
                    quoteAuthor: "Bobby Unser"
                },
                {
                    id: "reason5",
                    title: "5. Holistic Development and Personality Building",
                    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    content: "At Inframe School, education is about more than just academic learning. The school emphasizes the holistic development of students by fostering skills such as communication, teamwork, and leadership. Through various extracurricular activities, workshops, and exposure to real-world scenarios, students at Inframe School develop the personality traits that employers highly value in creative professionals.",
                    highlights: [
                        "Development of critical thinking skills",
                        "Confidence building through presentations and exhibitions",
                        "Team projects that foster collaboration",
                        "Leadership opportunities in student-led initiatives"
                    ],
                    highlightTitle: "Beyond Books: How Inframe School Shapes Your Child's Future as a Leader"
                },
                {
                    id: "conclusion",
                    title: "Final Thought",
                    content: "Inframe School provides a comprehensive, innovative, and hands-on learning environment where students can truly excel in their chosen creative field. With a focus on personalized education, expert guidance, modern infrastructure, and industry exposure, Inframe School is the best choice for your child's future in design and arts. Whether you're looking for the best design school in India or the top arts & design school in Rajasthan, Inframe School's offerings make it a top contender in shaping the leaders of tomorrow."
                }
            ],
            relatedPosts: [
                {
                    id: "why-inframe-school-is-the-best-choice",
                    title: "Why Inframe School is the Best Choice for Your Child's Future",
                    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                    category: "Career"
                },
                {
                    id: "state-of-the-art-facilities",
                    title: "Explore the State-of-the-Art Facilities at Inframe School",
                    image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                    category: "Facilities"
                },
                {
                    id: "creative-curriculum-at-inframe",
                    title: "The Creative Curriculum at Inframe School",
                    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                    category: "Curriculum"
                }
            ],
            isPublished: true,
            views: 0
        };

        // Create additional sample blogs
        const additionalBlogs = [
            {
                slug: "why-inframe-school-is-the-best-choice",
                title: "Why Inframe School is the Best Choice for Your Child's Future",
                excerpt: "Explore the unique advantages and opportunities that make Inframe School stand out in the competitive landscape of design education.",
                heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                category: "Career",
                date: "February 25, 2025",
                readTime: "4 min read",
                author: {
                    name: "Inframe School Team",
                    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                sections: [
                    {
                        id: "intro",
                        title: "Introduction",
                        content: "Choosing the right educational institution for your child is one of the most important decisions you'll make as a parent. In the realm of design and creative education, Inframe School has established itself as a leader, offering unparalleled opportunities for students to develop their artistic talents and technical skills."
                    },
                    {
                        id: "career-prospects",
                        title: "Exceptional Career Prospects",
                        content: "Our graduates consistently secure positions at top design firms, start their own successful studios, and become leaders in the creative industry. The comprehensive training and industry connections provided at Inframe School open doors to exciting career opportunities.",
                        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    }
                ],
                relatedPosts: [
                    {
                        id: "top-5-reasons-to-choose-inframe-school",
                        title: "Top 5 Reasons to Choose Inframe School for Your Child's Education",
                        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
                        category: "Education"
                    }
                ],
                isPublished: true,
                views: 0
            },
            {
                slug: "state-of-the-art-facilities",
                title: "Explore the State-of-the-Art Facilities at Inframe School",
                excerpt: "Take a virtual tour of our modern facilities designed to inspire creativity and foster innovation in design education.",
                heroImage: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                category: "Facilities",
                date: "February 20, 2025",
                readTime: "6 min read",
                author: {
                    name: "Inframe School Team",
                    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                sections: [
                    {
                        id: "intro",
                        title: "World-Class Infrastructure",
                        content: "Inframe School boasts cutting-edge facilities that provide students with the tools and environment they need to excel in their creative pursuits. From advanced design labs to collaborative spaces, every aspect of our campus is designed with student success in mind."
                    },
                    {
                        id: "design-labs",
                        title: "Advanced Design Laboratories",
                        content: "Our state-of-the-art design labs are equipped with the latest software and hardware, providing students with hands-on experience using industry-standard tools and technologies.",
                        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    }
                ],
                relatedPosts: [],
                isPublished: true,
                views: 0
            }
        ];

        // Create the main blog post
        const mainBlog = await Blog.create(blogData);
        console.log('Created main blog post:', mainBlog.title);

        // Create additional blog posts
        const additionalCreatedBlogs = await Blog.create(additionalBlogs);
        console.log(`Created ${additionalCreatedBlogs.length} additional blog posts`);

        const totalBlogs = 1 + additionalCreatedBlogs.length;
        console.log(`\n✅ Created ${totalBlogs} blog posts successfully!`);

        // Display summary
        const allBlogs = await Blog.find();
        console.log('\n📚 Blog Posts Created:');
        allBlogs.forEach((blog, index) => {
            console.log(`${index + 1}. ${blog.title} (${blog.category}) - ${blog.readTime}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding blog data:', error);
        process.exit(1);
    }
};

seedBlogData();
