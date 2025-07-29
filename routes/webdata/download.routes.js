import {Router} from 'express';
import { 
    createDownload, 
    deleteDownloadById, 
    getDownloadById, 
    getDownloads, 
    updateDownloadById,
    getDownloadsByCategory,
    getActiveDownloads,
    getPopularDownloads,
    incrementDownloadCount,
    toggleDownloadStatus,
    getRecentDownloads
} from '../../controllers/webdata/downloadController.js';

const DownloadRouter = Router();

DownloadRouter.post('/adddownload', createDownload)

DownloadRouter.get('/getdownloads', getDownloads)

DownloadRouter.get('/getdownloadbyid/:id', getDownloadById)

DownloadRouter.get('/getdownloadsbycategory/:category', getDownloadsByCategory)

DownloadRouter.get('/getactivedownloads', getActiveDownloads)

DownloadRouter.get('/getpopulardownloads', getPopularDownloads)

DownloadRouter.get('/getrecentdownloads', getRecentDownloads)

DownloadRouter.put('/updatedownload/:id', updateDownloadById)

DownloadRouter.put('/incrementdownloadcount/:id', incrementDownloadCount)

DownloadRouter.put('/toggledownloadstatus/:id', toggleDownloadStatus)

DownloadRouter.delete('/deletedownload/:id', deleteDownloadById)

export default DownloadRouter;
