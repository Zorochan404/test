import FreeCourses from "../models/freecourses.js";

// Main FreeCourses CRUD Operations
export const createFreeCourse = async (req, res, next) => {
    try {
        const newFreeCourse = await FreeCourses.create({ ...req.body });

        res.status(201).json({ success: true, data: newFreeCourse });
    } catch (e) {
        next(e);
    }
};

export const getFreeCourses = async (req, res, next) => {
    try {
        const freeCourses = await FreeCourses.find().sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: freeCourses });
    } catch (e) {
        next(e);
    }
};

export const getActiveFreeCourses = async (req, res, next) => {
    try {
        const freeCourses = await FreeCourses.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: freeCourses });
    } catch (e) {
        next(e);
    }
};

export const getFreeCourseById = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.id);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        res.status(200).json({ success: true, data: freeCourse });
    } catch (e) {
        next(e);
    }
};

export const updateFreeCourseById = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        res.status(200).json({ success: true, data: freeCourse });
    } catch (e) {
        next(e);
    }
};

export const deleteFreeCourseById = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findByIdAndDelete(req.params.id);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        res.status(200).json({ success: true, message: "Free course deleted successfully" });
    } catch (e) {
        next(e);
    }
};

export const toggleFreeCourseStatus = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.id);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        freeCourse.isActive = !freeCourse.isActive;
        await freeCourse.save();

        res.status(200).json({ 
            success: true, 
            data: freeCourse,
            message: `Free course ${freeCourse.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Details Operations
export const addFreeCourseDetail = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        freeCourse.details.push(req.body);
        await freeCourse.save();

        const addedDetail = freeCourse.details[freeCourse.details.length - 1];
        res.status(201).json({ success: true, data: addedDetail });
    } catch (e) {
        next(e);
    }
};

export const updateFreeCourseDetail = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        const detail = freeCourse.details.id(req.params.detailId);
        if (!detail) {
            return res.status(404).json({ success: false, message: "Detail not found" });
        }

        Object.assign(detail, req.body);
        await freeCourse.save();

        res.status(200).json({ success: true, data: detail });
    } catch (e) {
        next(e);
    }
};

export const deleteFreeCourseDetail = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        const detail = freeCourse.details.id(req.params.detailId);
        if (!detail) {
            return res.status(404).json({ success: false, message: "Detail not found" });
        }

        freeCourse.details.pull(req.params.detailId);
        await freeCourse.save();

        res.status(200).json({ success: true, message: "Detail deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// What You Will Learn Operations
export const addWhatYouWillLearn = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        freeCourse.whatYouWillLearn.push(req.body.item);
        await freeCourse.save();

        res.status(201).json({ 
            success: true, 
            data: { item: req.body.item },
            message: "Learning objective added successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const updateWhatYouWillLearn = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        const index = req.params.index;
        if (index < 0 || index >= freeCourse.whatYouWillLearn.length) {
            return res.status(404).json({ success: false, message: "Learning objective not found" });
        }

        freeCourse.whatYouWillLearn[index] = req.body.item;
        await freeCourse.save();

        res.status(200).json({ 
            success: true, 
            data: { item: req.body.item },
            message: "Learning objective updated successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const deleteWhatYouWillLearn = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        const index = req.params.index;
        if (index < 0 || index >= freeCourse.whatYouWillLearn.length) {
            return res.status(404).json({ success: false, message: "Learning objective not found" });
        }

        const deletedItem = freeCourse.whatYouWillLearn.splice(index, 1)[0];
        await freeCourse.save();

        res.status(200).json({ 
            success: true, 
            message: "Learning objective deleted successfully",
            data: { deletedItem }
        });
    } catch (e) {
        next(e);
    }
};

// Course Benefits Operations
export const addCourseBenefit = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        freeCourse.courseBenefits.push(req.body.benefit);
        await freeCourse.save();

        res.status(201).json({ 
            success: true, 
            data: { benefit: req.body.benefit },
            message: "Course benefit added successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const updateCourseBenefit = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        const index = req.params.index;
        if (index < 0 || index >= freeCourse.courseBenefits.length) {
            return res.status(404).json({ success: false, message: "Course benefit not found" });
        }

        freeCourse.courseBenefits[index] = req.body.benefit;
        await freeCourse.save();

        res.status(200).json({ 
            success: true, 
            data: { benefit: req.body.benefit },
            message: "Course benefit updated successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseBenefit = async (req, res, next) => {
    try {
        const freeCourse = await FreeCourses.findById(req.params.courseId);

        if (!freeCourse) {
            return res.status(404).json({ success: false, message: "Free course not found" });
        }

        const index = req.params.index;
        if (index < 0 || index >= freeCourse.courseBenefits.length) {
            return res.status(404).json({ success: false, message: "Course benefit not found" });
        }

        const deletedBenefit = freeCourse.courseBenefits.splice(index, 1)[0];
        await freeCourse.save();

        res.status(200).json({ 
            success: true, 
            message: "Course benefit deleted successfully",
            data: { deletedBenefit }
        });
    } catch (e) {
        next(e);
    }
}; 