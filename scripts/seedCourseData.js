import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
import Course from '../models/course.js';

const seedCourseData = async () => {
    try {
        // Connect to database
        await mongoose.connect(DB_URI);
        console.log('Connected to database');

        // Clear existing course data
        await Course.deleteMany({});
        console.log('Cleared existing course data');

        // Sample course data
        const sampleCourses = [
            {
                slug: "interior-design",
                title: "Interior Design",
                description: "Transform spaces and create beautiful environments with our comprehensive interior design programs. Learn from industry experts and build a successful career in interior design.",
                heroImage: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1920&auto=format&fit=crop",
                programs: [
                    {
                        title: "Bachelor of Design in Interior Design",
                        duration: "4 Years Full-Time",
                        description: "Transform spaces and shape experiences through our comprehensive design program. Learn from industry experts and build a successful career in interior design.",
                        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
                        detailsUrl: "/interior-design/bdes-in-interior-design",
                        order: 1,
                        isActive: true
                    },
                    {
                        title: "B.VOC in Interior Design",
                        duration: "3 Years Full-Time",
                        description: "Combine practical skills with theoretical knowledge in our vocational bachelor's program. Perfect for hands-on learners ready to enter the industry.",
                        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
                        detailsUrl: "/interior-design/bvoc-in-interior-design",
                        order: 2,
                        isActive: true
                    },
                    {
                        title: "B.SC in Interior Design",
                        duration: "3 Years Full-Time",
                        description: "Master the technical aspects of interior design with our science-focused program. Ideal for analytical minds passionate about design.",
                        imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
                        detailsUrl: "/interior-design/bsc-in-interior-design",
                        order: 3,
                        isActive: true
                    }
                ],
                features: [
                    {
                        title: "Industry-Relevant Curriculum",
                        description: "Our programs are designed in collaboration with industry experts to ensure you learn the most relevant skills and knowledge.",
                        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
                        order: 1
                    },
                    {
                        title: "Experienced Faculty",
                        description: "Learn from industry professionals and experienced educators who bring real-world knowledge to the classroom.",
                        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                        order: 2
                    },
                    {
                        title: "Career Support",
                        description: "Get placement assistance, internship opportunities, and career guidance to help you succeed in your professional journey.",
                        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
                        order: 3
                    }
                ],
                testimonials: [
                    {
                        studentName: "Priya Sharma",
                        studentImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80",
                        testimonialText: "Inframe School transformed my passion for design into a successful career. The faculty's guidance and industry exposure helped me land my dream job at a top design firm.",
                        youtubeUrl: "https://www.youtube.com/watch?v=example1",
                        course: "Interior Design",
                        batch: "2023",
                        order: 1,
                        isActive: true
                    },
                    {
                        studentName: "Rahul Verma",
                        studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                        testimonialText: "The hands-on approach and real-world projects at Inframe gave me the confidence to start my own interior design studio. I'm grateful for the excellent education I received.",
                        course: "Interior Design",
                        batch: "2022",
                        order: 2,
                        isActive: true
                    }
                ],
                faqs: [
                    {
                        question: "What are the career opportunities after completing Interior Design?",
                        answer: "Graduates can work as Interior Designers, Space Planners, Design Consultants, Furniture Designers, Exhibition Designers, or start their own design studios. The field offers diverse opportunities in residential, commercial, and hospitality sectors.",
                        order: 1,
                        isActive: true
                    },
                    {
                        question: "Do you provide placement assistance?",
                        answer: "Yes, we have a dedicated placement cell that provides career guidance, interview preparation, and connects students with leading design firms and companies. Our placement rate is over 90%.",
                        order: 2,
                        isActive: true
                    },
                    {
                        question: "What software will I learn during the course?",
                        answer: "Students learn industry-standard software including AutoCAD, SketchUp, 3ds Max, V-Ray, Photoshop, and other design tools essential for modern interior design practice.",
                        order: 3,
                        isActive: true
                    }
                ],
                curriculum: [
                    {
                        year: "First Year",
                        semester: "Semester 1 & 2",
                        subjects: [
                            "Design Fundamentals",
                            "Drawing and Sketching",
                            "Color Theory",
                            "History of Architecture",
                            "Basic Computer Applications",
                            "Material Studies"
                        ],
                        description: "Foundation year focusing on basic design principles and fundamental skills.",
                        imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80",
                        order: 1
                    },
                    {
                        year: "Second Year",
                        semester: "Semester 3 & 4",
                        subjects: [
                            "Space Planning",
                            "AutoCAD",
                            "3D Modeling",
                            "Furniture Design",
                            "Lighting Design",
                            "Construction Technology"
                        ],
                        description: "Intermediate level with focus on technical skills and software proficiency.",
                        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
                        order: 2
                    },
                    {
                        year: "Third Year",
                        semester: "Semester 5 & 6",
                        subjects: [
                            "Advanced Space Planning",
                            "Project Management",
                            "Sustainable Design",
                            "Building Codes and Regulations",
                            "Client Interaction",
                            "Portfolio Development"
                        ],
                        description: "Advanced concepts and real-world application of interior design principles.",
                        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
                        order: 3
                    },
                    {
                        year: "Fourth Year",
                        semester: "Semester 7 & 8",
                        subjects: [
                            "Thesis Project",
                            "Industry Internship",
                            "Professional Practice",
                            "Business Development",
                            "Advanced Visualization",
                            "Specialization Electives"
                        ],
                        description: "Final year focusing on specialization, thesis project, and industry preparation.",
                        imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80",
                        order: 4
                    }
                ],
                software: [
                    {
                        name: "AutoCAD",
                        logoUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&q=80",
                        description: "Industry-standard 2D drafting and documentation software",
                        order: 1
                    },
                    {
                        name: "SketchUp",
                        logoUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=200&q=80",
                        description: "3D modeling software for architectural and interior design",
                        order: 2
                    },
                    {
                        name: "3ds Max",
                        logoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=80",
                        description: "Professional 3D modeling, animation, and rendering software",
                        order: 3
                    },
                    {
                        name: "V-Ray",
                        logoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80",
                        description: "Advanced rendering engine for photorealistic visualizations",
                        order: 4
                    },
                    {
                        name: "Adobe Photoshop",
                        logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
                        description: "Image editing and post-processing for design presentations",
                        order: 5
                    },
                    {
                        name: "Revit",
                        logoUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&q=80",
                        description: "Building Information Modeling (BIM) software for architecture",
                        order: 6
                    }
                ],
                careerProspects: [
                    {
                        title: "Design Studios",
                        roles: ["Interior Designer", "Design Consultant", "Project Manager", "Senior Designer"],
                        description: "Work with established design firms on residential and commercial projects, leading design teams and managing client relationships.",
                        order: 1
                    },
                    {
                        title: "Corporate Sector",
                        roles: ["Space Planner", "Workplace Designer", "Facility Manager", "Corporate Design Specialist"],
                        description: "Design corporate offices and commercial spaces for businesses, focusing on productivity and employee well-being.",
                        order: 2
                    },
                    {
                        title: "Hospitality Industry",
                        roles: ["Hotel Designer", "Restaurant Designer", "Resort Planner", "Hospitality Consultant"],
                        description: "Specialize in creating memorable experiences through hospitality interior design.",
                        order: 3
                    },
                    {
                        title: "Retail Design",
                        roles: ["Retail Designer", "Visual Merchandiser", "Store Planner", "Brand Environment Designer"],
                        description: "Create engaging retail environments that enhance customer experience and drive sales.",
                        order: 4
                    },
                    {
                        title: "Entrepreneurship",
                        roles: ["Design Studio Owner", "Freelance Designer", "Design Consultant", "Online Design Service Provider"],
                        description: "Start your own design practice, offer online consultations, and build your personal brand in the industry.",
                        order: 5
                    },
                    {
                        title: "Specialized Fields",
                        roles: ["Sustainable Design Specialist", "Healthcare Designer", "Educational Facility Designer", "Exhibition Designer"],
                        description: "Focus on specialized areas like sustainable design, healthcare facilities, or educational environments.",
                        order: 6
                    }
                ],
                ctaTitle: "Ready to Start Your Interior Design Journey?",
                ctaDescription: "Take the first step towards a successful career in interior design. Apply now or contact us for more information about our programs.",
                brochurePdfUrl: "https://example.com/interior-design-brochure.pdf",
                isActive: true,
                metaTitle: "Interior Design Courses | Best Interior Design School India",
                metaDescription: "Join India's leading interior design school. Comprehensive programs, expert faculty, and excellent placement support. Transform your passion into a successful career.",
                metaKeywords: "interior design course, interior design school, design education, interior design career"
            },
            {
                slug: "fashion-design",
                title: "Fashion Design",
                description: "Unleash your creativity in the world of fashion. Our programs prepare you for a dynamic career in fashion design, from concept to runway.",
                heroImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop",
                programs: [
                    {
                        title: "Bachelor of Design in Fashion Design",
                        duration: "4 Years Full-Time",
                        description: "Shape the future of fashion through innovative design and creative expression.",
                        imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
                        detailsUrl: "/fashion-design/bdes-in-fashion-design",
                        order: 1,
                        isActive: true
                    },
                    {
                        title: "B.VOC in Fashion Design",
                        duration: "3 Years Full-Time",
                        description: "Master practical fashion design skills with industry-focused training.",
                        imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80",
                        detailsUrl: "/fashion-design/bvoc-in-fashion-design",
                        order: 2,
                        isActive: true
                    }
                ],
                features: [
                    {
                        title: "Industry-Relevant Curriculum",
                        description: "Our programs are designed in collaboration with industry experts to ensure you learn the most relevant skills and knowledge.",
                        order: 1
                    },
                    {
                        title: "Experienced Faculty",
                        description: "Learn from industry professionals and experienced educators who bring real-world knowledge to the classroom.",
                        order: 2
                    },
                    {
                        title: "Career Support",
                        description: "Get placement assistance, internship opportunities, and career guidance to help you succeed in your professional journey.",
                        order: 3
                    }
                ],
                testimonials: [
                    {
                        studentName: "Ananya Gupta",
                        studentImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80",
                        testimonialText: "The fashion design program at Inframe opened doors to the fashion industry I never thought possible. The faculty's industry connections and practical approach helped me secure an internship with a leading fashion house.",
                        course: "Fashion Design",
                        batch: "2023",
                        order: 1,
                        isActive: true
                    }
                ],
                faqs: [
                    {
                        question: "What career opportunities are available in fashion design?",
                        answer: "Fashion design graduates can work as Fashion Designers, Textile Designers, Fashion Stylists, Fashion Merchandisers, Pattern Makers, or start their own fashion labels. The industry offers opportunities in ready-to-wear, haute couture, and sustainable fashion.",
                        order: 1,
                        isActive: true
                    },
                    {
                        question: "Do you provide industry exposure and internships?",
                        answer: "Yes, we have partnerships with leading fashion houses, textile companies, and design studios. Students get hands-on experience through internships, fashion shows, and industry projects.",
                        order: 2,
                        isActive: true
                    }
                ],
                curriculum: [
                    {
                        year: "First Year",
                        semester: "Semester 1 & 2",
                        subjects: [
                            "Fashion Illustration",
                            "Basic Pattern Making",
                            "Textile Science",
                            "Fashion History",
                            "Color Theory",
                            "Sewing Techniques"
                        ],
                        description: "Foundation year covering basic fashion design principles and techniques.",
                        imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
                        order: 1
                    },
                    {
                        year: "Second Year",
                        semester: "Semester 3 & 4",
                        subjects: [
                            "Advanced Pattern Making",
                            "Draping Techniques",
                            "Fashion CAD",
                            "Garment Construction",
                            "Fashion Marketing",
                            "Trend Forecasting"
                        ],
                        description: "Intermediate level focusing on technical skills and market understanding.",
                        imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80",
                        order: 2
                    }
                ],
                software: [
                    {
                        name: "Adobe Illustrator",
                        logoUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=200&q=80",
                        description: "Vector graphics software for fashion illustration and technical drawings",
                        order: 1
                    },
                    {
                        name: "CLO 3D",
                        logoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=80",
                        description: "3D fashion design software for virtual garment simulation",
                        order: 2
                    },
                    {
                        name: "Adobe Photoshop",
                        logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
                        description: "Image editing for fashion photography and presentation boards",
                        order: 3
                    }
                ],
                careerProspects: [
                    {
                        title: "Fashion Houses",
                        roles: ["Fashion Designer", "Assistant Designer", "Design Coordinator", "Product Developer"],
                        description: "Work with established fashion brands and luxury houses on seasonal collections.",
                        order: 1
                    },
                    {
                        title: "Textile Industry",
                        roles: ["Textile Designer", "Print Designer", "Surface Designer", "Fabric Developer"],
                        description: "Focus on textile design, print development, and fabric innovation.",
                        order: 2
                    },
                    {
                        title: "Fashion Entrepreneurship",
                        roles: ["Fashion Label Owner", "Independent Designer", "Fashion Consultant", "Online Fashion Retailer"],
                        description: "Start your own fashion label or provide design consultancy services.",
                        order: 3
                    }
                ],
                ctaTitle: "Ready to Start Your Fashion Design Journey?",
                ctaDescription: "Take the first step towards a successful career in fashion design. Apply now or contact us for more information.",
                isActive: true,
                metaTitle: "Fashion Design Courses | Best Fashion Design School India",
                metaDescription: "Join India's premier fashion design school. Learn from industry experts and launch your fashion career with our comprehensive programs.",
                metaKeywords: "fashion design course, fashion design school, fashion education, fashion career"
            }
        ];

        // Create courses
        const createdCourses = await Course.create(sampleCourses);
        console.log(`Created ${createdCourses.length} sample courses`);

        // Display summary
        const totalCourses = await Course.countDocuments();
        const activeCourses = await Course.countDocuments({ isActive: true });

        console.log('\n📚 Course Data Summary:');
        console.log(`Total Courses: ${totalCourses}`);
        console.log(`Active Courses: ${activeCourses}`);

        console.log('\n📖 Created Courses:');
        createdCourses.forEach((course, index) => {
            const statusIcon = course.isActive ? '✅' : '❌';
            console.log(`${index + 1}. ${statusIcon} ${course.title} (${course.slug})`);
            console.log(`   Programs: ${course.programs.length}`);
            console.log(`   Features: ${course.features.length}`);
            console.log(`   Testimonials: ${course.testimonials.length}`);
            console.log(`   FAQs: ${course.faqs.length}`);
            console.log(`   Curriculum: ${course.curriculum.length}`);
            console.log(`   Software: ${course.software.length}`);
            console.log(`   Career Prospects: ${course.careerProspects.length}\n`);
        });

        console.log('✅ Course sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding course data:', error);
        process.exit(1);
    }
};

seedCourseData();
