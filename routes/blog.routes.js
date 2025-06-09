import {Router} from 'express';
import { createBlog, deleteBlogById, getBlogById, getBlogs, updateBlogById } from '../controllers/blogcontroller.js';

const BlogRouter = Router();

BlogRouter.post('/addblog', createBlog)

BlogRouter.get('/getblogs', getBlogs)

BlogRouter.put('/updateblog/:id', updateBlogById)

BlogRouter.get('/getblogbyid/:id', getBlogById)


BlogRouter.delete('/deleteblog/:id', deleteBlogById)


export default BlogRouter;


