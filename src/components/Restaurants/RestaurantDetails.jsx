import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantDetails() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${restaurantId}`);
        setRestaurant(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurant details.');
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (loading) {
    return <div className="restaurant-loading">Loading details...</div>;
  }

  if (error) {
    return <div className="restaurant-error">{error}</div>;
  }

  return (
    <div className="restaurant-details-container">
      <h1>{restaurant.name}</h1>
      <p><strong>Address:</strong> {restaurant.address}</p>
    </div>
  );
}

export default RestaurantDetails;