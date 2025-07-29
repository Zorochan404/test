import AboutUsCoreValue from "../../models/webdata/aboutUsCoreValue.js";

export const createCoreValue = async (req, res, next) => {
    try {
        const newCoreValue = await AboutUsCoreValue.create({ ...req.body });

        res.status(201).json({ success: true, data: newCoreValue });
    } catch (e) {
        next(e);
    }
};

export const getCoreValues = async (req, res, next) => {
    try {
        const coreValues = await AboutUsCoreValue.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: coreValues });
    } catch (e) {
        next(e);
    }
};

export const getCoreValueById = async (req, res, next) => {
    try {
        const coreValue = await AboutUsCoreValue.findById(req.params.id);

        if (!coreValue) {
            return res.status(404).json({ success: false, message: "Core value not found" });
        }

        res.status(200).json({ success: true, data: coreValue });
    } catch (e) {
        next(e);
    }
};

export const updateCoreValueById = async (req, res, next) => {
    try {
        const coreValue = await AboutUsCoreValue.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!coreValue) {
            return res.status(404).json({ success: false, message: "Core value not found" });
        }

        res.status(200).json({ success: true, data: coreValue });
    } catch (e) {
        next(e);
    }
};

export const deleteCoreValueById = async (req, res, next) => {
    try {
        const coreValue = await AboutUsCoreValue.findByIdAndDelete(req.params.id);

        if (!coreValue) {
            return res.status(404).json({ success: false, message: "Core value not found" });
        }

        res.status(200).json({ success: true, message: "Core value deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get active core values only
export const getActiveCoreValues = async (req, res, next) => {
    try {
        const coreValues = await AboutUsCoreValue.find({ 
            isActive: true 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: coreValues });
    } catch (e) {
        next(e);
    }
};

// Toggle active status
export const toggleCoreValueStatus = async (req, res, next) => {
    try {
        const coreValue = await AboutUsCoreValue.findById(req.params.id);

        if (!coreValue) {
            return res.status(404).json({ success: false, message: "Core value not found" });
        }

        coreValue.isActive = !coreValue.isActive;
        await coreValue.save();

        res.status(200).json({ 
            success: true, 
            data: coreValue,
            message: `Core value ${coreValue.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Reorder core values
export const reorderCoreValues = async (req, res, next) => {
    try {
        const { coreValueOrders } = req.body; // Array of {id, order} objects

        if (!Array.isArray(coreValueOrders)) {
            return res.status(400).json({ 
                success: false, 
                message: "coreValueOrders must be an array of {id, order} objects" 
            });
        }

        const updatePromises = coreValueOrders.map(({ id, order }) => 
            AboutUsCoreValue.findByIdAndUpdate(id, { order }, { new: true })
        );

        const updatedCoreValues = await Promise.all(updatePromises);

        res.status(200).json({ 
            success: true, 
            data: updatedCoreValues,
            message: "Core values reordered successfully"
        });
    } catch (e) {
        next(e);
    }
};
