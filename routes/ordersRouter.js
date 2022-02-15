import express from 'express';

const router = express.Router();

import { addOrder, getOrder } from "../controllers/orders.js";

router.post("/", addOrder)
router.get("/", getOrder);

export default router;