import AboutUsHeroGallery from "../../models/webdata/aboutUsHeroGallery.js";

export const createHeroGalleryImage = async (req, res, next) => {
    try {
        const newImage = await AboutUsHeroGallery.create({ ...req.body });

        res.status(201).json({ success: true, data: newImage });
    } catch (e) {
        next(e);
    }
};

export const getHeroGalleryImages = async (req, res, next) => {
    try {
        const images = await AboutUsHeroGallery.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: images });
    } catch (e) {
        next(e);
    }
};

export const getHeroGalleryImageById = async (req, res, next) => {
    try {
        const image = await AboutUsHeroGallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: "Hero gallery image not found" });
        }

        res.status(200).json({ success: true, data: image });
    } catch (e) {
        next(e);
    }
};

export const updateHeroGalleryImageById = async (req, res, next) => {
    try {
        const image = await AboutUsHeroGallery.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!image) {
            return res.status(404).json({ success: false, message: "Hero gallery image not found" });
        }

        res.status(200).json({ success: true, data: image });
    } catch (e) {
        next(e);
    }
};

export const deleteHeroGalleryImageById = async (req, res, next) => {
    try {
        const image = await AboutUsHeroGallery.findByIdAndDelete(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: "Hero gallery image not found" });
        }

        res.status(200).json({ success: true, message: "Hero gallery image deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get active hero gallery images only
export const getActiveHeroGalleryImages = async (req, res, next) => {
    try {
        const images = await AboutUsHeroGallery.find({ 
            isActive: true 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: images });
    } catch (e) {
        next(e);
    }
};

// Toggle active status
export const toggleHeroGalleryImageStatus = async (req, res, next) => {
    try {
        const image = await AboutUsHeroGallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: "Hero gallery image not found" });
        }

        image.isActive = !image.isActive;
        await image.save();

        res.status(200).json({ 
            success: true, 
            data: image,
            message: `Hero gallery image ${image.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Reorder hero gallery images
export const reorderHeroGalleryImages = async (req, res, next) => {
    try {
        const { imageOrders } = req.body; // Array of {id, order} objects

        if (!Array.isArray(imageOrders)) {
            return res.status(400).json({ 
                success: false, 
                message: "imageOrders must be an array of {id, order} objects" 
            });
        }

        const updatePromises = imageOrders.map(({ id, order }) => 
            AboutUsHeroGallery.findByIdAndUpdate(id, { order }, { new: true })
        );

        const updatedImages = await Promise.all(updatePromises);

        res.status(200).json({ 
            success: true, 
            data: updatedImages,
            message: "Hero gallery images reordered successfully"
        });
    } catch (e) {
        next(e);
    }
};
