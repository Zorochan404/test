import Logo from "../../models/webdata/logos.js";

export const createLogo = async (req, res, next) => {
    try {
        const newLogo = await Logo.create({ ...req.body });

        res.status(201).json({ success: true, data: newLogo });
    } catch (e) {
        next(e);
    }
};

export const getLogo = async (req, res, next) => {
    try {
        const Logos = await Logo.find();

        res.status(200).json({ success: true, data: Logos });
    } catch (e) {
        next(e);
    }
};

export const getLogoById = async (req, res, next) => {
    try {
        const logo = await Logo.findById(req.params.id);

        if (!logo) {
            return res.status(404).json({ success: false, message: "Logo not found" });
        }

        res.status(200).json({ success: true, data: logo });
    } catch (e) {
        next(e);
    }
};

export const updateLogoById = async (req, res, next) => {
    try {
        const updatedLogo = await Logo.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedLogo) {
            return res.status(404).json({ success: false, message: "Logo not found" });
        }

        res.status(200).json({ success: true, data: updatedLogo });
    } catch (e) {
        next(e);
    }
};

export const deleteLogoById = async (req, res, next) => {
    try {
        const deletedLogo = await Logo.findByIdAndDelete(req.params.id);

        if (!deletedLogo) {
            return res.status(404).json({ success: false, message: "Logo not found" });
        }

        res.status(200).json({ success: true, message: "Logo deleted successfully" });
    } catch (e) {
        next(e);
    }
};