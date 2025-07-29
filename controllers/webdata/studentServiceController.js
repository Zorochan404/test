import StudentService from "../../models/webdata/studentService.js";

export const createStudentService = async (req, res, next) => {
    try {
        const newService = await StudentService.create({ ...req.body });

        res.status(201).json({ success: true, data: newService });
    } catch (e) {
        next(e);
    }
};

export const getStudentServices = async (req, res, next) => {
    try {
        const services = await StudentService.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: services });
    } catch (e) {
        next(e);
    }
};

export const getStudentServiceById = async (req, res, next) => {
    try {
        const service = await StudentService.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ success: false, message: "Student service not found" });
        }

        res.status(200).json({ success: true, data: service });
    } catch (e) {
        next(e);
    }
};

export const updateStudentServiceById = async (req, res, next) => {
    try {
        const service = await StudentService.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({ success: false, message: "Student service not found" });
        }

        res.status(200).json({ success: true, data: service });
    } catch (e) {
        next(e);
    }
};

export const deleteStudentServiceById = async (req, res, next) => {
    try {
        const service = await StudentService.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({ success: false, message: "Student service not found" });
        }

        res.status(200).json({ success: true, message: "Student service deleted successfully" });
    } catch (e) {
        next(e);
    }
};
