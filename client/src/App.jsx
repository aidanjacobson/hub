import './App.css'

import { HubDataProvider } from './context/HubDataContext'
import { Routes, Route } from 'react-router-dom'

import MainHub from './components/MainHub'
import AddPage from './components/Editor/AddPage'
import EditPage from './components/Editor/EditPage'

function App() {

    return (
        <HubDataProvider>
            <Routes>
                <Route path="/" element={<MainHub />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/edit/:id" element={<EditPage />} />
            </Routes>
        </HubDataProvider>
    )
}

export default App;