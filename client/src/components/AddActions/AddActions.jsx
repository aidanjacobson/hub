import './AddActions.scss';

import { useNavigate } from 'react-router-dom';

const AddActions = () => {
    const navigate = useNavigate();
    function doAddItem() {
        navigate('/add');
    }

    function doAddCategory() {

    }

    return (
        <div className="add-actions">
            <button className="add-action item" onClick={doAddItem}>
                + Add Item
            </button>

            <button className="add-action category" onClick={doAddCategory}>
                + Add Category
            </button>
        </div>
    )
}

export default AddActions;