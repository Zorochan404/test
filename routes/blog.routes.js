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
    toggleBlogPublishStatus,
    getDraftBlogs,
    getBlogsByStatus,
    publishBlog,
    saveBlogAsDraft,
    archiveBlog
} from '../controllers/blogcontroller.js';

const BlogRouter = Router();

BlogRouter.post('/addblog', createBlog)

BlogRouter.get('/getblogs', getBlogs)

BlogRouter.get('/getallblogs', getAllBlogs)

BlogRouter.get('/getpublishedblogs', getPublishedBlogs)

BlogRouter.get('/getpopularblogs', getPopularBlogs)

BlogRouter.get('/getdraftblogs', getDraftBlogs)

BlogRouter.get('/getblogsbystatus/:status', getBlogsByStatus)

BlogRouter.get('/getblogbyid/:id', getBlogById)

BlogRouter.get('/getblogbyslug/:slug', getBlogBySlug)

BlogRouter.get('/getblogsbycategory/:category', getBlogsByCategory)

BlogRouter.put('/updateblog/:id', updateBlogById)

BlogRouter.put('/toggleblogpublishstatus/:id', toggleBlogPublishStatus)

BlogRouter.put('/publishblog/:id', publishBlog)

BlogRouter.put('/saveblogasdraft/:id', saveBlogAsDraft)

BlogRouter.put('/archiveblog/:id', archiveBlog)

BlogRouter.delete('/deleteblog/:id', deleteBlogById)

export default BlogRouter;


