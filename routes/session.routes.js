import {Router} from 'express';
import { 
    createSession, 
    deleteSessionById, 
    getSessionById, 
    getSessions, 
    updateSessionById,
    getSessionsByCity,
    getSessionsByCourse,
    getActiveSessions
} from '../controllers/sessionController.js';

const SessionRouter = Router();

SessionRouter.post('/addsessionlogin', createSession)

SessionRouter.get('/getsessionlogins', getSessions)

SessionRouter.get('/getsessionloginbyid/:id', getSessionById)

SessionRouter.get('/getsessionsbycity/:city', getSessionsByCity)

SessionRouter.get('/getsessionsbycourse/:course', getSessionsByCourse)

SessionRouter.get('/getactivesessions', getActiveSessions)

SessionRouter.put('/updatesessionlogin/:id', updateSessionById)

SessionRouter.delete('/deletesessionlogin/:id', deleteSessionById)

export default SessionRouter;
