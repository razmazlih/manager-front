import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dashboardApi } from '../../services/api';

function RestaurantDetails() {
    const { restaurantId } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [menu, setMenu] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch restaurant info
                const restaurantResponse = await dashboardApi.get(
                    `/restaurants/info/${restaurantId}`
                );
                setRestaurantInfo(restaurantResponse.data);

                // Fetch menu
                const menuResponse = await dashboardApi.get(
                    `/menu/category/?restaurant_id=${restaurantId}`
                );
                setMenu(menuResponse.data);

                // Fetch opening hours
                const hoursResponse = await dashboardApi.get(
                    `/restaurants/opening-houers/?restaurant_id=${restaurantId}`
                );
                setOpeningHours(hoursResponse.data);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [restaurantId]);

    const formatOpeningHours = () => {
        return openingHours.map((day) => {
            if (!day.is_open) {
                return `${day.day_of_week}: Closed`;
            }
            return `${day.day_of_week}: ${day.opening_time} - ${day.closing_time}`;
        });
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="restaurant-details-container">
            {/* Restaurant Info Section */}
            <div className="restaurant-info">
                <h1>{restaurantInfo.name}</h1>
                <p>
                    <strong>Address:</strong> {restaurantInfo.address},{' '}
                    {restaurantInfo.city}
                </p>
            </div>

            {/* Opening Hours Section */}
            <div className="opening-hours">
                <h2>Opening Hours</h2>
                <ul>
                    {formatOpeningHours().map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>

            {/* Menu Section */}
            <div className="menu-container">
                <h2>Menu</h2>
                {menu.length === 0 ? (
                    <p>No menu available for this restaurant.</p>
                ) : (
                    menu.map((category) => (
                        <div key={category.id} className="menu-category">
                            <h3>{category.name}</h3>
                            <ul>
                                {category.items.map((item) => (
                                    <li key={item.id}>
                                        <span>{item.name}</span> -{' '}
                                        <span>{item.price} ₪</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RestaurantDetails;
