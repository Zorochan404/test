import {Router} from 'express';
import { 
    createLifeAtInframeSection, 
    deleteLifeAtInframeSectionById, 
    getLifeAtInframeSectionById, 
    getLifeAtInframeSections, 
    updateLifeAtInframeSectionById,
    getLifeAtInframeSectionsByType,
    getActiveLifeAtInframeSections
} from '../../controllers/webdata/lifeAtInframeSectionController.js';

const LifeAtInframeSectionRouter = Router();

LifeAtInframeSectionRouter.post('/addlifeatinframesection', createLifeAtInframeSection)

LifeAtInframeSectionRouter.get('/getlifeatinframesections', getLifeAtInframeSections)

LifeAtInframeSectionRouter.get('/getlifeatinframesectionbyid/:id', getLifeAtInframeSectionById)

LifeAtInframeSectionRouter.get('/getlifeatinframesectionsbytype/:type', getLifeAtInframeSectionsByType)

LifeAtInframeSectionRouter.get('/getactivelifeatinframesections', getActiveLifeAtInframeSections)

LifeAtInframeSectionRouter.put('/updatelifeatinframesection/:id', updateLifeAtInframeSectionById)

LifeAtInframeSectionRouter.delete('/deletelifeatinframesection/:id', deleteLifeAtInframeSectionById)

export default LifeAtInframeSectionRouter;
