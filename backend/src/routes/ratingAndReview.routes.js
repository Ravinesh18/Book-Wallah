import { Router } from "express";
import { createRating } from "../controllers/ratingAndReview.js";

const router = Router()

router.route('/rating-review').post(createRating)

export default router