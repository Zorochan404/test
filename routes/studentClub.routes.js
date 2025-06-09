import {Router} from 'express';
import { 
    createStudentClub, 
    deleteStudentClubById, 
    getStudentClubById, 
    getStudentClubs, 
    updateStudentClubById,
    getStudentClubsByCategory
} from '../controllers/studentClubController.js';

const StudentClubRouter = Router();

StudentClubRouter.post('/addstudentclub', createStudentClub)

StudentClubRouter.get('/getstudentclubs', getStudentClubs)

StudentClubRouter.get('/getstudentclubbyid/:id', getStudentClubById)

StudentClubRouter.get('/getstudentclubsbycategory/:category', getStudentClubsByCategory)

StudentClubRouter.put('/updatestudentclub/:id', updateStudentClubById)

StudentClubRouter.delete('/deletestudentclub/:id', deleteStudentClubById)

export default StudentClubRouter;
