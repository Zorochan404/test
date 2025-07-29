import { Router } from 'express';
import { 
    createStatistic,
    getStatistics,
    getStatisticById,
    updateStatisticById,
    deleteStatisticById,
    getActiveStatistics,
    toggleStatisticStatus,
    reorderStatistics
} from '../../controllers/webdata/aboutUsStatisticController.js';

const AboutUsStatisticRouter = Router();

// Create new statistic
AboutUsStatisticRouter.post('/addstatistic', createStatistic);

// Get all statistics
AboutUsStatisticRouter.get('/getstatistics', getStatistics);

// Get active statistics only
AboutUsStatisticRouter.get('/getactivestatistics', getActiveStatistics);

// Get statistic by ID
AboutUsStatisticRouter.get('/getstatistic/:id', getStatisticById);

// Update statistic
AboutUsStatisticRouter.put('/updatestatistic/:id', updateStatisticById);

// Toggle statistic status
AboutUsStatisticRouter.put('/togglestatisticstatus/:id', toggleStatisticStatus);

// Reorder statistics
AboutUsStatisticRouter.put('/reorderstatistics', reorderStatistics);

// Delete statistic
AboutUsStatisticRouter.delete('/deletestatistic/:id', deleteStatisticById);

export default AboutUsStatisticRouter;
