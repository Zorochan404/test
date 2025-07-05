import { Router } from 'express';
import {
    createNews,
    getNews,
    getNewsById,
    updateNews,
    deleteNews,
    getNewsByType,
    getNewsBySubType,
    getNewsByTags,
    getNewsByDateRange,
    getLatestNews,
    getNewsTypes,
    getNewsSubTypes,
    getNewsTags,
    searchNews,
    bulkCreateNews,
    updateNewsImage,
    toggleNewsStatus,
    getActiveNews,
    getInactiveNews,
    getNewsStats
} from '../controllers/newsController.js';

const NewsRouter = Router();

// Basic CRUD operations
NewsRouter.post('/create', createNews);
NewsRouter.get('/all', getNews);
NewsRouter.get('/:id', getNewsById);
NewsRouter.put('/:id', updateNews);
NewsRouter.delete('/:id', deleteNews);

// Filtering and search
NewsRouter.get('/type/:type', getNewsByType);
NewsRouter.get('/subtype/:subType', getNewsBySubType);
NewsRouter.get('/tags/:tags', getNewsByTags);
NewsRouter.get('/date-range', getNewsByDateRange);
NewsRouter.get('/search', searchNews);

// Utility endpoints
NewsRouter.get('/latest', getLatestNews);
NewsRouter.get('/active', getActiveNews);
NewsRouter.get('/inactive', getInactiveNews);
NewsRouter.get('/types/all', getNewsTypes);
NewsRouter.get('/subtypes/all', getNewsSubTypes);
NewsRouter.get('/tags/all', getNewsTags);
NewsRouter.get('/stats/overview', getNewsStats);

// Bulk operations
NewsRouter.post('/bulk/create', bulkCreateNews);

// Image management
NewsRouter.put('/:id/image', updateNewsImage);

// Status management
NewsRouter.put('/:id/toggle-status', toggleNewsStatus);

export default NewsRouter; 