import {Router} from 'express';
import {
    createBlog,
    deleteBlogById,
    getBlogById,
    getBlogs,
    getAllBlogs,
    updateBlogById,
    getBlogBySlug,
    getBlogsByCategory,
    getPublishedBlogs,
    getPopularBlogs,
    toggleBlogPublishStatus
} from '../controllers/blogcontroller.js';

const BlogRouter = Router();

BlogRouter.post('/addblog', createBlog)

BlogRouter.get('/getblogs', getBlogs)

BlogRouter.get('/getallblogs', getAllBlogs)

BlogRouter.get('/getpublishedblogs', getPublishedBlogs)

BlogRouter.get('/getpopularblogs', getPopularBlogs)

BlogRouter.get('/getblogbyid/:id', getBlogById)

BlogRouter.get('/getblogbyslug/:slug', getBlogBySlug)

BlogRouter.get('/getblogsbycategory/:category', getBlogsByCategory)

BlogRouter.put('/updateblog/:id', updateBlogById)

BlogRouter.put('/toggleblogpublishstatus/:id', toggleBlogPublishStatus)

BlogRouter.delete('/deleteblog/:id', deleteBlogById)

export default BlogRouter;


