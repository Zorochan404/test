import CareerPost from "../models/careerPost.js";

export const createCareerPost = async (req, res, next) => {
    try {
        const newCareerPost = await CareerPost.create({ ...req.body });

        res.status(201).json({ success: true, data: newCareerPost });
    } catch (e) {
        next(e);
    }
};

export const getCareerPosts = async (req, res, next) => {
    try {
        const careerPosts = await CareerPost.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

export const getAllCareerPosts = async (req, res, next) => {
    try {
        const careerPosts = await CareerPost.find().sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

export const getCareerPostById = async (req, res, next) => {
    try {
        const careerPost = await CareerPost.findById(req.params.id);

        if (!careerPost) {
            return res.status(404).json({ success: false, message: "Career post not found" });
        }

        res.status(200).json({ success: true, data: careerPost });
    } catch (e) {
        next(e);
    }
};

export const getActiveCareerPosts = async (req, res, next) => {
    try {
        const careerPosts = await CareerPost.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

export const getInactiveCareerPosts = async (req, res, next) => {
    try {
        const careerPosts = await CareerPost.find({ isActive: false }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

export const getCareerPostsByType = async (req, res, next) => {
    try {
        const { type } = req.params; // 'fulltime' or 'parttime'
        
        if (!['fulltime', 'parttime'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid type. Must be 'fulltime' or 'parttime'"
            });
        }

        const isPartTime = type === 'parttime';
        const careerPosts = await CareerPost.find({ 
            partTime: isPartTime,
            isActive: true 
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

export const getCareerPostsByPlace = async (req, res, next) => {
    try {
        const { place } = req.params;
        
        const careerPosts = await CareerPost.find({ 
            place: { $regex: place, $options: 'i' },
            isActive: true 
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

export const updateCareerPostById = async (req, res, next) => {
    try {
        const updatedCareerPost = await CareerPost.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCareerPost) {
            return res.status(404).json({ success: false, message: "Career post not found" });
        }

        res.status(200).json({ success: true, data: updatedCareerPost });
    } catch (e) {
        next(e);
    }
};

export const deleteCareerPostById = async (req, res, next) => {
    try {
        const deletedCareerPost = await CareerPost.findByIdAndDelete(req.params.id);

        if (!deletedCareerPost) {
            return res.status(404).json({ success: false, message: "Career post not found" });
        }

        res.status(200).json({ success: true, message: "Career post deleted successfully" });
    } catch (e) {
        next(e);
    }
};

export const toggleCareerPostStatus = async (req, res, next) => {
    try {
        const careerPost = await CareerPost.findById(req.params.id);

        if (!careerPost) {
            return res.status(404).json({ success: false, message: "Career post not found" });
        }

        careerPost.isActive = !careerPost.isActive;
        await careerPost.save();

        res.status(200).json({
            success: true,
            data: careerPost,
            message: `Career post ${careerPost.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

export const activateCareerPost = async (req, res, next) => {
    try {
        const careerPost = await CareerPost.findByIdAndUpdate(
            req.params.id,
            { isActive: true },
            { new: true, runValidators: true }
        );

        if (!careerPost) {
            return res.status(404).json({ success: false, message: "Career post not found" });
        }

        res.status(200).json({
            success: true,
            data: careerPost,
            message: "Career post activated successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const deactivateCareerPost = async (req, res, next) => {
    try {
        const careerPost = await CareerPost.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true, runValidators: true }
        );

        if (!careerPost) {
            return res.status(404).json({ success: false, message: "Career post not found" });
        }

        res.status(200).json({
            success: true,
            data: careerPost,
            message: "Career post deactivated successfully"
        });
    } catch (e) {
        next(e);
    }
};

export const searchCareerPosts = async (req, res, next) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const careerPosts = await CareerPost.find({
            $and: [
                { isActive: true },
                {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { place: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } }
                    ]
                }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: careerPosts });
    } catch (e) {
        next(e);
    }
};

// Applicant-related functions

export const applyToCareerPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const applicantData = req.body;

        // Check if career post exists and is active
        const careerPost = await CareerPost.findById(id);
        
        if (!careerPost) {
            return res.status(404).json({ 
                success: false, 
                message: "Career post not found" 
            });
        }

        if (!careerPost.isActive) {
            return res.status(400).json({ 
                success: false, 
                message: "This career post is not currently accepting applications" 
            });
        }

        // Check if applicant already applied (by email)
        const existingApplicant = careerPost.applicants.find(
            applicant => applicant.email === applicantData.email
        );

        if (existingApplicant) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already applied to this position" 
            });
        }

        // Add applicant to the career post
        careerPost.applicants.push(applicantData);
        await careerPost.save();

        res.status(201).json({ 
            success: true, 
            message: "Application submitted successfully",
            data: careerPost.applicants[careerPost.applicants.length - 1]
        });
    } catch (e) {
        next(e);
    }
};

export const getApplicantsForCareerPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const careerPost = await CareerPost.findById(id).select('title applicants');

        if (!careerPost) {
            return res.status(404).json({ 
                success: false, 
                message: "Career post not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: {
                careerPostTitle: careerPost.title,
                applicants: careerPost.applicants,
                totalApplicants: careerPost.applicants.length
            }
        });
    } catch (e) {
        next(e);
    }
};

export const getAllApplicants = async (req, res, next) => {
    try {
        const careerPosts = await CareerPost.find({ 
            'applicants.0': { $exists: true } 
        }).select('title applicants');

        const allApplicants = careerPosts.map(post => ({
            careerPostId: post._id,
            careerPostTitle: post.title,
            applicants: post.applicants,
            totalApplicants: post.applicants.length
        }));

        const totalApplicants = allApplicants.reduce((sum, post) => sum + post.totalApplicants, 0);

        res.status(200).json({ 
            success: true, 
            data: {
                careerPosts: allApplicants,
                totalCareerPosts: allApplicants.length,
                totalApplicants: totalApplicants
            }
        });
    } catch (e) {
        next(e);
    }
};

export const removeApplicantFromCareerPost = async (req, res, next) => {
    try {
        const { id, applicantId } = req.params;

        const careerPost = await CareerPost.findById(id);

        if (!careerPost) {
            return res.status(404).json({ 
                success: false, 
                message: "Career post not found" 
            });
        }

        // Find and remove the applicant
        const applicantIndex = careerPost.applicants.findIndex(
            applicant => applicant._id.toString() === applicantId
        );

        if (applicantIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: "Applicant not found" 
            });
        }

        const removedApplicant = careerPost.applicants.splice(applicantIndex, 1)[0];
        await careerPost.save();

        res.status(200).json({ 
            success: true, 
            message: "Applicant removed successfully",
            data: removedApplicant
        });
    } catch (e) {
        next(e);
    }
};

export const updateApplicantStatus = async (req, res, next) => {
    try {
        const { id, applicantId } = req.params;
        const { status } = req.body;

        if (!status || !['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be one of: pending, reviewed, shortlisted, rejected, hired"
            });
        }

        const careerPost = await CareerPost.findById(id);

        if (!careerPost) {
            return res.status(404).json({ 
                success: false, 
                message: "Career post not found" 
            });
        }

        const applicant = careerPost.applicants.id(applicantId);

        if (!applicant) {
            return res.status(404).json({ 
                success: false, 
                message: "Applicant not found" 
            });
        }

        applicant.status = status;
        await careerPost.save();

        res.status(200).json({ 
            success: true, 
            message: "Applicant status updated successfully",
            data: applicant
        });
    } catch (e) {
        next(e);
    }
};

export const getApplicantsByStatus = async (req, res, next) => {
    try {
        const { status } = req.params;

        if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be one of: pending, reviewed, shortlisted, rejected, hired"
            });
        }

        const careerPosts = await CareerPost.find({
            'applicants.status': status
        }).select('title applicants');

        const filteredApplicants = careerPosts.map(post => ({
            careerPostId: post._id,
            careerPostTitle: post.title,
            applicants: post.applicants.filter(applicant => applicant.status === status)
        }));

        const totalApplicants = filteredApplicants.reduce((sum, post) => sum + post.applicants.length, 0);

        res.status(200).json({ 
            success: true, 
            data: {
                status: status,
                careerPosts: filteredApplicants,
                totalApplicants: totalApplicants
            }
        });
    } catch (e) {
        next(e);
    }
}; 