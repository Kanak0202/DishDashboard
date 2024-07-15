import express from "express";
//controllers
import { getDishes, toggleDishPublishedStatus } from "../controllers/dish.controller.js";

const dishRoute = express.Router();

dishRoute.get('/getDishes', getDishes);
dishRoute.post('/togglePublishedStatus/:dishId', toggleDishPublishedStatus);

export default dishRoute;