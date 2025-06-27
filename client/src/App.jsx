import './App.css'

import { HubDataProvider } from './context/HubDataContext'
import { Routes, Route } from 'react-router-dom'

import MainHub from './components/MainHub'
import AddPage from './components/Editor/AddPage'
import EditPage from './components/Editor/EditPage'
import ItemEditor from './components/Editor/ItemEditor'

function App() {

    return (
        <HubDataProvider>
            <Routes>
                <Route path="/" element={<MainHub />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/edittest" element={<ItemEditor item={({url: 'https://google.com'}) } onSave={console.log} /> } />
            </Routes>
        </HubDataProvider>
    )
}

export default App;