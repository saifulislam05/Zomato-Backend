import express from "express";
import Restaurant from "../models/Restaurant.js"; // Import the model
import {restaurants} from "../../Frontend/src/data/restaurants.js"; // Assuming you export your data from a file

const router = express.Router();

// Endpoint to upload restaurant data
router.post("/uploadRestaurants", async (req, res) => {
    try {
      
    // Insert the data into the database
    await Restaurant.insertMany(restaurants);
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    res.status(500).send(`Failed to upload data: ${error}`);
  }
});
router.get("/" ,async (req, res) => {
    try {
    const data=await Restaurant.find();
        res.status(200).json({
            succss: true,
            data
    })
  } catch (error) {
    res.status(500).send(`Failed to get Restaurants: ${error}`);
  }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      
    
    const data=await Restaurant.findById(id);
        res.status(200).json({
            succss: true,
            data
    })
  } catch (error) {
    res.status(500).send(`Failed to get Restaurants: ${error}`);
  }
});

export default router;
