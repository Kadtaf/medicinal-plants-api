import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlantList from './pages/PlantList';
import PlantDetail from './pages/PlantDetail'; // 🆕 à créer
import PlantForm from './pages/PlantForm';
import PlantEditForm from "./pages/PlantEditForm";
import LoginForm from "./pages/LoginForm";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PlantList />} />
                <Route path="/plants/:id" element={<PlantDetail />} />
                <Route path="/plants/new" element={<PlantForm />} /> {/* 🆕 */}
                <Route path="/plants/edit/:id" element={<PlantEditForm />} />
                <Route path="/users/login" element={<LoginForm />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;