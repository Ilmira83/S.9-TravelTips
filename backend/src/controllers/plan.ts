import { Request, Response } from "express"
import Plan from "../models/plan"

export const getPlans = async (req:Request, res:Response) => {
  const listPlans = await Plan.findAll();
  res.json(listPlans)
}

export const getPlan = async (req:Request, res:Response) => {
  const {id} = req.params;
  const plan = await Plan.findByPk(id);

  if(plan){
    res.json(plan)
  } else {
    res.status(404).json({
    msg: `Plan with id ${id} doesn't exist`    
  })
  }
}

export const deletePlan = async (req:Request, res:Response) => {
  const {id} = req.params;
  const plan = await Plan.findByPk(id);

  if(plan){
    await plan.destroy();
    res.json({
      msg: `Plan with id ${id} deleted`
    })
  } else {
    res.status(404).json({
    msg: `Plan with id ${id} doesn't exist`    
  })
  }
}
export const postPlan = async (req:Request, res:Response) => {
  const {body} = req;

  try {
    const createdPlan = await Plan.create(body);
    res.status(201).json(createdPlan)
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }
  
}

export const updatePlan = async (req:Request, res:Response) => {
  const {body} = req;
  const {id} = req.params;

  const plan = await Plan.findByPk(id);

  try {
    if(plan) {
      await plan.update(body);
      res.json({
        msg: `Plan with id ${id} was updated`,
      });
    } else {
      res.status(404).json({
        msg: `Plan with id ${id} doesn't exist`
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }


}