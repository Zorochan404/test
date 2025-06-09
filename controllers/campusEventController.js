import CampusEvent from "../models/campusEvent.js";

export const createCampusEvent = async (req, res, next) => {
    try {
        const newEvent = await CampusEvent.create({ ...req.body });

        res.status(201).json({ success: true, data: newEvent });
    } catch (e) {
        next(e);
    }
};

export const getCampusEvents = async (req, res, next) => {
    try {
        const events = await CampusEvent.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: events });
    } catch (e) {
        next(e);
    }
};

export const getCampusEventById = async (req, res, next) => {
    try {
        const event = await CampusEvent.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: "Campus event not found" });
        }

        res.status(200).json({ success: true, data: event });
    } catch (e) {
        next(e);
    }
};

export const updateCampusEventById = async (req, res, next) => {
    try {
        const event = await CampusEvent.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({ success: false, message: "Campus event not found" });
        }

        res.status(200).json({ success: true, data: event });
    } catch (e) {
        next(e);
    }
};

export const deleteCampusEventById = async (req, res, next) => {
    try {
        const event = await CampusEvent.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: "Campus event not found" });
        }

        res.status(200).json({ success: true, message: "Campus event deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get events by category
export const getCampusEventsByCategory = async (req, res, next) => {
    try {
        const events = await CampusEvent.find({ 
            category: req.params.category 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: events });
    } catch (e) {
        next(e);
    }
};
