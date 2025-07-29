import Mentor from "../../models/webdata/mentors.js";
import { validateObjectId } from "../../utils/validators.js";
import { ErrorMessages, createErrorResponse, createSuccessResponse, asyncHandler } from "../../utils/errorHandler.js";

// Create a new mentor
export const createMentor = asyncHandler(async (req, res) => {
    const newMentor = await Mentor.create(req.body);
    res.status(201).json(createSuccessResponse('Mentor created successfully', newMentor));
});

// Get all mentors
export const getMentors = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, role, tags } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } }
        ];
    }
    
    if (role) {
        filter.role = { $regex: role, $options: 'i' };
    }
    
    if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim());
        filter.tags = { $in: tagArray };
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination
    const mentors = await Mentor.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Mentor.countDocuments(filter);
    
    res.status(200).json(createSuccessResponse('Mentors retrieved successfully', {
        mentors,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalMentors: total,
            hasNextPage: skip + mentors.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get a single mentor by ID
export const getMentorById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const mentor = await Mentor.findById(id);
    if (!mentor) {
        return res.status(404).json(createErrorResponse(404, 'MENTOR', 'Mentor not found'));
    }
    
    res.status(200).json(createSuccessResponse('Mentor retrieved successfully', mentor));
});

// Update a mentor by ID
export const updateMentor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const updatedMentor = await Mentor.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );
    
    if (!updatedMentor) {
        return res.status(404).json(createErrorResponse(404, 'MENTOR', 'Mentor not found'));
    }
    
    res.status(200).json(createSuccessResponse('Mentor updated successfully', updatedMentor));
});

// Delete a mentor by ID
export const deleteMentor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const deletedMentor = await Mentor.findByIdAndDelete(id);
    if (!deletedMentor) {
        return res.status(404).json(createErrorResponse(404, 'MENTOR', 'Mentor not found'));
    }
    
    res.status(200).json(createSuccessResponse('Mentor deleted successfully', deletedMentor));
});

// Get mentors by role
export const getMentorsByRole = asyncHandler(async (req, res) => {
    const { role } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const mentors = await Mentor.find({ 
        role: { $regex: role, $options: 'i' } 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await Mentor.countDocuments({ 
        role: { $regex: role, $options: 'i' } 
    });
    
    res.status(200).json(createSuccessResponse('Mentors by role retrieved successfully', {
        mentors,
        role,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalMentors: total,
            hasNextPage: skip + mentors.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get mentors by tags
export const getMentorsByTags = asyncHandler(async (req, res) => {
    const { tags } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const tagArray = tags.split(',').map(tag => tag.trim());
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const mentors = await Mentor.find({ 
        tags: { $in: tagArray } 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await Mentor.countDocuments({ 
        tags: { $in: tagArray } 
    });
    
    res.status(200).json(createSuccessResponse('Mentors by tags retrieved successfully', {
        mentors,
        tags: tagArray,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalMentors: total,
            hasNextPage: skip + mentors.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get all unique roles
export const getMentorRoles = asyncHandler(async (req, res) => {
    const roles = await Mentor.distinct('role');
    res.status(200).json(createSuccessResponse('Mentor roles retrieved successfully', { roles }));
});

// Get all unique tags
export const getMentorTags = asyncHandler(async (req, res) => {
    const tags = await Mentor.distinct('tags');
    res.status(200).json(createSuccessResponse('Mentor tags retrieved successfully', { tags }));
});

// Search mentors
export const searchMentors = asyncHandler(async (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
        return res.status(400).json(createErrorResponse(400, 'SEARCH', 'Search query is required'));
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const mentors = await Mentor.find({
        $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { role: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
        ]
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await Mentor.countDocuments({
        $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { role: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
        ]
    });
    
    res.status(200).json(createSuccessResponse('Mentor search completed successfully', {
        mentors,
        searchQuery: q,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalMentors: total,
            hasNextPage: skip + mentors.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Bulk create mentors
export const bulkCreateMentors = asyncHandler(async (req, res) => {
    const { mentors } = req.body;
    
    if (!Array.isArray(mentors) || mentors.length === 0) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', 'Mentors array is required'));
    }
    
    const createdMentors = await Mentor.insertMany(mentors);
    
    res.status(201).json(createSuccessResponse('Mentors created successfully', {
        count: createdMentors.length,
        mentors: createdMentors
    }));
});

// Update mentor image
export const updateMentorImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { image } = req.body;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    if (!image) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', 'Image URL is required'));
    }
    
    const updatedMentor = await Mentor.findByIdAndUpdate(
        id,
        { image },
        { new: true, runValidators: true }
    );
    
    if (!updatedMentor) {
        return res.status(404).json(createErrorResponse(404, 'MENTOR', 'Mentor not found'));
    }
    
    res.status(200).json(createSuccessResponse('Mentor image updated successfully', updatedMentor));
});

// Get mentor statistics
export const getMentorStats = asyncHandler(async (req, res) => {
    const totalMentors = await Mentor.countDocuments();
    const roles = await Mentor.distinct('role');
    const tags = await Mentor.distinct('tags');
    
    // Get mentors count by role
    const mentorsByRole = await Mentor.aggregate([
        {
            $group: {
                _id: '$role',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);
    
    // Get most common tags
    const tagStats = await Mentor.aggregate([
        { $unwind: '$tags' },
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        { $limit: 10 }
    ]);
    
    res.status(200).json(createSuccessResponse('Mentor statistics retrieved successfully', {
        totalMentors,
        uniqueRoles: roles.length,
        uniqueTags: tags.length,
        mentorsByRole,
        topTags: tagStats
    }));
}); 