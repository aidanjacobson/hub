import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const HubDataContext = createContext();

export const useHubData = () => useContext(HubDataContext);

export const HubDataProvider = ({ children }) => {
    const [hubData, setHubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchHubData() {
        setLoading(true);
        try {
            const data = await api.hub.getHubData();
            setHubData(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHubData();
    }, []);

    return (
        <HubDataContext.Provider value={{ hubData, loading, error, refresh: fetchHubData }}>
            {children}
        </HubDataContext.Provider>
    )
};