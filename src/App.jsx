import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMain from './components/home/HomeMain';
import NavbarMain from './components/navbar/NavbarMain';

function App() {
    return (
        <Router>
            <NavbarMain />
            <Routes>
                <Route path="/" element={<HomeMain />} />
            </Routes>
        </Router>
    );
}

export default App;
