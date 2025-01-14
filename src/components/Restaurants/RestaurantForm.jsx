import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantForm({ restaurantId, onSuccess }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${restaurantId}`);
          setName(response.data.name);
          setAddress(response.data.address);
        } catch (error) {
          console.error('Error fetching restaurant:', error);
        }
      };

      fetchRestaurant();
    }
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (restaurantId) {
        // Update existing restaurant
        await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${restaurantId}`, { name, address });
        alert('Restaurant updated successfully.');
      } else {
        // Add new restaurant
        await axios.post(`${process.env.REACT_APP_API_URL}/restaurants`, { name, address });
        alert('Restaurant added successfully.');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert('Failed to save restaurant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <h2>{restaurantId ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

export default RestaurantForm;