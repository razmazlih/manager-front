import React, { useState } from 'react';
import MenuItemEditor from './MenuItemEditor';

function MenuCategory({ category, handleUpdateCategory, handleMenuItemUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(category?.name || '');


    return (
        <div className="menu-category">
            <h3>
                {!isEditing ? (
                    <span>{category.name}</span>
                ) : (
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                )}
            </h3>
            {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
                <>
                    <button
                        onClick={() => {
                            handleUpdateCategory(category.id, { name: editedName });
                            setIsEditing(false);
                        }}
                    >
                        Save
                    </button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            )}
            <ul>
                {category.items.map((item) => (
                    <MenuItemEditor
                        key={item.id}
                        item={item}
                        categoryId={category.id}
                        handleMenuItemUpdate={handleMenuItemUpdate}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MenuCategory;