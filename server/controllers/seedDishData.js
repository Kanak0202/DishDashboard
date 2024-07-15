//model
import Dish from "../models/dishes.model.js";
//data
import { dishesData } from "../data/dishes.data.js";

import mongoose from "mongoose";

export const seedDatabase = async () => {
    await Dish.deleteMany({});
    await Dish.insertMany(dishesData);
    console.log('Database seeded!');
    mongoose.connection.close();
};