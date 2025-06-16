import { Router } from 'express';
import { 
    createHeroGalleryImage,
    getHeroGalleryImages,
    getHeroGalleryImageById,
    updateHeroGalleryImageById,
    deleteHeroGalleryImageById,
    getActiveHeroGalleryImages,
    toggleHeroGalleryImageStatus,
    reorderHeroGalleryImages
} from '../controllers/aboutUsHeroGalleryController.js';

const AboutUsHeroGalleryRouter = Router();

// Create new hero gallery image
AboutUsHeroGalleryRouter.post('/addheroimage', createHeroGalleryImage);

// Get all hero gallery images
AboutUsHeroGalleryRouter.get('/getheroimages', getHeroGalleryImages);

// Get active hero gallery images only
AboutUsHeroGalleryRouter.get('/getactiveheroimages', getActiveHeroGalleryImages);

// Get hero gallery image by ID
AboutUsHeroGalleryRouter.get('/getheroimage/:id', getHeroGalleryImageById);

// Update hero gallery image
AboutUsHeroGalleryRouter.put('/updateheroimage/:id', updateHeroGalleryImageById);

// Toggle hero gallery image status
AboutUsHeroGalleryRouter.put('/toggleheroimagestatus/:id', toggleHeroGalleryImageStatus);

// Reorder hero gallery images
AboutUsHeroGalleryRouter.put('/reorderheroimages', reorderHeroGalleryImages);

// Delete hero gallery image
AboutUsHeroGalleryRouter.delete('/deleteheroimage/:id', deleteHeroGalleryImageById);

export default AboutUsHeroGalleryRouter;
