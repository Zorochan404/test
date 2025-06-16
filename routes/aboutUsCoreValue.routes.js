import { Router } from 'express';
import { 
    createCoreValue,
    getCoreValues,
    getCoreValueById,
    updateCoreValueById,
    deleteCoreValueById,
    getActiveCoreValues,
    toggleCoreValueStatus,
    reorderCoreValues
} from '../controllers/aboutUsCoreValueController.js';

const AboutUsCoreValueRouter = Router();

// Create new core value
AboutUsCoreValueRouter.post('/addcorevalue', createCoreValue);

// Get all core values
AboutUsCoreValueRouter.get('/getcorevalues', getCoreValues);

// Get active core values only
AboutUsCoreValueRouter.get('/getactivecorevalues', getActiveCoreValues);

// Get core value by ID
AboutUsCoreValueRouter.get('/getcorevalue/:id', getCoreValueById);

// Update core value
AboutUsCoreValueRouter.put('/updatecorevalue/:id', updateCoreValueById);

// Toggle core value status
AboutUsCoreValueRouter.put('/togglecorevaluestatus/:id', toggleCoreValueStatus);

// Reorder core values
AboutUsCoreValueRouter.put('/reordercorevalues', reorderCoreValues);

// Delete core value
AboutUsCoreValueRouter.delete('/deletecorevalue/:id', deleteCoreValueById);

export default AboutUsCoreValueRouter;
