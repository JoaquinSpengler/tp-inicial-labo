import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AutoSearch from '../Pages/AutoSearch';
import AutoDetail from '../Pages/AutoDetail';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Taller de Autos</h1>
            </header>
            <main>
                <Router>
                    <Routes>
                        <Route path="/" element={<AutoSearch />} />
                        <Route path="/autos/:id" element={<AutoDetail />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
