import Advisor from "../models/webdata/advisors.js";

export const createAdvisor = async (req, res, next) => {
    try {
        const newCard = await Advisor.create({ ...req.body });

        res.status(201).json({ success: true, data: newCard });
    } catch (e) {
        next(e);
    }
};

export const getAdvisors = async (req, res, next) => {
    try {
        const advisors = await Advisor.find();

        res.status(200).json({ success: true, data: advisors });
    } catch (e) {
        next(e);
    }
};

export const updateAdvisorById = async (req, res, next) => {
    try {
        const updatedCard = await Advisor.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ success: false, message: "Advisor not found" });
        }

        res.status(200).json({ success: true, data: updatedCard });
    } catch (e) {
        next(e);
    }
};

export const deleteAdvisorById = async (req, res, next) => {
    try {
        const deletedCard = await Advisor.findByIdAndDelete(req.params.id);

        if (!deletedCard) {
            return res.status(404).json({ success: false, message: "Advisor not found" });
        }

        res.status(200).json({ success: true, message: "Advisor deleted successfully" });
    } catch (e) {
        next(e);
    }
};



export const getAdvisorById = async (req, res, next) => {
    try {
        const advisor = await Advisor.findById(req.params.id);

        if (!advisor) {
            return res.status(404).json({ success: false, message: "Advisor not found" });
        }

        res.status(200).json({ success: true, data: advisor });
    } catch (e) {
        next(e);
    }
};
