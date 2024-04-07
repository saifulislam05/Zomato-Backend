
import FoodCategory from "../../models/food.js";


const uploadFoods = async (req, res) => {
  try {
    const categories = Object.keys(foodItemsData).map((categoryName) => ({
      categoryName,
      items: foodItemsData[categoryName],
    }));

    await FoodCategory.insertMany(categories);
    res
      .status(201)
      .json({ message: "Food categories and items successfully uploaded." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default uploadFoods ;
