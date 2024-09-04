import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';


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
        const patente = autoData.nro_patente;
        setQrCodeValue(patente);  // Asignar la patente como valor del QR

        // Enviar los datos del auto al servidor
        axios.post('http://localhost:5000/api/autos', {
            ...autoData,
            id: patente,  // Usar la patente como ID
            codigo_qr: patente,  // Usar la patente como valor del QR
        })
        .then(response => {
            console.log('Auto agregado:', response.data);

            // Enviar el valor del QR al servidor para generar y guardar el QR en la carpeta qr
            axios.post('http://localhost:5000/api/generateQR', { patente })
                .then(qrResponse => {
                    console.log('QR generado y guardado:', qrResponse.data);
                })
                .catch(error => {
                    console.error('Error al generar el QR:', error);
                });

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

            {/* Generar el código QR basado en la patente */}
            {qrCodeValue && (
                <div>
                    <QRCode value={qrCodeValue} />
                </div>
            )}
        </div>
    );
}

export default AddAuto;
