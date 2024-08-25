import React, { useState } from 'react';
import AutoCard from './AutoCard';
import './AutoSearch.css'; // Importa el archivo CSS específico de AutoSearch

// Datos de ejemplo de autos
const autosData = [
    {
        id: 1,
        marca: "Ford",
        modelo: "Fiesta",
        anio: 2021,
        kilometraje: 10000,
        numeroSerie: "1HGCM82633A123456",
        codigoQR: "QR12345"
    },
    {
        id: 2,
        marca: "Volkswagen",
        modelo: "Golf",
        anio: 2019,
        kilometraje: 25000,
        numeroSerie: "2HGCM82633A654321",
        codigoQR: "QR67890"
    },
    {
        id: 3,
        marca: "Suzuki",
        modelo: "Swift",
        anio: 2020,
        kilometraje: 15000,
        numeroSerie: "3HGCM82633A789012",
        codigoQR: "QR11111"
    },
    {
        id: 4,
        marca: "Peugeot",
        modelo: "208",
        anio: 2022,
        kilometraje: 5000,
        numeroSerie: "4HGCM82633A345678",
        codigoQR: "QR22222"
    },
    {
        id: 5,
        marca: "Renault",
        modelo: "Clio",
        anio: 2018,
        kilometraje: 30000,
        numeroSerie: "5HGCM82633A987654",
        codigoQR: "QR33333"
    }
];

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
