import React, { useState, useEffect } from 'react';
import AutoCard from './AutoCard';
import './AutoSearch.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir
import Navbar from '../components/NavBar';

function AutoSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [allAutos, setAllAutos] = useState([]); // Estado para todos los autos
    const [filteredAutos, setFilteredAutos] = useState([]);
    const navigate = useNavigate(); // Inicializar el hook useNavigate

    useEffect(() => {
        // Llamada a la API para obtener los autos
        axios.get('http://localhost:5000/api/autos')
            .then(response => {
                setAllAutos(response.data);
                setFilteredAutos(response.data); // Inicialmente, todos los autos están en la lista filtrada
            })
            .catch(error => {
                console.error('Error al obtener los autos:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterAutos(term);
    };

    const filterAutos = (term) => {
        if (term === '') {
            // Si el término de búsqueda está vacío, mostrar todos los autos
            setFilteredAutos(allAutos);
        } else {
            // Filtrar autos basándose en el término de búsqueda
            const filtered = allAutos.filter(auto =>
                auto.marca.toLowerCase().includes(term.toLowerCase()) ||
                auto.modelo.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredAutos(filtered);
        }
    };

    const handleAddAuto = () => {
        // Redirigir a la página de agregar autos
        navigate('/agregar-auto');
    };

    const handleScanQR = () => {
        // Redirigir a la página de escanear QR
        navigate('/escanear-qr');
    };

return (
    
    <div className="auto-search-container">
    
            <h2>Búsqueda de Autos</h2>
            <div className="search-add-container">
                <input
                    type="text"
                    placeholder="Buscar por marca o número de serie..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="auto-search-input"
                />
            </div>
            
            <div className='buttons-search-add-container'>
                <button onClick={handleAddAuto} className="add-auto-button">
                    Agregar Auto
                </button>
                <button onClick={handleScanQR} className="scan-qr-button">
                    Escanear QR
                </button>
            </div>
      
            
                {filteredAutos.length > 0 ? (
                    filteredAutos.map(auto => (
                        <AutoCard key={auto.id} auto={auto} />
                    ))
                ) : (
                    <p>No se encontraron autos.</p>
                )}
            </div>
            
    );
}

export default AutoSearch;
