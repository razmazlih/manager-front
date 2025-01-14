import React, { useState } from 'react';

function MenuItemEditor({ item, categoryId, handleMenuItemUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        handleMenuItemUpdate(categoryId, item.id, editedItem);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedItem(item); // חזרה לערכים המקוריים
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value,
        });
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="name"
                        value={editedItem.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                    />
                    <input
                        type="number"
                        name="price"
                        value={editedItem.price}
                        onChange={handleChange}
                        placeholder="Price"
                        min="0"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedItem.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{item.name}</span> - <span>₪{item.price}</span>
                    <p>{item.description}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </li>
    );
}

export default MenuItemEditor;