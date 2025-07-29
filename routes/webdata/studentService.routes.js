import {Router} from 'express';
import { 
    createStudentService, 
    deleteStudentServiceById, 
    getStudentServiceById, 
    getStudentServices, 
    updateStudentServiceById
} from '../../controllers/webdata/studentServiceController.js';

const StudentServiceRouter = Router();

StudentServiceRouter.post('/addstudentservice', createStudentService)

StudentServiceRouter.get('/getstudentservices', getStudentServices)

StudentServiceRouter.get('/getstudentservicebyid/:id', getStudentServiceById)

StudentServiceRouter.put('/updatestudentservice/:id', updateStudentServiceById)

StudentServiceRouter.delete('/deletestudentservice/:id', deleteStudentServiceById)

export default StudentServiceRouter;
