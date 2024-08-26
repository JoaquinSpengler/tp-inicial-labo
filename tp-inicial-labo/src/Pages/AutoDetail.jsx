// AutoDetail.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AutoDetail.css';

import autosData from '../data/autos.json';
import mantenimientoData from '../data/mantenimiento.json';

function AutoDetail() {
    const { id } = useParams();
    const auto = autosData.find(a => a.id === parseInt(id));
    const [mantenimientos, setMantenimientos] = useState(mantenimientoData.filter(m => m.auto_id === auto.id));
    const [newMantenimiento, setNewMantenimiento] = useState({ fecha: '', tipo_de_mantenimiento: '', descripcion: '' });

    if (!auto) {
        return <p>Auto no encontrado</p>;
    }

    const handleAddMantenimiento = () => {
        const updatedMantenimientos = [...mantenimientos, { auto_id: auto.id, ...newMantenimiento }];
        setMantenimientos(updatedMantenimientos);
        setNewMantenimiento({ fecha: '', tipo_de_mantenimiento: '', descripcion: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMantenimiento(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="auto-detail">
            <h2>Detalles del Auto</h2>
            <h3>{auto.marca} {auto.modelo}</h3>
            <p><strong>Año:</strong> {auto.anio}</p>
            <p><strong>Kilometraje:</strong> {auto.kilometraje} km</p>
            <p><strong>Número de Serie:</strong> {auto.numeroSerie}</p>
            <p><strong>Código QR:</strong> {auto.codigoQR}</p>

            <h3>Historial de Mantenimiento</h3>
            {mantenimientos.length > 0 ? (
                <table className="maintenance-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de Mantenimiento</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mantenimientos.map((item, index) => (
                            <tr key={index}>
                                <td>{item.fecha}</td>
                                <td>{item.tipo_de_mantenimiento}</td>
                                <td>{item.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No se encontraron registros de mantenimiento.</p>
            )}

            <h3>Agregar Mantenimiento</h3>
            <input
                type="text"
                name="fecha"
                placeholder="Fecha (YYYY-MM-DD)"
                value={newMantenimiento.fecha}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="tipo_de_mantenimiento"
                placeholder="Tipo de Mantenimiento"
                value={newMantenimiento.tipo_de_mantenimiento}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={newMantenimiento.descripcion}
                onChange={handleInputChange}
            />
            <button onClick={handleAddMantenimiento}>Agregar Mantenimiento</button>

            <Link to="/" className="back-link">Volver a la búsqueda</Link>
        </div>
    );
}

export default AutoDetail;
