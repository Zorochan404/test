import LifeAtInframeSection from "../../models/webdata/lifeAtInframeSection.js";

export const createLifeAtInframeSection = async (req, res, next) => {
    try {
        const newSection = await LifeAtInframeSection.create({ ...req.body });

        res.status(201).json({ success: true, data: newSection });
    } catch (e) {
        next(e);
    }
};

export const getLifeAtInframeSections = async (req, res, next) => {
    try {
        const sections = await LifeAtInframeSection.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: sections });
    } catch (e) {
        next(e);
    }
};

export const getLifeAtInframeSectionById = async (req, res, next) => {
    try {
        const section = await LifeAtInframeSection.findById(req.params.id);

        if (!section) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        res.status(200).json({ success: true, data: section });
    } catch (e) {
        next(e);
    }
};

export const updateLifeAtInframeSectionById = async (req, res, next) => {
    try {
        const section = await LifeAtInframeSection.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!section) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        res.status(200).json({ success: true, data: section });
    } catch (e) {
        next(e);
    }
};

export const deleteLifeAtInframeSectionById = async (req, res, next) => {
    try {
        const section = await LifeAtInframeSection.findByIdAndDelete(req.params.id);

        if (!section) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        res.status(200).json({ success: true, message: "Section deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get sections by type
export const getLifeAtInframeSectionsByType = async (req, res, next) => {
    try {
        const sections = await LifeAtInframeSection.find({ 
            sectionType: req.params.type 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: sections });
    } catch (e) {
        next(e);
    }
};

// Get active sections
export const getActiveLifeAtInframeSections = async (req, res, next) => {
    try {
        const sections = await LifeAtInframeSection.find({ 
            isActive: true 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: sections });
    } catch (e) {
        next(e);
    }
};
