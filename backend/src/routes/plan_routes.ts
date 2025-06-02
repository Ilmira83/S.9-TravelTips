import { Router } from "express"
import { deletePlan, getPlan, getPlans, postPlan, updatePlan } from "../controllers/plan";

const router = Router();

router.get('/', getPlans);
router.get('/:id', getPlan);
router.delete('/:id', deletePlan);
router.post('/', postPlan);
router.put('/:id', updatePlan);



export default router;