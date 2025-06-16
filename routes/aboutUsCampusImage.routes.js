import { Router } from 'express';
import { 
    createCampusImage,
    getCampusImages,
    getCampusImageById,
    updateCampusImageById,
    deleteCampusImageById,
    getActiveCampusImages,
    toggleCampusImageStatus,
    reorderCampusImages
} from '../controllers/aboutUsCampusImageController.js';

const AboutUsCampusImageRouter = Router();

// Create new campus image
AboutUsCampusImageRouter.post('/addcampusimage', createCampusImage);

// Get all campus images
AboutUsCampusImageRouter.get('/getcampusimages', getCampusImages);

// Get active campus images only
AboutUsCampusImageRouter.get('/getactivecampusimages', getActiveCampusImages);

// Get campus image by ID
AboutUsCampusImageRouter.get('/getcampusimage/:id', getCampusImageById);

// Update campus image
AboutUsCampusImageRouter.put('/updatecampusimage/:id', updateCampusImageById);

// Toggle campus image status
AboutUsCampusImageRouter.put('/togglecampusimagestatus/:id', toggleCampusImageStatus);

// Reorder campus images
AboutUsCampusImageRouter.put('/reordercampusimages', reorderCampusImages);

// Delete campus image
AboutUsCampusImageRouter.delete('/deletecampusimage/:id', deleteCampusImageById);

export default AboutUsCampusImageRouter;
