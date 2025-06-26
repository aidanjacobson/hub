// ItemEditor.jsx
import { useState, useEffect } from 'react';

const ItemEditor = ({ item = {}, onSave }) => {
    const [formData, setFormData] = useState(item);

    // Optional: if `item` might change (e.g. async load), sync formData
    useEffect(() => {
        setFormData(item);
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Name"
                value={formData.name || ''}
                onChange={handleChange}
            />
            {/* Add more fields here as needed */}
            <button type="submit">Save</button>
        </form>
    );
};

export default ItemEditor;