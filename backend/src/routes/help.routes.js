import { Router } from "express";
import { createHelp } from "../controllers/help.controllers.js";

const router = Router();

router.route('/help').post(createHelp)

export default router