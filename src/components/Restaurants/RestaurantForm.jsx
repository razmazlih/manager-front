import React, { useState } from 'react';
import { dashboardApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function RestaurantForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newRestaurantData = { name, city, address };

      const { data } = await dashboardApi.post('/restaurants/info/', newRestaurantData);
      navigate(`/restaurant/${data.id}`)
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-form-page">
      <h2>Add New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Restaurant'}
        </button>
      </form>
    </div>
  );
}

export default RestaurantForm;