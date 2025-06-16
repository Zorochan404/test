import AboutUsContent from "../models/aboutUsContent.js";

export const createOrUpdateContent = async (req, res, next) => {
    try {
        const { sectionType } = req.body;
        
        // Check if content with this section type already exists
        const existingContent = await AboutUsContent.findOne({ sectionType });
        
        if (existingContent) {
            // Update existing content
            const updatedContent = await AboutUsContent.findByIdAndUpdate(
                existingContent._id,
                { ...req.body },
                { new: true, runValidators: true }
            );
            res.status(200).json({ success: true, data: updatedContent });
        } else {
            // Create new content
            const newContent = await AboutUsContent.create({ ...req.body });
            res.status(201).json({ success: true, data: newContent });
        }
    } catch (e) {
        next(e);
    }
};

export const getContentSections = async (req, res, next) => {
    try {
        const contentSections = await AboutUsContent.find().sort({ order: 1 });

        res.status(200).json({ success: true, data: contentSections });
    } catch (e) {
        next(e);
    }
};

export const getContentByType = async (req, res, next) => {
    try {
        const { sectionType } = req.params;
        const content = await AboutUsContent.findOne({ sectionType });

        if (!content) {
            return res.status(404).json({ success: false, message: "Content section not found" });
        }

        res.status(200).json({ success: true, data: content });
    } catch (e) {
        next(e);
    }
};

export const getContentById = async (req, res, next) => {
    try {
        const content = await AboutUsContent.findById(req.params.id);

        if (!content) {
            return res.status(404).json({ success: false, message: "Content section not found" });
        }

        res.status(200).json({ success: true, data: content });
    } catch (e) {
        next(e);
    }
};

export const updateContentById = async (req, res, next) => {
    try {
        const content = await AboutUsContent.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!content) {
            return res.status(404).json({ success: false, message: "Content section not found" });
        }

        res.status(200).json({ success: true, data: content });
    } catch (e) {
        next(e);
    }
};

export const deleteContentById = async (req, res, next) => {
    try {
        const content = await AboutUsContent.findByIdAndDelete(req.params.id);

        if (!content) {
            return res.status(404).json({ success: false, message: "Content section not found" });
        }

        res.status(200).json({ success: true, message: "Content section deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get active content sections only
export const getActiveContentSections = async (req, res, next) => {
    try {
        const contentSections = await AboutUsContent.find({ 
            isActive: true 
        }).sort({ order: 1 });

        res.status(200).json({ success: true, data: contentSections });
    } catch (e) {
        next(e);
    }
};

// Toggle active status
export const toggleContentStatus = async (req, res, next) => {
    try {
        const content = await AboutUsContent.findById(req.params.id);

        if (!content) {
            return res.status(404).json({ success: false, message: "Content section not found" });
        }

        content.isActive = !content.isActive;
        await content.save();

        res.status(200).json({ 
            success: true, 
            data: content,
            message: `Content section ${content.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};
