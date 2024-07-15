import { useEffect, useState } from "react";
import DishCard from "./DishCard";
import "./Dish.css";
import io from 'socket.io-client';

const socket = io('http://localhost:8000', {
  transports: ['websocket']
});

const DishDashboard = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        fetchDishes();

        socket.on('update', (updatedDish) => {
            setDishes(prevDishes => 
                prevDishes.map(dish => 
                    dish.dishId === updatedDish.dishId ? updatedDish : dish
                )
            );
        });

        return () => {
            socket.off('update');
        };
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/dish/getDishes");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const dishesData = await response.json();
            setDishes(dishesData);
        } catch (error) {
            console.error('Failed to fetch dishes:', error);
        }
    };

    return (
        <div>
            <h1 className="title">Dish Dashboard</h1>
            {dishes.length > 0 ? (
                dishes.map((dish) => (
                    <DishCard key={dish.dishId} dish={dish} />
                ))
            ) : (
                <p>No dishes available</p>
            )}
        </div>
    );
};

export default DishDashboard;
