import { Router } from "express"
import { deleteBlog, getBlog, getBlogs, postBlog, updateBlog } from "../controllers/blog";

const router = Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.delete('/:id', deleteBlog);
router.post('/', postBlog);
router.put('/:id', updateBlog);



export default router;