// ItemEditor.jsx
import { useState, useEffect } from 'react';

import './ItemEditor.scss'

const ItemEditor = ({ item = {}, onSave = () => { }, onCancel = () => { }, saveText="Save", cancelText="Cancel", pageTitle="Item Editor" }) => {
    const [url, setUrl] = useState(item.url);
    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.description);
    const [error, setError] = useState(null);

    function validateInput() {
        let errors = [];
        if (!url || url.trim() === '') errors.push('URL is required.');
        if (!title || title.trim() === '') errors.push('Title is required.');

        if (errors.length > 0) {
            setError(errors.join(' '));
            return false;
        }

        setError(null);
        return true;
    }

    function doSave() {
        if (!validateInput()) return;

        item.url = url;
        item.title = title;
        item.description = description;
        onSave(item);
    }

    function doCancel() {
        onCancel(item);
    }

    return (
        <div className="item-editor">
            <h2>{pageTitle}</h2>
            <h3 className="error">{error}</h3>
            <div className="item-editor-row">
                <span>URL</span>
                <input type="text" placeholder="Enter URL" defaultValue={url} onChange={e=>setUrl(e.target.value) } />
            </div>
            <div className="item-editor-row">
                <span>Title</span>
                <input type="text" placeholder="Enter Title" defaultValue={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="item-editor-row">
                <span>Description</span>
                <input type="text" placeholder="Enter Description" defaultValue={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <button className="save-btn" onClick={doSave}>{saveText}</button>
            <button className="cancel-btn" onClick={doCancel}>{cancelText}</button>
        </div>
    );
};

export default ItemEditor;