import { Router } from 'express';
import {
    createAdmission,
    getAdmissions,
    getAdmissionById,
    updateAdmissionById,
    deleteAdmissionById,
    updateAdmissionStatus,
    submitAdmissionForm,
    getAdmissionByUserId,
    getUserWithAdmission,
    updateAdmissionByUserId,
    deleteAdmissionByUserId,
    refreshAdmissionData,
    debugAdmissionState
} from '../controllers/admissionController.js';

const AdmissionRouter = Router();

// User-related admission endpoints
AdmissionRouter.post('/submit', submitAdmissionForm);
AdmissionRouter.get('/user/:userId', getAdmissionByUserId);
AdmissionRouter.get('/user/:userId/complete', getUserWithAdmission);
AdmissionRouter.put('/user/:userId', updateAdmissionByUserId);
AdmissionRouter.delete('/user/:userId', deleteAdmissionByUserId);
AdmissionRouter.get('/user/:userId/refresh', refreshAdmissionData);
AdmissionRouter.get('/debug/:admissionId', debugAdmissionState);

// General admission endpoints
AdmissionRouter.post('/add', createAdmission);
AdmissionRouter.get('/all', getAdmissions);
AdmissionRouter.get('/:id', getAdmissionById);
AdmissionRouter.put('/:id', updateAdmissionById);
AdmissionRouter.delete('/:id', deleteAdmissionById);
AdmissionRouter.patch('/status/:id', updateAdmissionStatus);

export default AdmissionRouter; 