import { Request, Response } from "express"
import Blog from "../models/blog"

export const getBlogs = async (req:Request, res:Response) => {
  const listBlogs = await Blog.findAll();
  res.json(listBlogs)
}

export const getBlog = async (req:Request, res:Response) => {
  const {id} = req.params;
  const blog = await Blog.findByPk(id);

  if(blog){
    res.json(blog)
  } else {
    res.status(404).json({
    msg: `Blog with id ${id} doesn't exist`    
  })
  }
}

export const deleteBlog = async (req:Request, res:Response) => {
  const {id} = req.params;
  const blog = await Blog.findByPk(id);

  if(blog){
    await blog.destroy();
    res.json({
      msg: `Blog with id ${id} deleted`
    })
  } else {
    res.status(404).json({
    msg: `Blog with id ${id} doesn't exist`    
  })
  }
}
export const postBlog = async (req:Request, res:Response) => {
  const {body} = req;

  try {
    const createdBlog = await Blog.create(body);
    res.status(201).json(createdBlog)
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }
  
}

export const updateBlog = async (req:Request, res:Response) => {
  const {body} = req;
  const {id} = req.params;

  const blog = await Blog.findByPk(id);

  try {
    if(blog) {
      await blog.update(body);
      res.json({
        msg: `Blog with id ${id} was updated`,
      });
    } else {
      res.status(404).json({
        msg: `Blog with id ${id} doesn't exist`
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }


}