import React, { useState } from 'react';

function EditRestaurantInfo({
    editName,
    setEditName,
    editCity,
    setEditCity,
    editAddress,
    setEditAddress,
    handleUpdateRestaurantInfo,
}) {
    const [isEditing, setIsEditing] = useState(false); // מצב לעריכה

    const handleEditClick = () => {
        setIsEditing(true); // הפעלת מצב עריכה
    };

    const handleSaveClick = () => {
        handleUpdateRestaurantInfo();
        setIsEditing(false); // יציאה ממצב עריכה לאחר שמירה
    };

    return (
        <div className="restaurant-info">
            <h1>Edit Restaurant Info</h1>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Restaurant Name"
                    />
                    <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Address"
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <p>
                        <strong>Name:</strong> {editName}
                    </p>
                    <p>
                        <strong>City:</strong> {editCity}
                    </p>
                    <p>
                        <strong>Address:</strong> {editAddress}
                    </p>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
}

export default EditRestaurantInfo;
