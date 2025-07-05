import { Router } from 'express';
import {
    createMentor,
    getMentors,
    getMentorById,
    updateMentor,
    deleteMentor,
    getMentorsByRole,
    getMentorsByTags,
    getMentorRoles,
    getMentorTags,
    searchMentors,
    bulkCreateMentors,
    updateMentorImage,
    getMentorStats
} from '../controllers/mentorController.js';

const MentorRouter = Router();

// Basic CRUD operations
MentorRouter.post('/create', createMentor);
MentorRouter.get('/all', getMentors);
MentorRouter.get('/:id', getMentorById);
MentorRouter.put('/:id', updateMentor);
MentorRouter.delete('/:id', deleteMentor);

// Filtering and search
MentorRouter.get('/role/:role', getMentorsByRole);
MentorRouter.get('/tags/:tags', getMentorsByTags);
MentorRouter.get('/search', searchMentors);

// Utility endpoints
MentorRouter.get('/roles/all', getMentorRoles);
MentorRouter.get('/tags/all', getMentorTags);
MentorRouter.get('/stats/overview', getMentorStats);

// Bulk operations
MentorRouter.post('/bulk/create', bulkCreateMentors);

// Image management
MentorRouter.patch('/:id/image', updateMentorImage);

export default MentorRouter; 