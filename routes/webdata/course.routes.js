import { Router } from 'express';
import { 
    createCourse,
    getCourses,
    getActiveCourses,
    getCourseById,
    getCourseBySlug,
    updateCourseById,
    deleteCourseById,
    toggleCourseStatus,
    // Program operations
    addCourseProgram,
    updateCourseProgram,
    deleteCourseProgram,
    // Feature operations
    addCourseFeature,
    updateCourseFeature,
    deleteCourseFeature,
    // Testimonial operations
    addCourseTestimonial,
    updateCourseTestimonial,
    deleteCourseTestimonial,
    // FAQ operations
    addCourseFAQ,
    updateCourseFAQ,
    deleteCourseFAQ,
    // Curriculum operations
    addCourseCurriculum,
    updateCourseCurriculum,
    deleteCourseCurriculum,
    // Software operations
    addCourseSoftware,
    updateCourseSoftware,
    deleteCourseSoftware,
    // Career Prospect operations
    addCourseCareerProspect,
    updateCourseCareerProspect,
    deleteCourseCareerProspect,
    // Program-specific operations
    addProgramAdmissionStep,
    updateProgramAdmissionStep,
    deleteProgramAdmissionStep,
    updateProgramFeeStructure,
    addProgramEMIOption,
    updateProgramEMIOption,
    deleteProgramEMIOption,
    addProgramCouponCode,
    updateProgramCouponCode,
    deleteProgramCouponCode,
    // Utility functions
    generateSlugFromTitle,
    getAllPrograms,
    getProgramBySlug
} from '../../controllers/webdata/courseController.js';

const CourseRouter = Router();

// Main Course CRUD Operations
CourseRouter.post('/', createCourse);
CourseRouter.get('/', getCourses);
CourseRouter.get('/active', getActiveCourses);
CourseRouter.get('/slug/:slug', getCourseBySlug);
CourseRouter.get('/:id', getCourseById);
CourseRouter.put('/:id', updateCourseById);
CourseRouter.put('/:id/toggle-status', toggleCourseStatus);
CourseRouter.delete('/:id', deleteCourseById);

// Course Program Operations
CourseRouter.post('/:courseId/programs', addCourseProgram);
CourseRouter.put('/:courseId/programs/:programId', updateCourseProgram);
CourseRouter.delete('/:courseId/programs/:programId', deleteCourseProgram);

// Program-specific Operations
CourseRouter.post('/:courseId/programs/:programId/admission-steps', addProgramAdmissionStep);
CourseRouter.put('/:courseId/programs/:programId/admission-steps/:stepId', updateProgramAdmissionStep);
CourseRouter.delete('/:courseId/programs/:programId/admission-steps/:stepId', deleteProgramAdmissionStep);

// Program Fee Structure Operations
CourseRouter.put('/:courseId/programs/:programId/fee-structure', updateProgramFeeStructure);
CourseRouter.post('/:courseId/programs/:programId/emi-options', addProgramEMIOption);
CourseRouter.put('/:courseId/programs/:programId/emi-options/:emiId', updateProgramEMIOption);
CourseRouter.delete('/:courseId/programs/:programId/emi-options/:emiId', deleteProgramEMIOption);
CourseRouter.post('/:courseId/programs/:programId/coupon-codes', addProgramCouponCode);
CourseRouter.put('/:courseId/programs/:programId/coupon-codes/:couponId', updateProgramCouponCode);
CourseRouter.delete('/:courseId/programs/:programId/coupon-codes/:couponId', deleteProgramCouponCode);

// Course Feature Operations
CourseRouter.post('/:courseId/features', addCourseFeature);
CourseRouter.put('/:courseId/features/:featureId', updateCourseFeature);
CourseRouter.delete('/:courseId/features/:featureId', deleteCourseFeature);

// Course Testimonial Operations
CourseRouter.post('/:courseId/testimonials', addCourseTestimonial);
CourseRouter.put('/:courseId/testimonials/:testimonialId', updateCourseTestimonial);
CourseRouter.delete('/:courseId/testimonials/:testimonialId', deleteCourseTestimonial);

// Course FAQ Operations
CourseRouter.post('/:courseId/faqs', addCourseFAQ);
CourseRouter.put('/:courseId/faqs/:faqId', updateCourseFAQ);
CourseRouter.delete('/:courseId/faqs/:faqId', deleteCourseFAQ);

// Course Curriculum Operations
CourseRouter.post('/:courseId/curriculum', addCourseCurriculum);
CourseRouter.put('/:courseId/curriculum/:curriculumId', updateCourseCurriculum);
CourseRouter.delete('/:courseId/curriculum/:curriculumId', deleteCourseCurriculum);

// Course Software Operations
CourseRouter.post('/:courseId/software', addCourseSoftware);
CourseRouter.put('/:courseId/software/:softwareId', updateCourseSoftware);
CourseRouter.delete('/:courseId/software/:softwareId', deleteCourseSoftware);

// Course Career Prospect Operations
CourseRouter.post('/:courseId/career-prospects', addCourseCareerProspect);
CourseRouter.put('/:courseId/career-prospects/:careerProspectId', updateCourseCareerProspect);
CourseRouter.delete('/:courseId/career-prospects/:careerProspectId', deleteCourseCareerProspect);

// Additional utility endpoints
CourseRouter.get('/generate-slug/:title', generateSlugFromTitle);
CourseRouter.get('/programs/all', getAllPrograms);
CourseRouter.get('/programs/:courseSlug/:programSlug', getProgramBySlug);

export default CourseRouter;
