import StudentClub from "../models/studentClub.js";

export const createStudentClub = async (req, res, next) => {
    try {
        const newClub = await StudentClub.create({ ...req.body });

        res.status(201).json({ success: true, data: newClub });
    } catch (e) {
        next(e);
    }
};

export const getStudentClubs = async (req, res, next) => {
    try {
        const clubs = await StudentClub.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: clubs });
    } catch (e) {
        next(e);
    }
};

export const getStudentClubById = async (req, res, next) => {
    try {
        const club = await StudentClub.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ success: false, message: "Student club not found" });
        }

        res.status(200).json({ success: true, data: club });
    } catch (e) {
        next(e);
    }
};

export const updateStudentClubById = async (req, res, next) => {
    try {
        const club = await StudentClub.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!club) {
            return res.status(404).json({ success: false, message: "Student club not found" });
        }

        res.status(200).json({ success: true, data: club });
    } catch (e) {
        next(e);
    }
};

export const deleteStudentClubById = async (req, res, next) => {
    try {
        const club = await StudentClub.findByIdAndDelete(req.params.id);

        if (!club) {
            return res.status(404).json({ success: false, message: "Student club not found" });
        }

        res.status(200).json({ success: true, message: "Student club deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get clubs by category
export const getStudentClubsByCategory = async (req, res, next) => {
    try {
        const clubs = await StudentClub.find({ 
            category: req.params.category 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: clubs });
    } catch (e) {
        next(e);
    }
};
