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
        const blogs = await Blog.find();

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
