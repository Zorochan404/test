import {Router} from 'express';
import { createLogo, deleteLogoById, getLogo, getLogoById, updateLogoById } from '../controllers/logoController.js';

const LogoRouter = Router();

LogoRouter.post('/addlogo', createLogo)

LogoRouter.get('/getlogo', getLogo)

LogoRouter.get('/getlogoById/:id', getLogoById)

LogoRouter.put('/updatelogo/:id', updateLogoById)

LogoRouter.delete('/deletelogo/:id', deleteLogoById)

export default LogoRouter;