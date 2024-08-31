// AutoSearch.js
import React, { useState, useEffect } from 'react';
import AutoCard from './AutoCard';
import './AutoSearch.css'; 
import axios from 'axios';

function AutoSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAutos, setFilteredAutos] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener los autos
        axios.get('http://localhost:5000/api/autos')
            .then(response => {
                setFilteredAutos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los autos:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterAutos(event.target.value);
    };

    const filterAutos = (term) => {
        const filtered = filteredAutos.filter(auto =>
            auto.marca.toLowerCase().includes(term.toLowerCase()) ||
            auto.modelo.toLowerCase().includes(term.toLowerCase())
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
