import {Router} from 'express';
import { 
    createSportsFacility, 
    deleteSportsFacilityById, 
    getSportsFacilityById, 
    getSportsFacilities, 
    updateSportsFacilityById,
    getSportsFacilitiesByCategory
} from '../controllers/sportsFacilityController.js';

const SportsFacilityRouter = Router();

SportsFacilityRouter.post('/addsportsfacility', createSportsFacility)

SportsFacilityRouter.get('/getsportsfacilities', getSportsFacilities)

SportsFacilityRouter.get('/getsportsfacilitybyid/:id', getSportsFacilityById)

SportsFacilityRouter.get('/getsportsfacilitiesbycategory/:category', getSportsFacilitiesByCategory)

SportsFacilityRouter.put('/updatesportsfacility/:id', updateSportsFacilityById)

SportsFacilityRouter.delete('/deletesportsfacility/:id', deleteSportsFacilityById)

export default SportsFacilityRouter;
