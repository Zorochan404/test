import {Router} from 'express';
import { 
    createCampusEvent, 
    deleteCampusEventById, 
    getCampusEventById, 
    getCampusEvents, 
    updateCampusEventById,
    getCampusEventsByCategory
} from '../controllers/campusEventController.js';

const CampusEventRouter = Router();

CampusEventRouter.post('/addcampusevent', createCampusEvent)

CampusEventRouter.get('/getcampusevents', getCampusEvents)

CampusEventRouter.get('/getcampuseventbyid/:id', getCampusEventById)

CampusEventRouter.get('/getcampuseventsbycategory/:category', getCampusEventsByCategory)

CampusEventRouter.put('/updatecampusevent/:id', updateCampusEventById)

CampusEventRouter.delete('/deletecampusevent/:id', deleteCampusEventById)

export default CampusEventRouter;
