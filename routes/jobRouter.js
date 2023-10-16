import { Router } from "express";
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js"; 

const router = Router();

import {getAllJobs, createJob, getJob, updateJob, deleteJob, showStats} from '../controllers/JobController.js';

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router.route('stats').get(showStats);

router
  .route('/:id')
  .get( validateIdParam, getJob)
  .patch(validateJobInput,validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;