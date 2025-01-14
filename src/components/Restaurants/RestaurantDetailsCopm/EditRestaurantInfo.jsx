import React, { useState } from 'react';
import './styles/EditRestaurantInfo.css';

function EditRestaurantInfo({
    editName,
    setEditName,
    editCity,
    setEditCity,
    editAddress,
    setEditAddress,
    handleUpdateRestaurantInfo,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        handleUpdateRestaurantInfo();
        setIsEditing(false);
    };

    return (
        <div className="edit-restaurant-info-container">
            <h1 className="edit-restaurant-info-title">Edit Restaurant Info</h1>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="edit-restaurant-info-input"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Restaurant Name"
                    />
                    <input
                        type="text"
                        className="edit-restaurant-info-input"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        className="edit-restaurant-info-input"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Address"
                    />
                    <button
                        className="edit-restaurant-info-save-button"
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <p className="edit-restaurant-info-text">
                        <strong>Name:</strong> {editName}
                    </p>
                    <p className="edit-restaurant-info-text">
                        <strong>City:</strong> {editCity}
                    </p>
                    <p className="edit-restaurant-info-text">
                        <strong>Address:</strong> {editAddress}
                    </p>
                    <button
                        className="edit-restaurant-info-edit-button"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    );
}

export default EditRestaurantInfo;