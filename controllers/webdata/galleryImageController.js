import GalleryImage from "../../models/webdata/galleryImage.js";

export const createGalleryImage = async (req, res, next) => {
    try {
        const newImage = await GalleryImage.create({ ...req.body });

        res.status(201).json({ success: true, data: newImage });
    } catch (e) {
        next(e);
    }
};

export const getGalleryImages = async (req, res, next) => {
    try {
        const images = await GalleryImage.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: images });
    } catch (e) {
        next(e);
    }
};

export const getGalleryImageById = async (req, res, next) => {
    try {
        const image = await GalleryImage.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: "Gallery image not found" });
        }

        res.status(200).json({ success: true, data: image });
    } catch (e) {
        next(e);
    }
};

export const updateGalleryImageById = async (req, res, next) => {
    try {
        const image = await GalleryImage.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!image) {
            return res.status(404).json({ success: false, message: "Gallery image not found" });
        }

        res.status(200).json({ success: true, data: image });
    } catch (e) {
        next(e);
    }
};

export const deleteGalleryImageById = async (req, res, next) => {
    try {
        const image = await GalleryImage.findByIdAndDelete(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: "Gallery image not found" });
        }

        res.status(200).json({ success: true, message: "Gallery image deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get images by category
export const getGalleryImagesByCategory = async (req, res, next) => {
    try {
        const images = await GalleryImage.find({ 
            category: req.params.category 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: images });
    } catch (e) {
        next(e);
    }
};
