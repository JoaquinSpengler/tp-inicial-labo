import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AutoSearch from '../Pages/AutoSearch';
import AutoDetail from '../Pages/AutoDetail';
import MechanicManagement from '../Pages/MechanicManagement';
import Navbar from '../components/NavBar';
import './App.css';

function App() {
    return (
        <div className="App">
            <main>
                <Router>
                  <Navbar></Navbar>  
                    <Routes>
                        <Route path="/" element={<AutoSearch />} />
                      { <Route path="/autos/:id" element={<AutoDetail />} />}  
                        <Route path="/gestion-mecanicos" element={<MechanicManagement />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
