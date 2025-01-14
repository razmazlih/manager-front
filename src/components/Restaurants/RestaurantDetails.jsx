import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dashboardApi } from '../../services/api';
import './RestaurantDetails.css';

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
    const [editHours, setEditHours] = useState([]);
    const [isEditingHours, setIsEditingHours] = useState(false); // Editing state for opening hours

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const restaurantResponse = await dashboardApi.get(
                    `/restaurants/info/${restaurantId}`
                );
                setRestaurantInfo(restaurantResponse.data);
                setEditName(restaurantResponse.data.name);
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
            await dashboardApi.put(`/restaurants/info/${restaurantId}`, {
                name: editName,
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
            setIsEditingHours(false); // Exit edit mode after saving
            alert('Opening hours updated successfully!');
        } catch (err) {
            alert('Failed to update opening hours.');
        }
    };

    const handleCancelEditing = () => {
        setEditHours(openingHours); // Restore original values
        setIsEditingHours(false);
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
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                />
                <button onClick={handleUpdateRestaurantInfo}>Save</button>
            </div>

            {/* Opening Hours Section */}
            <div className="opening-hours">
                <h2>Opening Hours</h2>
                {!isEditingHours ? (
                    <>
                        {openingHours.length > 0 ? (
                            openingHours.map((day, index) => (
                                <div key={index}>
                                    <p>
                                        <strong>{day.day_of_week}:</strong>{' '}
                                        {day.opening_time} - {day.closing_time}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No opening hours available.</p>
                        )}
                        <button onClick={() => setIsEditingHours(true)}>Edit</button>
                    </>
                ) : (
                    <>
                        {editHours.map((day, index) => (
                            <div key={index}>
                                <label>{day.day_of_week}:</label>
                                <input
                                    type="time"
                                    value={day.opening_time}
                                    onChange={(e) =>
                                        setEditHours((prev) => {
                                            const updated = [...prev];
                                            updated[index].opening_time =
                                                e.target.value;
                                            return updated;
                                        })
                                    }
                                />
                                <input
                                    type="time"
                                    value={day.closing_time}
                                    onChange={(e) =>
                                        setEditHours((prev) => {
                                            const updated = [...prev];
                                            updated[index].closing_time =
                                                e.target.value;
                                            return updated;
                                        })
                                    }
                                />
                            </div>
                        ))}
                        <button onClick={handleUpdateHours}>Save</button>
                        <button onClick={handleCancelEditing}>Cancel</button>
                    </>
                )}
            </div>

            {/* Menu Section */}
            <div className="menu-container">
                <h2>Edit Menu</h2>
                {menu.map((category) => (
                    <div key={category.id} className="menu-category">
                        <h3>{category.name}</h3>
                        <ul>
                            {category.items.map((item) => (
                                <li key={item.id}>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleMenuItemUpdate(
                                                category.id,
                                                item.id,
                                                {
                                                    ...item,
                                                    name: e.target.value,
                                                }
                                            )
                                        }
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                            handleMenuItemUpdate(
                                                category.id,
                                                item.id,
                                                {
                                                    ...item,
                                                    price: e.target.value,
                                                }
                                            )
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RestaurantDetails;