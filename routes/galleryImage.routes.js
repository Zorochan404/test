import {Router} from 'express';
import { 
    createGalleryImage, 
    deleteGalleryImageById, 
    getGalleryImageById, 
    getGalleryImages, 
    updateGalleryImageById,
    getGalleryImagesByCategory
} from '../controllers/galleryImageController.js';

const GalleryImageRouter = Router();

GalleryImageRouter.post('/addgalleryimage', createGalleryImage)

GalleryImageRouter.get('/getgalleryimages', getGalleryImages)

GalleryImageRouter.get('/getgalleryimagebyid/:id', getGalleryImageById)

GalleryImageRouter.get('/getgalleryimagesbycategory/:category', getGalleryImagesByCategory)

GalleryImageRouter.put('/updategalleryimage/:id', updateGalleryImageById)

GalleryImageRouter.delete('/deletegalleryimage/:id', deleteGalleryImageById)

export default GalleryImageRouter;
