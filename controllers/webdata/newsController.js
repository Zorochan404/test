import News from "../../models/webdata/news.js";
import { validateObjectId } from "../../utils/validators.js";
import { ErrorMessages, createErrorResponse, createSuccessResponse, asyncHandler } from "../../utils/errorHandler.js";

// Create a new news article
export const createNews = asyncHandler(async (req, res) => {
    const newNews = await News.create(req.body);
    res.status(201).json(createSuccessResponse('News article created successfully', newNews));
});

// Get all news articles
export const getNews = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, type, subType, tags, isActive, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { type: { $regex: search, $options: 'i' } },
            { subType: { $regex: search, $options: 'i' } }
        ];
    }
    
    if (type) {
        filter.type = { $regex: type, $options: 'i' };
    }
    
    if (subType) {
        filter.subType = { $regex: subType, $options: 'i' };
    }
    
    if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim());
        filter.tags = { $in: tagArray };
    }
    
    // Filter by isActive status
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination
    const news = await News.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await News.countDocuments(filter);
    
    res.status(200).json(createSuccessResponse('News articles retrieved successfully', {
        news,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get a single news article by ID
export const getNewsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const newsArticle = await News.findById(id);
    if (!newsArticle) {
        return res.status(404).json(createErrorResponse(404, 'NEWS', 'News article not found'));
    }
    
    res.status(200).json(createSuccessResponse('News article retrieved successfully', newsArticle));
});

// Update a news article by ID
export const updateNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const updatedNews = await News.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );
    
    if (!updatedNews) {
        return res.status(404).json(createErrorResponse(404, 'NEWS', 'News article not found'));
    }
    
    res.status(200).json(createSuccessResponse('News article updated successfully', updatedNews));
});

// Delete a news article by ID
export const deleteNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
        return res.status(404).json(createErrorResponse(404, 'NEWS', 'News article not found'));
    }
    
    res.status(200).json(createSuccessResponse('News article deleted successfully', deletedNews));
});

// Get news by type
export const getNewsByType = asyncHandler(async (req, res) => {
    const { type } = req.params;
    const { page = 1, limit = 10, isActive, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    const filter = { type: { $regex: type, $options: 'i' } };
    
    // Filter by isActive status
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await News.countDocuments(filter);
    
    res.status(200).json(createSuccessResponse('News by type retrieved successfully', {
        news,
        type,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get news by subType
export const getNewsBySubType = asyncHandler(async (req, res) => {
    const { subType } = req.params;
    const { page = 1, limit = 10, isActive, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    const filter = { subType: { $regex: subType, $options: 'i' } };
    
    // Filter by isActive status
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await News.countDocuments(filter);
    
    res.status(200).json(createSuccessResponse('News by subType retrieved successfully', {
        news,
        subType,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get news by tags
export const getNewsByTags = asyncHandler(async (req, res) => {
    const { tags } = req.params;
    const { page = 1, limit = 10, isActive, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    const tagArray = tags.split(',').map(tag => tag.trim());
    const filter = { tags: { $in: tagArray } };
    
    // Filter by isActive status
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await News.countDocuments(filter);
    
    res.status(200).json(createSuccessResponse('News by tags retrieved successfully', {
        news,
        tags: tagArray,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get news by date range
export const getNewsByDateRange = asyncHandler(async (req, res) => {
    const { startDate, endDate, isActive } = req.query;
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    if (!startDate || !endDate) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', 'Start date and end date are required'));
    }
    
    const filter = {
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    };
    
    // Filter by isActive status
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
    
    const total = await News.countDocuments(filter);
    
    res.status(200).json(createSuccessResponse('News by date range retrieved successfully', {
        news,
        dateRange: { startDate, endDate },
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get latest news
export const getLatestNews = asyncHandler(async (req, res) => {
    const { limit = 5, isActive } = req.query;
    
    const filter = {};
    
    // Filter by isActive status
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }
    
    const latestNews = await News.find(filter)
        .sort({ date: -1, createdAt: -1 })
        .limit(parseInt(limit));
    
    res.status(200).json(createSuccessResponse('Latest news retrieved successfully', {
        news: latestNews,
        count: latestNews.length
    }));
});

// Get all unique types
export const getNewsTypes = asyncHandler(async (req, res) => {
    const types = await News.distinct('type');
    res.status(200).json(createSuccessResponse('News types retrieved successfully', { types }));
});

// Get all unique subTypes
export const getNewsSubTypes = asyncHandler(async (req, res) => {
    const subTypes = await News.distinct('subType');
    res.status(200).json(createSuccessResponse('News subTypes retrieved successfully', { subTypes }));
});

// Get all unique tags
export const getNewsTags = asyncHandler(async (req, res) => {
    const tags = await News.distinct('tags');
    res.status(200).json(createSuccessResponse('News tags retrieved successfully', { tags }));
});

// Search news
export const searchNews = asyncHandler(async (req, res) => {
    const { q, page = 1, limit = 10, isActive, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    if (!q) {
        return res.status(400).json(createErrorResponse(400, 'SEARCH', 'Search query is required'));
    }
    
    const searchFilter = {
        $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { type: { $regex: q, $options: 'i' } },
            { subType: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
        ]
    };
    
    // Filter by isActive status
    if (isActive !== undefined) {
        searchFilter.isActive = isActive === 'true';
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find(searchFilter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await News.countDocuments(searchFilter);
    
    res.status(200).json(createSuccessResponse('News search completed successfully', {
        news,
        searchQuery: q,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Bulk create news
export const bulkCreateNews = asyncHandler(async (req, res) => {
    const { news } = req.body;
    
    if (!Array.isArray(news) || news.length === 0) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', 'News array is required'));
    }
    
    const createdNews = await News.insertMany(news);
    
    res.status(201).json(createSuccessResponse('News articles created successfully', {
        count: createdNews.length,
        news: createdNews
    }));
});

// Update news image
export const updateNewsImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { image } = req.body;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    if (!image) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', 'Image URL is required'));
    }
    
    const updatedNews = await News.findByIdAndUpdate(
        id,
        { image },
        { new: true, runValidators: true }
    );
    
    if (!updatedNews) {
        return res.status(404).json(createErrorResponse(404, 'NEWS', 'News article not found'));
    }
    
    res.status(200).json(createSuccessResponse('News image updated successfully', updatedNews));
});

// Toggle news active status
export const toggleNewsStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!validateObjectId(id)) {
        return res.status(400).json(createErrorResponse(400, 'VALIDATION', ErrorMessages.VALIDATION.INVALID_ID));
    }
    
    const newsArticle = await News.findById(id);
    if (!newsArticle) {
        return res.status(404).json(createErrorResponse(404, 'NEWS', 'News article not found'));
    }
    
    const updatedNews = await News.findByIdAndUpdate(
        id,
        { isActive: !newsArticle.isActive },
        { new: true, runValidators: true }
    );
    
    res.status(200).json(createSuccessResponse(`News article ${updatedNews.isActive ? 'activated' : 'deactivated'} successfully`, updatedNews));
});

// Get active news articles
export const getActiveNews = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find({ isActive: true })
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
    
    const total = await News.countDocuments({ isActive: true });
    
    res.status(200).json(createSuccessResponse('Active news articles retrieved successfully', {
        news,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get inactive news articles
export const getInactiveNews = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const news = await News.find({ isActive: false })
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
    
    const total = await News.countDocuments({ isActive: false });
    
    res.status(200).json(createSuccessResponse('Inactive news articles retrieved successfully', {
        news,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalNews: total,
            hasNextPage: skip + news.length < total,
            hasPrevPage: parseInt(page) > 1
        }
    }));
});

// Get news statistics
export const getNewsStats = asyncHandler(async (req, res) => {
    const totalNews = await News.countDocuments();
    const activeNews = await News.countDocuments({ isActive: true });
    const inactiveNews = await News.countDocuments({ isActive: false });
    const types = await News.distinct('type');
    const subTypes = await News.distinct('subType');
    const tags = await News.distinct('tags');
    
    // Get news count by type
    const newsByType = await News.aggregate([
        {
            $group: {
                _id: '$type',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);
    
    // Get news count by subType
    const newsBySubType = await News.aggregate([
        {
            $group: {
                _id: '$subType',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);
    
    // Get most common tags
    const tagStats = await News.aggregate([
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
    
    // Get news count by month (last 12 months)
    const newsByMonth = await News.aggregate([
        {
            $match: {
                date: {
                    $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { '_id.year': -1, '_id.month': -1 }
        },
        { $limit: 12 }
    ]);
    
    // Get news count by active status
    const newsByStatus = await News.aggregate([
        {
            $group: {
                _id: '$isActive',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: -1 }
        }
    ]);
    
    res.status(200).json(createSuccessResponse('News statistics retrieved successfully', {
        totalNews,
        activeNews,
        inactiveNews,
        uniqueTypes: types.length,
        uniqueSubTypes: subTypes.length,
        uniqueTags: tags.length,
        newsByType,
        newsBySubType,
        topTags: tagStats,
        newsByMonth,
        newsByStatus
    }));
}); 