import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr'; // Importar jsQR

const QRScanner = () => {
  const [error, setError] = useState(null);
  const videoRef = useRef(null); // Referencia para el video
  const canvasRef = useRef(null); // Canvas para procesar la imagen
  const [stream, setStream] = useState(null);

  const encenderCamara = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.hidden = false; // Mostrar el video si el stream es exitoso
      }
      setStream(mediaStream); // Guardar el stream para cerrarlo después

      requestAnimationFrame(scan); // Iniciar el escaneo una vez la cámara esté encendida
    } catch (err) {
      setError('Error al acceder a la cámara');
      console.error('Error al acceder a la cámara', err);
    }
  };

  const scan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Definir el tamaño del canvas para que coincida con el video
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Dibujar el frame actual del video en el canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Obtener los datos de imagen del canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Decodificar el QR usando jsQR
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        console.log('QR Code detectado:', code.data); // Log del QR detectado
      }
    }

    // Repetir el escaneo
    requestAnimationFrame(scan);
  };

  const cerrarCamara = () => {
    if (stream) {
      // Detener todos los tracks del stream si existen
      stream.getTracks().forEach(track => track.stop());
      setStream(null); // Limpiar el stream
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Limpiar el video
      videoRef.current.hidden = true; // Ocultar el video
    }
  };

  useEffect(() => {
    encenderCamara();

    return () => {
      cerrarCamara(); // Asegurarse de apagar la cámara cuando el componente se desmonte
    };
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <video ref={videoRef} hidden autoPlay />
      {/* Canvas oculto para procesar la imagen del video */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={cerrarCamara}>Cerrar Cámara</button>
    </div>
  );
};

export default QRScanner;
