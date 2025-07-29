import SportsFacility from "../../models/webdata/sportsFacility.js";

export const createSportsFacility = async (req, res, next) => {
    try {
        const newFacility = await SportsFacility.create({ ...req.body });

        res.status(201).json({ success: true, data: newFacility });
    } catch (e) {
        next(e);
    }
};

export const getSportsFacilities = async (req, res, next) => {
    try {
        const facilities = await SportsFacility.find().sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: facilities });
    } catch (e) {
        next(e);
    }
};

export const getSportsFacilityById = async (req, res, next) => {
    try {
        const facility = await SportsFacility.findById(req.params.id);

        if (!facility) {
            return res.status(404).json({ success: false, message: "Sports facility not found" });
        }

        res.status(200).json({ success: true, data: facility });
    } catch (e) {
        next(e);
    }
};

export const updateSportsFacilityById = async (req, res, next) => {
    try {
        const facility = await SportsFacility.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!facility) {
            return res.status(404).json({ success: false, message: "Sports facility not found" });
        }

        res.status(200).json({ success: true, data: facility });
    } catch (e) {
        next(e);
    }
};

export const deleteSportsFacilityById = async (req, res, next) => {
    try {
        const facility = await SportsFacility.findByIdAndDelete(req.params.id);

        if (!facility) {
            return res.status(404).json({ success: false, message: "Sports facility not found" });
        }

        res.status(200).json({ success: true, message: "Sports facility deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get facilities by category
export const getSportsFacilitiesByCategory = async (req, res, next) => {
    try {
        const facilities = await SportsFacility.find({ 
            category: req.params.category 
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: facilities });
    } catch (e) {
        next(e);
    }
};
