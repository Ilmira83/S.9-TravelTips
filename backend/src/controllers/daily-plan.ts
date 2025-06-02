import { Request, Response } from "express"
import DailyPlan from "../models/daily-plan"


export const getDailyPlans = async (req:Request, res:Response) => {
   const listDailyPlan = await DailyPlan.findAll();
  res.json(listDailyPlan)

}

export const getDailyPlan = async (req:Request, res:Response) => {
  const {id} = req.params;
  const dailyPlan = await DailyPlan.findByPk(id);

  if(dailyPlan){
    res.json(dailyPlan)
  } else {
    res.status(404).json({
    msg: `DailyPlan with id ${id} doesn't exist`    
  })
  }
}

export const deleteDailyPlan = async (req:Request, res:Response) => {
  const {id} = req.params;
  const dailyPlan = await DailyPlan.findByPk(id);

  if(dailyPlan){
    await dailyPlan.destroy();
    res.json({
      msg: `DailyPlan with id ${id} deleted`
    })
  } else {
    res.status(404).json({
    msg: `DailyPlan with id ${id} doesn't exist`    
  })
  }
}
export const postDailyPlan = async (req:Request, res:Response) => {
  const {body} = req;

  try {
      if (Array.isArray(body)) {
      await DailyPlan.bulkCreate(body);
      res.json({
        msg: 'Daily plans created successfully.',
        count: body.length
      });
    } else if (typeof body === 'object' && body !== null) {
      const created = await DailyPlan.create(body);
      res.json({
        msg: 'Single daily plan created successfully.',
        data: created
      });
    } else {
      res.status(400).json({
        msg: 'Invalid request body. Expected object or array.'
      });
    }

  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }  
}

export const updateDailyPlan = async (req:Request, res:Response) => {
  const {body} = req;
  const { planID } = req.params;
try {
   const creates = body.filter((plan: any) => plan.id === undefined);

      const createPromises = creates.map((plan: any) =>
      DailyPlan.create({
        ...plan,
        planID: parseInt(planID), 
      })
    );
  await Promise.all(createPromises);
    res.json({
      success: true,
      message: `Created ${creates.length} new notes`,
    });
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }

}

export const getDailyPlansByPlanID = async (req: Request, res: Response) => {
  const { planID } = req.params;

  try {
    const dailyPlans = await DailyPlan.findAll({
      where: { planID }
    });

    res.json(dailyPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch daily plans by planID' });
  }
}


export const getDailyPlansByBlogID = async (req: Request, res: Response) => {
  const { blogID } = req.params;

  try {
    const dailyPlans = await DailyPlan.findAll({
      where: { blogID }
    });

    res.json(dailyPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch daily plans by blogID' });
  }
}

/* export const updateDailyPlansByPlanID = async (req: Request, res: Response) => {
  const { planID } = req.params;
  const { body } = req;

  if (!Array.isArray(body)) {
    return res.status(400).json({ error: "Waiting for an array" });
  }

  try {
    const updates = body.filter((plan: any) => plan.id !== undefined);
    const creates = body.filter((plan: any) => plan.id === undefined);

    const updatePromises = updates.map((plan: any) =>
      DailyPlan.update(plan, {
        where: {
          id: plan.id,
          planID: planID,
        },
      })
    );

    const createPromises = creates.map((plan: any) =>
      DailyPlan.create({
        ...plan,
        planID: parseInt(planID), 
      })
    );

    const updateResults = await Promise.all(updatePromises);
    await Promise.all(createPromises);

    const updatedCount = updateResults.reduce((sum, [count]) => sum + count, 0);

    res.json({
      success: true,
      message: `Updated ${updatedCount} notes, created ${creates.length} new notes`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  } 
}; */

export const updateDailyPlansByPlanID = async (req: Request, res: Response) => {
  const { planID } = req.params;
  const { body } = req;

  if (!Array.isArray(body)) {
    return res.status(400).json({ error: "Waiting for an array" });
  }

  try {
    const updates = body.filter((plan: any) => plan.id !== undefined);
    const creates = body.filter((plan: any) => plan.id === undefined);

    const updatePromises = updates.map((plan: any) =>
      DailyPlan.update(plan, {
        where: {
          id: plan.id,
          planID: planID,
        },
      })
    );

    const createPromises = creates.map((plan: any) =>
      DailyPlan.create({
        ...plan,
        planID: parseInt(planID),
        blogID: null, // Явно указать null
      })
    );

    const updateResults = await Promise.all(updatePromises);
    await Promise.all(createPromises);

    res.json({
      success: true,
      message: `Updated`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateDailyPlansByBlogID = async (req: Request, res: Response) => {
  const { blogID } = req.params;
  const { body } = req;

  if (!Array.isArray(body)) {
    return res.status(400).json({ error: "Waiting for an array" });
  }

  try {
    const updates = body.filter((blog: any) => blog.id !== undefined);
    const creates = body.filter((blog: any) => blog.id === undefined);

    const updatePromises = updates.map((blog: any) =>
      DailyPlan.update(blog, {
        where: {
          id: blog.id,
          blogID: blogID,
          planID: null,
        },
      })
    );

    const createPromises = creates.map((blog: any) =>
      DailyPlan.create({
        ...blog,
        blogID: parseInt(blogID),
        planID: null, // Явно null
      })
    );

    const updateResults = await Promise.all(updatePromises);
    await Promise.all(createPromises);

 
    res.json({
      success: true,
      message: `Updated`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
