import Download from "../../models/webdata/download.js";

export const createDownload = async (req, res, next) => {
    try {
        const newDownload = await Download.create({ ...req.body });

        res.status(201).json({ success: true, data: newDownload });
    } catch (e) {
        next(e);
    }
};

export const getDownloads = async (req, res, next) => {
    try {
        const downloads = await Download.find().sort({ uploadDate: -1 });

        res.status(200).json({ success: true, data: downloads });
    } catch (e) {
        next(e);
    }
};

export const getDownloadById = async (req, res, next) => {
    try {
        const download = await Download.findById(req.params.id);

        if (!download) {
            return res.status(404).json({ success: false, message: "Download not found" });
        }

        res.status(200).json({ success: true, data: download });
    } catch (e) {
        next(e);
    }
};

export const updateDownloadById = async (req, res, next) => {
    try {
        const download = await Download.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!download) {
            return res.status(404).json({ success: false, message: "Download not found" });
        }

        res.status(200).json({ success: true, data: download });
    } catch (e) {
        next(e);
    }
};

export const deleteDownloadById = async (req, res, next) => {
    try {
        const download = await Download.findByIdAndDelete(req.params.id);

        if (!download) {
            return res.status(404).json({ success: false, message: "Download not found" });
        }

        res.status(200).json({ success: true, message: "Download deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get downloads by category
export const getDownloadsByCategory = async (req, res, next) => {
    try {
        const downloads = await Download.find({ 
            category: req.params.category 
        }).sort({ uploadDate: -1 });

        res.status(200).json({ success: true, data: downloads });
    } catch (e) {
        next(e);
    }
};

// Get active downloads only
export const getActiveDownloads = async (req, res, next) => {
    try {
        const downloads = await Download.find({ 
            isActive: true 
        }).sort({ uploadDate: -1 });

        res.status(200).json({ success: true, data: downloads });
    } catch (e) {
        next(e);
    }
};

// Get popular downloads (most downloaded)
export const getPopularDownloads = async (req, res, next) => {
    try {
        const downloads = await Download.find({ 
            isActive: true 
        }).sort({ downloadCount: -1 }).limit(10);

        res.status(200).json({ success: true, data: downloads });
    } catch (e) {
        next(e);
    }
};

// Increment download count
export const incrementDownloadCount = async (req, res, next) => {
    try {
        const download = await Download.findByIdAndUpdate(
            req.params.id,
            { $inc: { downloadCount: 1 } },
            { new: true, runValidators: true }
        );

        if (!download) {
            return res.status(404).json({ success: false, message: "Download not found" });
        }

        res.status(200).json({ 
            success: true, 
            data: download,
            message: "Download count incremented successfully"
        });
    } catch (e) {
        next(e);
    }
};

// Toggle active status
export const toggleDownloadStatus = async (req, res, next) => {
    try {
        const download = await Download.findById(req.params.id);

        if (!download) {
            return res.status(404).json({ success: false, message: "Download not found" });
        }

        download.isActive = !download.isActive;
        await download.save();

        res.status(200).json({ 
            success: true, 
            data: download,
            message: `Download ${download.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Get recent downloads
export const getRecentDownloads = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const downloads = await Download.find({ 
            isActive: true 
        }).sort({ uploadDate: -1 }).limit(limit);

        res.status(200).json({ success: true, data: downloads });
    } catch (e) {
        next(e);
    }
};
