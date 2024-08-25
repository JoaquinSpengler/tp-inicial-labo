import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './AutoDetail.css';

// Datos de ejemplo de autos (debería venir de una API o un estado global)
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

function AutoDetail() {
    const { id } = useParams();
    const auto = autosData.find(a => a.id === parseInt(id));

    if (!auto) {
        return <p>Auto no encontrado</p>;
    }

    return (
        <div className="auto-detail">
            <h2>Detalles del Auto</h2>
            <h3>{auto.marca} {auto.modelo}</h3>
            <p><strong>Año:</strong> {auto.anio}</p>
            <p><strong>Kilometraje:</strong> {auto.kilometraje} km</p>
            <p><strong>Número de Serie:</strong> {auto.numeroSerie}</p>
            <p><strong>Código QR:</strong> {auto.codigoQR}</p>
            <Link to="/" className="back-link">Volver a la búsqueda</Link>
        </div>
    );
}

export default AutoDetail;
