import { useEffect, useState } from "react";

const DishCard = (props) => {
    const [dish, setDish] = useState(props.dish);

    useEffect(() => {
        setDish(props.dish);
    }, [props.dish]);

    const togglePublishedStatus = async (dishId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/dish/togglePublishedStatus/${dishId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const dishData = await response.json();
            setDish(dishData);
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatDishName = (name) => {
        return name.replace(/([A-Z])/g, ' $1').trim();
    };

    return (
        <div className="dish-container">
            <div className="dish-left-container">
                <div className="dish-image-container">
                    <img className="dish-image" src={dish.imageUrl} alt={dish.dishName} />
                </div>
            </div>
            <div className={`dish-text-container ${dish.isPublished ? 'published' : 'unpublished'}`}>
                <p className="dish-name">{formatDishName(dish.dishName)}</p>
                <p>Status: {dish.isPublished ? 
                <span>Published</span> :
                <span>Not published yet</span>}</p>
                <button className="btn" onClick={() => togglePublishedStatus(dish.dishId)}>Change Status</button>
            </div>
        </div>
    );
};

export default DishCard;
