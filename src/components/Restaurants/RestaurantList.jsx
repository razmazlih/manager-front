import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../../services/api'; // ייבוא dashboardApi
import './RestaurantList.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await dashboardApi.get('/restaurants'); // שימוש ב-dashboardApi
        setRestaurants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurants.');
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="restaurant-loading">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="restaurant-error">{error}</div>;
  }

  return (
    <div className="restaurant-list-container">
      <h1>Restaurants</h1>
      <table className="restaurant-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.address}</td>
              <td>
                <button onClick={() => handleEdit(restaurant.id)}>Edit</button>
                <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const handleEdit = (id) => {
  console.log(`Editing restaurant ${id}`);
  // Navigate to the edit form or display a modal
};

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this restaurant?')) {
    try {
      await dashboardApi.delete(`/restaurants/${id}`); // שימוש ב-dashboardApi למחיקה
      alert('Restaurant deleted successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant.');
    }
  }
};

export default RestaurantList;