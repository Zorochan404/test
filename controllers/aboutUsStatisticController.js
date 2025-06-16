import AboutUsStatistic from "../models/aboutUsStatistic.js";

export const createStatistic = async (req, res, next) => {
    try {
        const newStatistic = await AboutUsStatistic.create({ ...req.body });

        res.status(201).json({ success: true, data: newStatistic });
    } catch (e) {
        next(e);
    }
};

export const getStatistics = async (req, res, next) => {
    try {
        const statistics = await AboutUsStatistic.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: statistics });
    } catch (e) {
        next(e);
    }
};

export const getStatisticById = async (req, res, next) => {
    try {
        const statistic = await AboutUsStatistic.findById(req.params.id);

        if (!statistic) {
            return res.status(404).json({ success: false, message: "Statistic not found" });
        }

        res.status(200).json({ success: true, data: statistic });
    } catch (e) {
        next(e);
    }
};

export const updateStatisticById = async (req, res, next) => {
    try {
        const statistic = await AboutUsStatistic.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!statistic) {
            return res.status(404).json({ success: false, message: "Statistic not found" });
        }

        res.status(200).json({ success: true, data: statistic });
    } catch (e) {
        next(e);
    }
};

export const deleteStatisticById = async (req, res, next) => {
    try {
        const statistic = await AboutUsStatistic.findByIdAndDelete(req.params.id);

        if (!statistic) {
            return res.status(404).json({ success: false, message: "Statistic not found" });
        }

        res.status(200).json({ success: true, message: "Statistic deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get active statistics only
export const getActiveStatistics = async (req, res, next) => {
    try {
        const statistics = await AboutUsStatistic.find({ 
            isActive: true 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: statistics });
    } catch (e) {
        next(e);
    }
};

// Toggle active status
export const toggleStatisticStatus = async (req, res, next) => {
    try {
        const statistic = await AboutUsStatistic.findById(req.params.id);

        if (!statistic) {
            return res.status(404).json({ success: false, message: "Statistic not found" });
        }

        statistic.isActive = !statistic.isActive;
        await statistic.save();

        res.status(200).json({ 
            success: true, 
            data: statistic,
            message: `Statistic ${statistic.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Reorder statistics
export const reorderStatistics = async (req, res, next) => {
    try {
        const { statisticOrders } = req.body; // Array of {id, order} objects

        if (!Array.isArray(statisticOrders)) {
            return res.status(400).json({ 
                success: false, 
                message: "statisticOrders must be an array of {id, order} objects" 
            });
        }

        const updatePromises = statisticOrders.map(({ id, order }) => 
            AboutUsStatistic.findByIdAndUpdate(id, { order }, { new: true })
        );

        const updatedStatistics = await Promise.all(updatePromises);

        res.status(200).json({ 
            success: true, 
            data: updatedStatistics,
            message: "Statistics reordered successfully"
        });
    } catch (e) {
        next(e);
    }
};
