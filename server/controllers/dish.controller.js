import Dish from "../models/dishes.model.js";

export const getDishes = async (request, response) => {
    try {
        const dishes = await Dish.find({});
        if (!dishes) {
            return response.status(400).json({ msg: "Data not found" });
        }
        return response.status(200).json(dishes);
    } catch (error) {
        return response.status(500).json({ error: error.message, msg: "Could not insert dishes" });
    }
};

export const toggleDishPublishedStatus = async (request, response) => {
    try {
        const dishId = request.params.dishId;
        const dish = await Dish.findOne({ dishId: dishId });
        if (!dish) {
            return response.status(400).json({ msg: "Could not find the dish" });
        }
        dish.isPublished = !dish.isPublished;
        await dish.save();
        request.io.emit('update', dish);
        return response.status(200).json(dish);
    } catch (error) {
        return response.status(500).json({ error: error.message, msg: "Dish published status could not be toggled" });
    }
};
