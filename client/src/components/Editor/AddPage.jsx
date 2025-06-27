import ItemEditor from './ItemEditor';

import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useHubData } from '../../context/HubDataContext';

const AddPage = () => {
    const navigate = useNavigate();

    const { refresh } = useHubData();

    async function handleSave(item) {
        await api.item.create(item);
        await refresh();
        navigate('/');
    }

    function handleCancel() {
        navigate('/');
    }

    return (
        <ItemEditor
            onSave={handleSave}
            onCancel={handleCancel}
            saveText="Add Item"
            pageTitle="Add New Item" />
    )
}

export default AddPage;