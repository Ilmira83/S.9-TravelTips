import { RequestHandler, Router } from "express"
import { getDailyPlans,
        getDailyPlan, 
        deleteDailyPlan,
        postDailyPlan, 
        updateDailyPlan,
        getDailyPlansByPlanID, updateDailyPlansByPlanID, getDailyPlansByBlogID, updateDailyPlansByBlogID } from "../controllers/daily-plan";

console.log("typeof updateDailyPlansByPlanID:", typeof updateDailyPlansByPlanID);

const router = Router();

router.get('/', getDailyPlans);
router.get('/:id', getDailyPlan);
router.delete('/:id', deleteDailyPlan);
router.post('/', postDailyPlan);
router.put('/:id', updateDailyPlan);
router.get('/by-plan/:planID', getDailyPlansByPlanID);
router.get('/by-blog/:blogID', getDailyPlansByBlogID);
router.put('/by-plan/:planID', updateDailyPlansByPlanID  as RequestHandler);
router.put('/by-blog/:blogID', updateDailyPlansByBlogID  as RequestHandler);



export default router;