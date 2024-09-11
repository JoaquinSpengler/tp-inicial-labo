import React, { useState, useEffect } from 'react';
import './MechanicManagement.css';
import Navbar from '../components/NavBar';
import axios from 'axios';  // Importamos axios para las peticiones
import { API_BASE_URL } from '../assets/config';  // Importar el URL base de la API
import { useNavigate } from 'react-router-dom';

function MechanicManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMecanicos, setFilteredMecanicos] = useState([]);
    const [selectedMechanicId, setSelectedMechanicId] = useState(null);
    const navigate = useNavigate();

    // Cargar datos de mecánicos desde la API
    useEffect(() => {
        axios.get(`${API_BASE_URL}/mecanicos`)
            .then(response => {
                setFilteredMecanicos(response.data); // Cargar los datos de la API
            })
            .catch(error => {
                console.error('Error al obtener los mecánicos:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterMecanicos(event.target.value);
    };

    const filterMecanicos = (term) => {
        const filtered = filteredMecanicos.filter(mecanico =>
            mecanico.nombre.toLowerCase().includes(term.toLowerCase()) ||
            mecanico.apellido.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredMecanicos(filtered);
    };

    const handleMechanicSelect = (id) => {
        setSelectedMechanicId(id); 
    };

    const handleDisableMechanic = () => {
        const updatedMecanicos = filteredMecanicos.map(mecanico => {
            if (mecanico.id === selectedMechanicId) {
                return { ...mecanico, habilitado: false }; 
            }
            return mecanico;
        });
        setFilteredMecanicos(updatedMecanicos); 
        setSelectedMechanicId(null); 
    };

    const handleAddMechanic = () => {
        navigate('/agregar-mecanico'); 
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
                            style={{ opacity: mecanico.habilitado ? 1 : 0.5 }}
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
            {selectedMechanicId && (
                <button onClick={handleDisableMechanic} className="remove-button">
                    Dar de baja
                </button>
            )}
        </div>
    );
}

export default MechanicManagement;
