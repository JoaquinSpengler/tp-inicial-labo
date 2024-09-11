import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../assets/config'; 

function AgregarMecanico() {
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoMecanico = { nombre, especialidad, telefono };

        // Llamada a la API para agregar el nuevo mecánico a la base de datos
        axios.post(`${API_BASE_URL}/mecanicos`, nuevoMecanico)
            .then(response => {
                console.log('Mecánico agregado con éxito:', response.data);
                navigate('/'); // Redirigir a la página principal después de agregar
            })
            .catch(error => {
                console.error('Error al agregar el mecánico:', error);
            });
    };

    return (
        <div className="agregar-mecanico-container">
            <h2>Agregar Nuevo Mecánico</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Especialidad"
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Agregar Mecánico</button>
            </form>
        </div>
    );
}

export default AgregarMecanico;
