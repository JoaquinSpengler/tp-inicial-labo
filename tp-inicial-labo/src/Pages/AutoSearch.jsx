// AutoSearch.js
import React, { useState } from 'react';
import AutoCard from './AutoCard';
import './AutoSearch.css'; 

// Importamos los datos de autos desde el JSON
import autosData from '../data/autos.json';

function AutoSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAutos, setFilteredAutos] = useState(autosData);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterAutos(event.target.value);
    };

    const filterAutos = (term) => {
        const filtered = autosData.filter(auto =>
            auto.marca.toLowerCase().includes(term.toLowerCase()) ||
            auto.numeroSerie.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredAutos(filtered);
    };

    return (
        <div className="auto-search-container">
            <h2>Búsqueda de Autos</h2>
            <input
                type="text"
                placeholder="Buscar por marca o número de serie..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="auto-search-input"
            />
            <div>
                {filteredAutos.length > 0 ? (
                    filteredAutos.map(auto => (
                        <AutoCard key={auto.id} auto={auto} />
                    ))
                ) : (
                    <p>No se encontraron autos.</p>
                )}
            </div>
        </div>
    );
}

export default AutoSearch;
