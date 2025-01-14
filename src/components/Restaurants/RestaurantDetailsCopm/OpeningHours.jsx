import React, { useState } from 'react';
import './styles/OpeningHours.css';

function OpeningHours({ openingHours, onSave, onCancel }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editHours, setEditHours] = useState(openingHours);

    const handleSave = () => {
        onSave(editHours);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditHours(openingHours);
        setIsEditing(false);
        if (onCancel) onCancel();
    };

    return (
        <div className="opening-hours">
            <h2 className="opening-hours__title">Opening Hours</h2>
            {!isEditing ? (
                <>
                    {openingHours.length > 0 ? (
                        openingHours.map((day, index) => (
                            <div className="opening-hours__day" key={index}>
                                <p>
                                    <strong>{day.day_of_week}:</strong>{' '}
                                    {day.opening_time} - {day.closing_time}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="opening-hours__no-data">
                            No opening hours available.
                        </p>
                    )}
                    <button
                        className="opening-hours__edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </>
            ) : (
                <>
                    {editHours.map((day, index) => (
                        <div className="opening-hours__input-group" key={index}>
                            <label>{day.day_of_week}:</label>
                            <input
                                className="opening-hours__input"
                                type="time"
                                value={day.opening_time}
                                onChange={(e) =>
                                    setEditHours((prev) => {
                                        const updated = [...prev];
                                        updated[index].opening_time =
                                            e.target.value;
                                        return updated;
                                    })
                                }
                            />
                            <input
                                className="opening-hours__input"
                                type="time"
                                value={day.closing_time}
                                onChange={(e) =>
                                    setEditHours((prev) => {
                                        const updated = [...prev];
                                        updated[index].closing_time =
                                            e.target.value;
                                        return updated;
                                    })
                                }
                            />
                        </div>
                    ))}
                    <button
                        className="opening-hours__save-button"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="opening-hours__cancel-button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}

export default OpeningHours;