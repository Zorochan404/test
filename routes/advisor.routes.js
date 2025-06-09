import {Router} from 'express';
import { createAdvisor, deleteAdvisorById, getAdvisorById, getAdvisors, updateAdvisorById } from '../controllers/advisorcontroller.js';

const AdvisorRouter = Router();

AdvisorRouter.post('/addadvisor', createAdvisor)

AdvisorRouter.get('/getadvisors', getAdvisors)

AdvisorRouter.put('/updateadvisor/:id', updateAdvisorById)

AdvisorRouter.get('/getadvisorsbyid/:id', getAdvisorById)


AdvisorRouter.delete('/deleteadvisor/:id', deleteAdvisorById)


export default AdvisorRouter;


