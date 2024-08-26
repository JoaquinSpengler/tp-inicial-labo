import React, { useState } from 'react';
import './MechanicManagement.css';

// Datos de ejemplo de mecánicos
import mecanicosData from '../data/mecanicos.json';

const handleAddMechanic = () => {
    console.log("Agregar nuevo mecánico");
    // Aquí podrías mostrar un formulario modal o redirigir a una página de creación de mecánicos
};


function MechanicManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMecanicos, setFilteredMecanicos] = useState(mecanicosData);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterMecanicos(event.target.value);
    };

    const filterMecanicos = (term) => {
        const filtered = mecanicosData.filter(mecanico =>
            mecanico.nombre.toLowerCase().includes(term.toLowerCase()) ||
            mecanico.apellido.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredMecanicos(filtered);
    };


    return (
        <div className="mechanic-management-container">
            <h2>Gestión de Mecánicos</h2>
            <input
                type="text"
                placeholder="Buscar por nombre o apellido..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mechanic-search-input"
            />
            
            <div className="mechanic-list">
                {filteredMecanicos.length > 0 ? (
                    filteredMecanicos.map(mecanico => (
                        <div key={mecanico.id} className="mechanic-card">
                            <p><strong>Nombre:</strong> {mecanico.nombre} {mecanico.apellido}</p>
                            <p><strong>Especialidad:</strong> {mecanico.especialidad}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron mecánicos.</p>
                )}
            </div>
        </div>
    );
}

export default MechanicManagement;
