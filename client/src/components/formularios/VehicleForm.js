import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    placa: '',
    marcaModelo: '',
    color: '',
    qrGenerated: false,
  });

  const qrRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenerateQR = () => {
    // Generate the QR code data based on the placa field
    setFormData((prevData) => ({
      ...prevData,
      qrGenerated: true,
    }));
  };

  const handleDownloadQR = () => {
    // Get the QR code container
    const qrContainer = qrRef.current;

    // Generate a canvas from the QR code container
    html2canvas(qrContainer).then((canvas) => {
      // Convert the canvas to an image data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create a PNG image
      toPng(qrContainer)
        .then((dataUrl) => {
          // Extract the full placa from the form data
          const fullPlaca = formData.placa;

          // Remove any non-alphanumeric characters from the placa to use as the filename
          const filename = fullPlaca.replace(/[^A-Za-z0-9]/g, '');

          // Create a link element to initiate the download
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error while saving the QR code as PNG:', error);
        });
    });
  };

  const isPlacaValid = () => {
    return /^[A-Za-z]{3}[0-9]{4}$/.test(formData.placa);
  };

  const isMarcaModeloValid = () => {
    return /^[A-Za-z0-9]{1,10}$/.test(formData.marcaModelo);
  };

  const isColorValid = () => {
    return /^[A-Za-z]{1,10}$/.test(formData.color);
  };

  return (
    <form>
      <h2>Información de Vehículo</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="placa"
            label="Placa Vehicular"
            variant="outlined"
            fullWidth
            required
            inputProps={{
              pattern: '^[A-Za-z]{3}[0-9]{4}$',
            }}
            value={formData.placa}
            onChange={handleChange}
            error={!isPlacaValid()}
            helperText={
              !isPlacaValid() &&
              'La placa debe tener tres letras seguidas de cuatro dígitos.'
            }
            disabled={formData.qrGenerated}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="marcaModelo"
            label="Marca/Modelo"
            variant="outlined"
            fullWidth
            required
            inputProps={{
              pattern: '^[A-Za-z0-9]{1,10}$',
            }}
            value={formData.marcaModelo}
            onChange={handleChange}
            error={!isMarcaModeloValid()}
            helperText={
              !isMarcaModeloValid() &&
              'El campo debe tener hasta 10 caracteres alfanuméricos.'
            }
            disabled={formData.qrGenerated}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="color"
            label="Color"
            variant="outlined"
            fullWidth
            required
            inputProps={{
              pattern: '^[A-Za-z]{1,10}$',
            }}
            value={formData.color}
            onChange={handleChange}
            error={!isColorValid()}
            helperText={
              !isColorValid() &&
              'El campo debe tener hasta 10 caracteres alfabéticos.'
            }
            disabled={formData.qrGenerated}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateQR}
            disabled={
              !isPlacaValid() ||
              !isMarcaModeloValid() ||
              !isColorValid() ||
              formData.qrGenerated
            }
          >
            Generar QR
          </Button>
        </Grid>
        {formData.qrGenerated && (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ width: '150px', padding: '20px', display: 'flex', justifyContent: 'center'}}>
              {/* Wrap the QR code in a div with ref */}
              <div ref={qrRef}>
                <QRCode value={formData.placa.substring(0, 2) + '/' + formData.placa.substring(4)} />
              </div>
            </Paper>
          </Grid>
        )}
        {formData.qrGenerated && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadQR}
            >
              Descargar
            </Button>
          </Grid>
        )}
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            disabled={!formData.qrGenerated}
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary">
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VehicleForm;