import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import QRCode from "react-qr-code"; // Biblioteca para generar QR

function AddAuto() {
    const [autoData, setAutoData] = useState({
        marca: '',
        modelo: '',
        anio: '',
        kilometraje: '',
        nro_patente: '',
    });
    const [qrCodeValue, setQrCodeValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAutoData({ ...autoData, [name]: value });
    };

    const handleAddAuto = () => {
        // Generar un valor de QR único
        const generatedQrCode = `QR-${autoData.marca}-${autoData.modelo}-${Date.now()}`;
        setQrCodeValue(generatedQrCode);

        // Enviar los datos del auto al servidor
        axios.post('http://localhost:5000/api/autos', {
            ...autoData,
            codigo_qr: generatedQrCode,
        })
            .then(response => {
                console.log('Auto agregado:', response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('Error al agregar auto:', error);
            });
    };

    return (
        <div className="add-auto">
            <h2>Agregar Nuevo Auto</h2>
            <input
                type="text"
                name="marca"
                placeholder="Marca"
                value={autoData.marca}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="modelo"
                placeholder="Modelo"
                value={autoData.modelo}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="anio"
                placeholder="Año"
                value={autoData.anio}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="kilometraje"
                placeholder="Kilometraje"
                value={autoData.kilometraje}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="nro_patente"
                placeholder="Número de Patente"
                value={autoData.nro_patente}
                onChange={handleInputChange}
            />
            <button onClick={handleAddAuto}>Agregar Auto</button>

            {qrCodeValue && (
                <div>
                    <h3>Código QR Generado</h3>
                    <QRCode value={qrCodeValue} />
                </div>
            )}
        </div>
    );
}

export default AddAuto;
