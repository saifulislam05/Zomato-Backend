// models/FoodCategory.js
import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  mustTry: Boolean,
  imgSrc: String,
  title: { type: String, required: true },
  votes: String,
  price: String,
  description: String,
  vegNonVeg: String,
  foodType: String,
});

const foodCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  items: [foodItemSchema],
});

const FoodCategory = mongoose.model("foods", foodCategorySchema);

export default FoodCategory;
