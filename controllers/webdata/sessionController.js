import Session from "../../models/webdata/session.js";

export const createSession = async (req, res, next) => {
    try {
        const newSession = await Session.create({ ...req.body });

        res.status(201).json({ success: true, data: newSession });
    } catch (e) {
        next(e);
    }
};

export const getSessions = async (req, res, next) => {
    try {
        const sessions = await Session.find().sort({ loginTime: -1 });

        res.status(200).json({ success: true, data: sessions });
    } catch (e) {
        next(e);
    }
};

export const getSessionById = async (req, res, next) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        res.status(200).json({ success: true, data: session });
    } catch (e) {
        next(e);
    }
};

export const updateSessionById = async (req, res, next) => {
    try {
        const session = await Session.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        res.status(200).json({ success: true, data: session });
    } catch (e) {
        next(e);
    }
};

export const deleteSessionById = async (req, res, next) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        res.status(200).json({ success: true, message: "Session deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get sessions by city
export const getSessionsByCity = async (req, res, next) => {
    try {
        const sessions = await Session.find({ city: req.params.city }).sort({ loginTime: -1 });

        res.status(200).json({ success: true, data: sessions });
    } catch (e) {
        next(e);
    }
};

// Get sessions by course
export const getSessionsByCourse = async (req, res, next) => {
    try {
        const sessions = await Session.find({ course: req.params.course }).sort({ loginTime: -1 });

        res.status(200).json({ success: true, data: sessions });
    } catch (e) {
        next(e);
    }
};

// Get active sessions
export const getActiveSessions = async (req, res, next) => {
    try {
        const sessions = await Session.find({ isActive: true }).sort({ loginTime: -1 });

        res.status(200).json({ success: true, data: sessions });
    } catch (e) {
        next(e);
    }
};
