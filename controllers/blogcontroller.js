import Blog from "../models/blog.js";

export const createBlog = async (req, res, next) => {
    try {
        const newBlog = await Blog.create({ ...req.body });

        res.status(201).json({ success: true, data: newBlog });
    } catch (e) {
        next(e);
    }
};

export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

export const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (e) {
        next(e);
    }
};

export const getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Increment view count
        blog.views += 1;
        await blog.save();

        res.status(200).json({ success: true, data: blog });
    } catch (e) {
        next(e);
    }
};

export const getBlogsByCategory = async (req, res, next) => {
    try {
        const blogs = await Blog.find({
            category: req.params.category,
            status: 'published'
        }).sort({ publishedAt: -1, createdAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

export const getPublishedBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

export const getPopularBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ status: 'published' })
            .sort({ views: -1 })
            .limit(10);

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

export const updateBlogById = async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: updatedBlog });
    } catch (e) {
        next(e);
    }
};

export const deleteBlogById = async (req, res, next) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (e) {
        next(e);
    }
};

export const toggleBlogPublishStatus = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Toggle between draft and published
        if (blog.status === 'published') {
            blog.status = 'draft';
        } else if (blog.status === 'draft') {
            blog.status = 'published';
        }

        await blog.save();

        res.status(200).json({
            success: true,
            data: blog,
            message: `Blog ${blog.status === 'published' ? 'published' : 'saved as draft'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Get draft blogs
export const getDraftBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ status: 'draft' }).sort({ updatedAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

// Get blogs by status
export const getBlogsByStatus = async (req, res, next) => {
    try {
        const { status } = req.params;

        if (!['draft', 'published', 'archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be one of: draft, published, archived"
            });
        }

        const blogs = await Blog.find({ status }).sort({ updatedAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (e) {
        next(e);
    }
};

// Publish a draft blog
export const publishBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { status: 'published' },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({
            success: true,
            data: blog,
            message: "Blog published successfully"
        });
    } catch (e) {
        next(e);
    }
};

// Save blog as draft
export const saveBlogAsDraft = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { status: 'draft' },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({
            success: true,
            data: blog,
            message: "Blog saved as draft successfully"
        });
    } catch (e) {
        next(e);
    }
};

// Archive a blog
export const archiveBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { status: 'archived' },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({
            success: true,
            data: blog,
            message: "Blog archived successfully"
        });
    } catch (e) {
        next(e);
    }
};
