import foodModel from "../../models/food.js";

const getAllFoods = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.status(200).json(foodItems);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
 
export default getAllFoods