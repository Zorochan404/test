import { Router } from 'express';
import { 
    createOrUpdateContent,
    getContentSections,
    getContentByType,
    getContentById,
    updateContentById,
    deleteContentById,
    getActiveContentSections,
    toggleContentStatus
} from '../../controllers/webdata/aboutUsContentController.js';

const AboutUsContentRouter = Router();

// Create or update content section
AboutUsContentRouter.post('/addorupdatecontent', createOrUpdateContent);

// Get all content sections
AboutUsContentRouter.get('/getcontentsections', getContentSections);

// Get active content sections only
AboutUsContentRouter.get('/getactivecontentsections', getActiveContentSections);

// Get content by section type
AboutUsContentRouter.get('/getcontentbytype/:sectionType', getContentByType);

// Get content by ID
AboutUsContentRouter.get('/getcontent/:id', getContentById);

// Update content by ID
AboutUsContentRouter.put('/updatecontent/:id', updateContentById);

// Toggle content status
AboutUsContentRouter.put('/togglecontentstatus/:id', toggleContentStatus);

// Delete content
AboutUsContentRouter.delete('/deletecontent/:id', deleteContentById);

export default AboutUsContentRouter;
