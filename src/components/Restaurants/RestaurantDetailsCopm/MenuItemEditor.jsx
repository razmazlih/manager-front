import React from 'react';

function MenuItemEditor({ item, categoryId, handleMenuItemUpdate }) {
    const handleNameChange = (e) => {
        handleMenuItemUpdate(categoryId, item.id, {
            ...item,
            name: e.target.value,
        });
    };

    const handlePriceChange = (e) => {
        handleMenuItemUpdate(categoryId, item.id, {
            ...item,
            price: e.target.value,
        });
    };

    return (
        <li>
            <input
                type="text"
                value={item.name}
                onChange={handleNameChange}
                placeholder="Item Name"
            />
            <input
                type="number"
                value={item.price}
                onChange={handlePriceChange}
                placeholder="Price"
                min="0"
            />
        </li>
    );
}

export default MenuItemEditor;