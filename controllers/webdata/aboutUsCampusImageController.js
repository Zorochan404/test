import AboutUsCampusImage from "../../models/webdata/aboutUsCampusImage.js";

export const createCampusImage = async (req, res, next) => {
    try {
        const newCampusImage = await AboutUsCampusImage.create({ ...req.body });

        res.status(201).json({ success: true, data: newCampusImage });
    } catch (e) {
        next(e);
    }
};

export const getCampusImages = async (req, res, next) => {
    try {
        const campusImages = await AboutUsCampusImage.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: campusImages });
    } catch (e) {
        next(e);
    }
};

export const getCampusImageById = async (req, res, next) => {
    try {
        const campusImage = await AboutUsCampusImage.findById(req.params.id);

        if (!campusImage) {
            return res.status(404).json({ success: false, message: "Campus image not found" });
        }

        res.status(200).json({ success: true, data: campusImage });
    } catch (e) {
        next(e);
    }
};

export const updateCampusImageById = async (req, res, next) => {
    try {
        const campusImage = await AboutUsCampusImage.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!campusImage) {
            return res.status(404).json({ success: false, message: "Campus image not found" });
        }

        res.status(200).json({ success: true, data: campusImage });
    } catch (e) {
        next(e);
    }
};

export const deleteCampusImageById = async (req, res, next) => {
    try {
        const campusImage = await AboutUsCampusImage.findByIdAndDelete(req.params.id);

        if (!campusImage) {
            return res.status(404).json({ success: false, message: "Campus image not found" });
        }

        res.status(200).json({ success: true, message: "Campus image deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get active campus images only
export const getActiveCampusImages = async (req, res, next) => {
    try {
        const campusImages = await AboutUsCampusImage.find({ 
            isActive: true 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: campusImages });
    } catch (e) {
        next(e);
    }
};

// Toggle active status
export const toggleCampusImageStatus = async (req, res, next) => {
    try {
        const campusImage = await AboutUsCampusImage.findById(req.params.id);

        if (!campusImage) {
            return res.status(404).json({ success: false, message: "Campus image not found" });
        }

        campusImage.isActive = !campusImage.isActive;
        await campusImage.save();

        res.status(200).json({ 
            success: true, 
            data: campusImage,
            message: `Campus image ${campusImage.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Reorder campus images
export const reorderCampusImages = async (req, res, next) => {
    try {
        const { campusImageOrders } = req.body; // Array of {id, order} objects

        if (!Array.isArray(campusImageOrders)) {
            return res.status(400).json({ 
                success: false, 
                message: "campusImageOrders must be an array of {id, order} objects" 
            });
        }

        const updatePromises = campusImageOrders.map(({ id, order }) => 
            AboutUsCampusImage.findByIdAndUpdate(id, { order }, { new: true })
        );

        const updatedCampusImages = await Promise.all(updatePromises);

        res.status(200).json({ 
            success: true, 
            data: updatedCampusImages,
            message: "Campus images reordered successfully"
        });
    } catch (e) {
        next(e);
    }
};
