import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./Routes/user.js";
import dataUploadRoutes from "./Routes/restaurant.js";
import foodRoutes from "./Routes/food.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());


app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(console.log("Database connected Successfully"))
  .catch((err) => console.log(`Database connection failed error : ${err}`));

app.use("/v1/api/user", userRoutes);

app.use("/v1/api/restaurant", dataUploadRoutes);
app.use("/v1/api/food", foodRoutes);
//localhost:10000/v1/api

http: app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);