import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import CardRouter from './routes/webdata/Card.routes.js';
import cookieParser from 'cookie-parser';
import LogoRouter from './routes/webdata/logo.routes.js';
import ProgramsRouter from './routes/webdata/progams.routes.js';
import TestimonialsRouter from './routes/webdata/testimonals.routes.js';
import cors from 'cors';
import MembershipRouter from './routes/webdata/membership.routes.js';
import AdvisorRouter from './routes/advisor.routes.js';
import BlogRouter from './routes/webdata/blog.routes.js';
import SessionRouter from './routes/webdata/session.routes.js';
import LifeAtInframeSectionRouter from './routes/webdata/lifeAtInframeSection.routes.js';
import StudentServiceRouter from './routes/webdata/studentService.routes.js';
import StudentClubRouter from './routes/webdata/studentClub.routes.js';
import CampusEventRouter from './routes/webdata/campusEvent.routes.js';
import GalleryImageRouter from './routes/webdata/galleryImage.routes.js';
import SportsFacilityRouter from './routes/webdata/sportsFacility.routes.js';
import ContactRouter from './routes/webdata/contact.routes.js';
import DownloadRouter from './routes/webdata/download.routes.js';
import AboutUsHeroGalleryRouter from './routes/webdata/aboutUsHeroGallery.routes.js';
import AboutUsStatisticRouter from './routes/webdata/aboutUsStatistic.routes.js';
import AboutUsCoreValueRouter from './routes/webdata/aboutUsCoreValue.routes.js';
import AboutUsCampusImageRouter from './routes/webdata/aboutUsCampusImage.routes.js';
import AboutUsContentRouter from './routes/webdata/aboutUsContent.routes.js';
import CourseRouter from './routes/webdata/course.routes.js';
import FreeCoursesRouter from './routes/webdata/freecourses.routes.js';
import UploadRouter from './routes/upload.routes.js';
import AdmissionRouter from './routes/admission.routes.js';
import EnquiryRouter from './routes/webdata/enquiry.routes.js';
import AdmissionAuthRouter from './routes/admissionAuth.routes.js';
import PaymentInformationRouter from './routes/webdata/paymentInformation.routes.js';
import CareerPostRouter from './routes/webdata/careerPost.routes.js';
import MentorRouter from './routes/webdata/mentor.routes.js';
import NewsRouter from './routes/webdata/news.routes.js';
import RoleUserRouter from './routes/RoleUser.js';
import RoleRouter from './routes/roles.js';
import PermissionRouter from './routes/permissions.js';
import { errorHandler, createErrorResponse } from './utils/errorHandler.js';

const app = express();

// Set JSON content type for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001',  'https://www.inframeschool.com','https://admin.inframeschool.com', 'https://test3-haqa2zjfg-zorochan404s-projects.vercel.app', 'https://inframe-wine.vercel.app', 'https://test3-iota-ten.vercel.app', 'https://admission-portal-one.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/card', CardRouter);
app.use('/api/v1/logo', LogoRouter);
app.use('/api/v1/programs', ProgramsRouter);
app.use('/api/v1/membership', MembershipRouter);
app.use('/api/v1/testimonials', TestimonialsRouter);
app.use('/api/v1/advisor', AdvisorRouter);
app.use('/api/v1/blog', BlogRouter);
app.use('/api/v1/session', SessionRouter);
app.use('/api/v1/lifeatinframesection', LifeAtInframeSectionRouter);
app.use('/api/v1/studentservice', StudentServiceRouter);
app.use('/api/v1/studentclub', StudentClubRouter);
app.use('/api/v1/campusevent', CampusEventRouter);
app.use('/api/v1/galleryimage', GalleryImageRouter);
app.use('/api/v1/sportsfacility', SportsFacilityRouter);
app.use('/api/v1/contact', ContactRouter);
app.use('/api/v1/download', DownloadRouter);
app.use('/api/v1/about-us/hero-images', AboutUsHeroGalleryRouter);
app.use('/api/v1/about-us/statistics', AboutUsStatisticRouter);
app.use('/api/v1/about-us/core-values', AboutUsCoreValueRouter);
app.use('/api/v1/about-us/campus-images', AboutUsCampusImageRouter);
app.use('/api/v1/about-us/content', AboutUsContentRouter);
app.use('/api/v1/courses', CourseRouter); 
app.use('/api/v1/free-courses', FreeCoursesRouter);
app.use('/api/v1/upload', UploadRouter);
app.use('/api/v1/admission', AdmissionRouter);
app.use('/api/v1/enquiries', EnquiryRouter);
app.use('/api/v1/admission-auth', AdmissionAuthRouter);
app.use('/api/v1/payment-information', PaymentInformationRouter);
app.use('/api/v1/career-posts', CareerPostRouter);
app.use('/api/v1/mentor', MentorRouter);
app.use('/api/v1/news', NewsRouter);
app.use('/api/v1/role-users', RoleUserRouter);
app.use('/api/v1/roles', RoleRouter);
app.use('/api/v1/permissions', PermissionRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Inframe School API is running",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    const errorResponse = createErrorResponse(404, 'GENERAL', 'The requested route was not found');
    res.status(404).json(errorResponse);
});

// Global error handler middleware (must be last)
app.use(errorHandler);

app.listen(PORT, async()=> {
    console.log(`server running on ${PORT}⚙️`)
    await connectToDatabase();
});

export default app;


