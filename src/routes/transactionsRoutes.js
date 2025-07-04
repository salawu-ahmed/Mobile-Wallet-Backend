import express from "express";
import { getTransactionsByUserId, getTransactionsSummary, createTransaction, deleteTransaction } from "../controllers/transactionsController.js";
const router = express.Router()

router.get('/:userId', getTransactionsByUserId)
router.post('/', createTransaction)
router.delete('/:id', deleteTransaction)
router.get('/summary/:userId', getTransactionsSummary)

export default router 