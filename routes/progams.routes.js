import {Router} from 'express';
import { createPrograms, deleteProgramsById, getPrograms, updateProgramsById } from '../controllers/programsController.js';

const ProgramsRouter = Router();

ProgramsRouter.post('/addprograms', createPrograms)

ProgramsRouter.get('/getprograms', getPrograms)

ProgramsRouter.put('/updateprograms/:id', updateProgramsById)

ProgramsRouter.delete('/deleteprograms/:id', deleteProgramsById)

export default ProgramsRouter;