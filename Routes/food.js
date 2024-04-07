// routes/foodItemsRoutes.js
import express from "express";
import uploadFoods from "../Controller/foods/uploadFoods.js";
import getAllFoods from "../Controller/foods/getAllFoods.js";

const router = express.Router();

// Route to insert food items
router.post("/", uploadFoods);

// Route to get all food items
router.get("/", getAllFoods);

export default router;
