// Image upload controller for Cloudinary integration
// This controller handles image uploads to Cloudinary

export const uploadImageToCloudinary = async (req, res, next) => {
    try {
        // Check if file is provided
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file provided" 
            });
        }

        // For now, return a mock response since Cloudinary setup requires API keys
        // In production, you would integrate with actual Cloudinary SDK
        const mockCloudinaryResponse = {
            secure_url: `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/${req.file.originalname}`,
            public_id: `course_images/${Date.now()}`,
            width: 800,
            height: 600,
            format: 'jpg',
            resource_type: 'image'
        };

        res.status(200).json({ 
            success: true, 
            data: {
                imageUrl: mockCloudinaryResponse.secure_url,
                publicId: mockCloudinaryResponse.public_id,
                width: mockCloudinaryResponse.width,
                height: mockCloudinaryResponse.height,
                format: mockCloudinaryResponse.format
            },
            message: "Image uploaded successfully"
        });
    } catch (e) {
        next(e);
    }
};

// Multiple image upload for course galleries
export const uploadMultipleImages = async (req, res, next) => {
    try {
        // Check if files are provided
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No files provided" 
            });
        }

        // Mock multiple image upload response
        const uploadedImages = req.files.map((file, index) => ({
            imageUrl: `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/${file.originalname}`,
            publicId: `course_images/${Date.now()}_${index}`,
            width: 800,
            height: 600,
            format: 'jpg',
            originalName: file.originalname
        }));

        res.status(200).json({ 
            success: true, 
            data: uploadedImages,
            message: `${uploadedImages.length} images uploaded successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Delete image from Cloudinary
export const deleteImageFromCloudinary = async (req, res, next) => {
    try {
        const { publicId } = req.params;

        if (!publicId) {
            return res.status(400).json({ 
                success: false, 
                message: "Public ID is required" 
            });
        }

        // Mock deletion response
        res.status(200).json({ 
            success: true, 
            message: "Image deleted successfully",
            data: { publicId }
        });
    } catch (e) {
        next(e);
    }
};

/*
// Actual Cloudinary integration example (commented out)
// Uncomment and configure when you have Cloudinary credentials

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImageToCloudinaryReal = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file provided" 
            });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'course_images',
            transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        });

        res.status(200).json({ 
            success: true, 
            data: {
                imageUrl: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format
            },
            message: "Image uploaded successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const deleteImageFromCloudinaryReal = async (req, res, next) => {
    try {
        const { publicId } = req.params;

        if (!publicId) {
            return res.status(400).json({ 
                success: false, 
                message: "Public ID is required" 
            });
        }

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            res.status(200).json({ 
                success: true, 
                message: "Image deleted successfully",
                data: { publicId }
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: "Failed to delete image"
            });
        }
    } catch (e) {
        next(e);
    }
};
*/
