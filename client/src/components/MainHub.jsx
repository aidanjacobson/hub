import { useHubData } from '../context/HubDataContext';
import ItemList from './ItemList';

const MainHub = () => {
    const { hubData, loading, error, refresh } = useHubData();

    return (
            loading ? "Loading hub..." : <>
            <h1>Hub</h1>
            <ItemList name="Main" items={hubData?.items} />
            </>
    )
}

export default MainHub;