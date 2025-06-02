import { Request, Response } from "express"
import User from "../models/user"

export const getUsers = async (req:Request, res:Response) => {
  const listUsers = await User.findAll();
  res.json(listUsers)
}

export const getUser = async (req:Request, res:Response) => {
  const {id} = req.params;
  const user = await User.findByPk(id);

  if(user){
    res.json(user)
  } else {
    res.status(404).json({
    msg: `User with id ${id} doesn't exist`    
  })
  }
}

export const deleteUser = async (req:Request, res:Response) => {
  const {id} = req.params;
  const user = await User.findByPk(id);

  if(user){
    await user.destroy();
    res.json({
      msg: `User with id ${id} deleted`
    })
  } else {
    res.status(404).json({
    msg: `User with id ${id} doesn't exist`    
  })
  }
}
export const postUser = async (req:Request, res:Response) => {
  const {body} = req;

  try {
    await User.create(body);
    res.json({
      msg: 'User was created',
      body
    })
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }
  
}

export const updateUser = async (req:Request, res:Response) => {
  const {body} = req;
  const {id} = req.params;

  const user = await User.findByPk(id);

  try {
    if(user) {
      await user.update(body);
      res.json({
        msg: `User with id ${id} was updated`,
      });
    } else {
      res.status(404).json({
        msg: `User with id ${id} doesn't exist`
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }


}