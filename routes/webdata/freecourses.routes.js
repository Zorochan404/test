import { Router } from 'express';
import { 
    createFreeCourse,
    getFreeCourses,
    getActiveFreeCourses,
    getFreeCourseById,
    updateFreeCourseById,
    deleteFreeCourseById,
    toggleFreeCourseStatus,
    // Details operations
    addFreeCourseDetail,
    updateFreeCourseDetail,
    deleteFreeCourseDetail,
    // What You Will Learn operations
    addWhatYouWillLearn,
    updateWhatYouWillLearn,
    deleteWhatYouWillLearn,
    // Course Benefits operations
    addCourseBenefit,
    updateCourseBenefit,
    deleteCourseBenefit
} from '../../controllers/webdata/freecoursesController.js';

const FreeCoursesRouter = Router();

// Main FreeCourses CRUD Operations
FreeCoursesRouter.post('/', createFreeCourse);
FreeCoursesRouter.get('/', getFreeCourses);
FreeCoursesRouter.get('/active', getActiveFreeCourses);
FreeCoursesRouter.get('/:id', getFreeCourseById);
FreeCoursesRouter.put('/:id', updateFreeCourseById);
FreeCoursesRouter.put('/:id/toggle-status', toggleFreeCourseStatus);
FreeCoursesRouter.delete('/:id', deleteFreeCourseById);

// FreeCourse Details Operations
FreeCoursesRouter.post('/:courseId/details', addFreeCourseDetail);
FreeCoursesRouter.put('/:courseId/details/:detailId', updateFreeCourseDetail);
FreeCoursesRouter.delete('/:courseId/details/:detailId', deleteFreeCourseDetail);

// What You Will Learn Operations
FreeCoursesRouter.post('/:courseId/what-you-will-learn', addWhatYouWillLearn);
FreeCoursesRouter.put('/:courseId/what-you-will-learn/:index', updateWhatYouWillLearn);
FreeCoursesRouter.delete('/:courseId/what-you-will-learn/:index', deleteWhatYouWillLearn);

// Course Benefits Operations
FreeCoursesRouter.post('/:courseId/course-benefits', addCourseBenefit);
FreeCoursesRouter.put('/:courseId/course-benefits/:index', updateCourseBenefit);
FreeCoursesRouter.delete('/:courseId/course-benefits/:index', deleteCourseBenefit);

export default FreeCoursesRouter; 