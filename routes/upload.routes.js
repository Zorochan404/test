import { Router } from 'express';
import multer from 'multer';
import { 
    uploadImageToCloudinary,
    uploadMultipleImages,
    deleteImageFromCloudinary
} from '../controllers/uploadController.js';

const UploadRouter = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Single image upload
UploadRouter.post('/image', upload.single('image'), uploadImageToCloudinary);

// Multiple image upload
UploadRouter.post('/images', upload.array('images', 10), uploadMultipleImages);

// Delete image
UploadRouter.delete('/image/:publicId', deleteImageFromCloudinary);

export default UploadRouter;
