import React, { useState } from 'react';

function AddMenuItem({ handleAddMenuItem }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        handleAddMenuItem({ name, price, description });
        setName('');
        setPrice('');
        setDescription('');
    };

    return (
        <div>
            <h4>Add New Menu Item</h4>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Item</button>
        </div>
    );
}

export default AddMenuItem;
