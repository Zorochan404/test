import Programs from "../models/programs.js";

export const createPrograms = async (req, res, next) => {
    try {
        const newPrograms = await Programs.create({ ...req.body });

        res.status(201).json({ success: true, data: newPrograms });
    } catch (e) {
        next(e);
    }
};

export const getPrograms = async (req, res, next) => {
    try {
        const Programss = await Programs.find();

        res.status(200).json({ success: true, data: Programss });
    } catch (e) {
        next(e);
    }
};

export const updateProgramsById = async (req, res, next) => {
    try {
        const updatedPrograms = await Programs.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedPrograms) {
            return res.status(404).json({ success: false, message: "Programs not found" });
        }

        res.status(200).json({ success: true, data: updatedPrograms });
    } catch (e) {
        next(e);
    }
};

export const deleteProgramsById = async (req, res, next) => {
    try {
        const deletedPrograms = await Programs.findByIdAndDelete(req.params.id);

        if (!deletedPrograms) {
            return res.status(404).json({ success: false, message: "Programs not found" });
        }

        res.status(200).json({ success: true, message: "Programs deleted successfully" });
    } catch (e) {
        next(e);
    }
};