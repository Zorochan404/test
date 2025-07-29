import {Router} from 'express';
import {
    createCareerPost,
    deleteCareerPostById,
    getCareerPostById,
    getCareerPosts,
    getAllCareerPosts,
    updateCareerPostById,
    getActiveCareerPosts,
    getInactiveCareerPosts,
    getCareerPostsByType,
    getCareerPostsByPlace,
    toggleCareerPostStatus,
    activateCareerPost,
    deactivateCareerPost,
    searchCareerPosts,
    applyToCareerPost,
    getApplicantsForCareerPost,
    getAllApplicants,
    removeApplicantFromCareerPost,
    updateApplicantStatus,
    getApplicantsByStatus
} from '../../controllers/webdata/careerPostController.js';

const CareerPostRouter = Router();

// ===== CAREER POST ENDPOINTS =====

// Create a new career post
CareerPostRouter.post('/addcareerpost', createCareerPost)

// Get all active career posts (public endpoint)
CareerPostRouter.get('/getcareerposts', getCareerPosts)

// Get all career posts (admin endpoint)
CareerPostRouter.get('/getallcareerposts', getAllCareerPosts)

// Get active career posts
CareerPostRouter.get('/getactivecareerposts', getActiveCareerPosts)

// Get inactive career posts
CareerPostRouter.get('/getinactivecareerposts', getInactiveCareerPosts)

// Get career posts by type (fulltime/parttime)
CareerPostRouter.get('/getcareerpostsbytype/:type', getCareerPostsByType)

// Get career posts by place
CareerPostRouter.get('/getcareerpostsbyplace/:place', getCareerPostsByPlace)

// Search career posts
CareerPostRouter.get('/searchcareerposts', searchCareerPosts)

// Get career post by ID
CareerPostRouter.get('/getcareerpostbyid/:id', getCareerPostById)

// Update career post
CareerPostRouter.put('/updatecareerpost/:id', updateCareerPostById)

// Toggle career post status
CareerPostRouter.put('/togglecareerpoststatus/:id', toggleCareerPostStatus)

// Activate career post
CareerPostRouter.put('/activatecareerpost/:id', activateCareerPost)

// Deactivate career post
CareerPostRouter.put('/deactivatecareerpost/:id', deactivateCareerPost)

// Delete career post
CareerPostRouter.delete('/deletecareerpost/:id', deleteCareerPostById)

// ===== APPLICANT ENDPOINTS =====

// Apply to a career post
CareerPostRouter.post('/apply/:id', applyToCareerPost)

// Get applicants for a specific career post
CareerPostRouter.get('/applicants/:id', getApplicantsForCareerPost)

// Get all applicants across all career posts
CareerPostRouter.get('/all-applicants', getAllApplicants)

// Remove an applicant from a career post
CareerPostRouter.delete('/applicants/:id/:applicantId', removeApplicantFromCareerPost)

// Update applicant status
CareerPostRouter.put('/applicants/:id/:applicantId/status', updateApplicantStatus)

// Get applicants by status
CareerPostRouter.get('/applicants-by-status/:status', getApplicantsByStatus)

export default CareerPostRouter; 