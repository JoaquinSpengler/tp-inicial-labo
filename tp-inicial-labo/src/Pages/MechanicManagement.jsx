import React, { useState, useEffect } from 'react';
import './MechanicManagement.css';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo de mecánicos
import mecanicosData from '../data/mecanicos.json';

const handleAddMechanic = () => {
    console.log("Agregar nuevo mecánico");
    // Aquí podrías mostrar un formulario modal o redirigir a una página de creación de mecánicos
};

function MechanicManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMecanicos, setFilteredMecanicos] = useState([]);
    const [selectedMechanicId, setSelectedMechanicId] = useState(null); // Estado para el mecánico seleccionado

    // Cargar datos de mecánicos desde localStorage o usar datos predeterminados
    useEffect(() => {
        const storedMecanicos = JSON.parse(localStorage.getItem('mecanicos')) || mecanicosData;
        setFilteredMecanicos(storedMecanicos);
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterMecanicos(event.target.value);
    };

    const filterMecanicos = (term) => {
        const storedMecanicos = JSON.parse(localStorage.getItem('mecanicos')) || mecanicosData;
        const filtered = storedMecanicos.filter(mecanico =>
            mecanico.nombre.toLowerCase().includes(term.toLowerCase()) ||
            mecanico.apellido.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredMecanicos(filtered);
    };

    const handleMechanicSelect = (id) => {
        setSelectedMechanicId(id); // Seleccionar el mecánico
    };

    const handleDisableMechanic = () => {
        // Actualizar el estado del mecánico seleccionado para inhabilitarlo
        const updatedMecanicos = filteredMecanicos.map(mecanico => {
            if (mecanico.id === selectedMechanicId) {
                return { ...mecanico, habilitado: false }; // Marcar como inhabilitado
            }
            return mecanico;
        }
    );
   

        setFilteredMecanicos(updatedMecanicos); // Actualizar la lista de mecánicos
        localStorage.setItem('mecanicos', JSON.stringify(updatedMecanicos)); // Guardar en localStorage
        setSelectedMechanicId(null); // Deseleccionar el mecánico después de inhabilitarlo
    };

    const handleAddMechanic = () => {
        navigate('/agregar-mecanico'); // Ruta de la nueva página para agregar mecánico
    };

    return (
        <div className="mechanic-management-container">
            <Navbar />
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
                        <div
                            key={mecanico.id}
                            className={`mechanic-card ${selectedMechanicId === mecanico.id ? 'selected' : ''}`}
                            onClick={() => handleMechanicSelect(mecanico.id)}
                            style={{ opacity: mecanico.habilitado ? 1 : 0.5 }} // Estilo visual para inhabilitados
                        >
                            <p><strong>Nombre:</strong> {mecanico.nombre} {mecanico.apellido}</p>
                            <p><strong>Especialidad:</strong> {mecanico.especialidad}</p>
                            {!mecanico.habilitado && <p style={{ color: 'red' }}>Inhabilitado</p>}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron mecánicos.</p>
                )}
            </div>
            <button onClick={handleAddMechanic} className="add-button">
                    Agregar Mecanico
                </button>
            {/* Mostrar botón de "Dar de baja" solo si un mecánico ha sido seleccionado */}
            {selectedMechanicId && (
                <button onClick={handleDisableMechanic} className="remove-button">
                    Dar de baja
                </button>
            )}
        </div>
    );
}

export default MechanicManagement;
