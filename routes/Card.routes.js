import {Router} from 'express';
import { createCard, deleteCardById, getCard, updateCardById } from '../controllers/cardController.js';

const CardRouter = Router();

CardRouter.post('/addcard', createCard)

CardRouter.get('/getcard', getCard)

CardRouter.put('/updatecard/:id', updateCardById)


CardRouter.delete('/deletecard/:id', deleteCardById)


export default CardRouter;


