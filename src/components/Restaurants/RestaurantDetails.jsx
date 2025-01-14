import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dashboardApi } from '../../services/api';
import './RestaurantDetails.css';
import MenuCategory from './RestaurantDetailsCopm/MenuCategory';
import OpeningHours from './RestaurantDetailsCopm/OpeningHours';

function RestaurantDetails() {
    const { restaurantId } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [menu, setMenu] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // States for editing
    const [editName, setEditName] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editCity, setEditCity] = useState('');
    const [editHours, setEditHours] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const restaurantResponse = await dashboardApi.get(
                    `/restaurants/info/${restaurantId}`
                );
                setRestaurantInfo(restaurantResponse.data);
                setEditName(restaurantResponse.data.name);
                setEditCity(restaurantResponse.data.city);
                setEditAddress(restaurantResponse.data.address);

                const menuResponse = await dashboardApi.get(
                    `/menu/category/?restaurant_id=${restaurantId}`
                );
                setMenu(menuResponse.data);

                const hoursResponse = await dashboardApi.get(
                    `/restaurants/opening-houers/?restaurant_id=${restaurantId}`
                );
                setOpeningHours(hoursResponse.data);
                setEditHours(hoursResponse.data);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [restaurantId]);

    const handleUpdateRestaurantInfo = async () => {
        try {
            await dashboardApi.patch(`/restaurants/info/${restaurantId}/`, {
                name: editName,
                city: editCity,
                address: editAddress,
            });
            setRestaurantInfo({
                ...restaurantInfo,
                name: editName,
                address: editAddress,
            });
            alert('Restaurant info updated successfully!');
        } catch (err) {
            alert('Failed to update restaurant info.');
        }
    };

    const handleUpdateHours = async () => {
        try {
            for (const day of editHours) {
                await dashboardApi.patch(
                    `/restaurants/opening-houers/${day.id}/?restaurant_id=${restaurantId}`,
                    {
                        is_open: true,
                        opening_time: day.opening_time,
                        closing_time: day.closing_time,
                    }
                );
            }
            setOpeningHours(editHours);
            alert('Opening hours updated successfully!');
        } catch (err) {
            alert('Failed to update opening hours.');
        }
    };

    const handleUpdateCategory = async (categoryId, updatedCategory) => {
        try {
            await dashboardApi.patch(
                `/menu/category/${categoryId}/`,
                updatedCategory
            );
            setMenu((prevMenu) =>
                prevMenu.map((category) =>
                    category.id === categoryId
                        ? { ...category, ...updatedCategory }
                        : category
                )
            );
            alert('Category updated successfully!');
        } catch (err) {
            alert('Failed to update category.');
        }
    };

    const handleMenuItemUpdate = async (categoryId, itemId, updatedItem) => {
        try {
            await dashboardApi.put(`/menu/item/${itemId}`, updatedItem);
            setMenu((prevMenu) =>
                prevMenu.map((category) =>
                    category.id === categoryId
                        ? {
                              ...category,
                              items: category.items.map((item) =>
                                  item.id === itemId ? updatedItem : item
                              ),
                          }
                        : category
                )
            );
            alert('Menu item updated successfully!');
        } catch (err) {
            alert('Failed to update menu item.');
        }
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
                <h1>Edit Restaurant Info</h1>
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
                <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                />
                <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                />
                <button onClick={handleUpdateRestaurantInfo}>Save</button>
            </div>

            {/* Opening Hours Section */}
            <OpeningHours
                openingHours={openingHours}
                onSave={handleUpdateHours}
                onCancel={() => setEditHours(openingHours)}
            />

            {/* Menu Section */}
            <div className="menu-container">
                <h2>Edit Menu</h2>
                {menu.map((category) => (
                    <MenuCategory
                        key={category.id}
                        category={category}
                        handleUpdateCategory={handleUpdateCategory}
                        handleMenuItemUpdate={handleMenuItemUpdate}
                    />
                ))}
            </div>
        </div>
    );
}

export default RestaurantDetails;
