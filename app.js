import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import CardRouter from './routes/Card.routes.js';
import cookieParser from 'cookie-parser';
import LogoRouter from './routes/logo.routes.js';
import ProgramsRouter from './routes/progams.routes.js';
import TestimonialsRouter from './routes/testimonals.routes.js';
import cors from 'cors';
import MembershipRouter from './routes/membership.routes.js';
import AdvisorRouter from './routes/advisor.routes.js';
import BlogRouter from './routes/blog.routes.js';
import SessionRouter from './routes/session.routes.js';
import LifeAtInframeSectionRouter from './routes/lifeAtInframeSection.routes.js';
import StudentServiceRouter from './routes/studentService.routes.js';
import StudentClubRouter from './routes/studentClub.routes.js';
import CampusEventRouter from './routes/campusEvent.routes.js';
import GalleryImageRouter from './routes/galleryImage.routes.js';
import SportsFacilityRouter from './routes/sportsFacility.routes.js';
import ContactRouter from './routes/contact.routes.js';
import DownloadRouter from './routes/download.routes.js';
import AboutUsHeroGalleryRouter from './routes/aboutUsHeroGallery.routes.js';
import AboutUsStatisticRouter from './routes/aboutUsStatistic.routes.js';
import AboutUsCoreValueRouter from './routes/aboutUsCoreValue.routes.js';
import AboutUsCampusImageRouter from './routes/aboutUsCampusImage.routes.js';
import AboutUsContentRouter from './routes/aboutUsContent.routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://admin.inframeschool.com', 'https://test3-iota-ten.vercel.app'],
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
 

app.listen(PORT, async()=> {
    console.log(`server running on ${PORT}⚙️`)
    await connectToDatabase();
});

export default app;


