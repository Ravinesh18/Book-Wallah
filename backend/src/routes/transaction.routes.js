import { Router} from "express";
const router = Router()

import { createExchangeTransaction, createBorrowTransaction } from "../controllers/transaction.controllers.js"

router.post("/exchangingBook",  createExchangeTransaction)
router.post("/borrowingBook",  createBorrowTransaction)

export default router