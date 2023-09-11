import { useState, useRef, useEffect } from "react";
import { TextField, Button, Grid, Paper, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Importamos useNavigate
import axios from "axios";
import ListManager from "../../modules/ListManager";

import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const BASE_API_URL = "http://localhost:8000/api";

const VehicleForm = ({ list }) => {
  const navigate = useNavigate();
  const { id: ownerID, carID } = useParams();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [formData, setFormData] = useState({
    placa: "",
    marcaModelo: "",
    color: "",
    estado: "",
    qrGenerated: false,
  });

  useEffect(() => {
    // console.log("VehicleForm | carID", carID);
    if (!carID) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`${BASE_API_URL}/car/${carID}`)
      .then((res) => {
        setFormData({
          id: res.data._id,
          placa: res.data.carPlate,
          marcaModelo: res.data.carBrand,
          color: res.data.carColor,
          estado: res.data.carStatus,
          qrGenerated: false,
        });
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(
          `Existió algún error al guardar los nuevos datos (${err}).`
        );
        setLoading(false);
      });
  }, [carID]);

  const qrRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      carBrand: formData.marcaModelo,
      carColor: formData.color,
      carStatus: formData.estado,
      carPlate: formData.placa,
    };

    try {
      if (carID) {
        let nuevoVehiculo = await axios.put(
          `${BASE_API_URL}/owner/${ownerID}/car/${formData.id}`,
          { _id: formData.id, ...formattedData }
        );
        ListManager.editElement(list, nuevoVehiculo.data);
      } else {
        let nuevoVehiculo = await axios.post(
          `${BASE_API_URL}/owner/${ownerID}/car/new`,
          formattedData
        );
        ListManager.add(list, nuevoVehiculo.data);
      }
      navigate("/propietarios"); // Utilizamos navigate para redirigir a la interfaz principal
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
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
      const dataUrl = canvas.toDataURL("image/png");

      // Create a PNG image
      toPng(qrContainer)
        .then((dataUrl) => {
          // Extract the full placa from the form data
          const fullPlaca = formData.placa;

          // Remove any non-alphanumeric characters from the placa to use as the filename
          const filename = fullPlaca.replace(/[^A-Za-z0-9]/g, "");

          // Create a link element to initiate the download
          const link = document.createElement("a");
          link.download = `${filename}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error while saving the QR code as PNG:", error);
        });
    });
  };

  const isPlacaValid = (placa) => {
    return placa === "" || /^[A-Za-z]{3}[0-9]{4}$/.test(placa);
  };

  const isMarcaModeloValid = (marcaModelo) => {
    return marcaModelo === "" || /^[A-Za-z0-9]{1,10}$/.test(marcaModelo);
  };

  const isColorValid = (color) => {
    return color === "" || /^[A-Za-z]{1,10}$/.test(color);
  };

  const isEstadoValid = (estado) => {
    return estado === "" || /^[A-Za-z]{1,10}$/.test(estado);
  };

  if (loading) return <h3>Cargando información...</h3>;
  if (fetchError) return <h3>{fetchError}</h3>;

  return (
    <form onSubmit={handleSubmit}>
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
              pattern: "^[A-Za-z]{3}[0-9]{4}$",
            }}
            value={formData.placa || ""}
            onChange={handleChange}
            error={!isPlacaValid(formData.placa)}
            helperText={
              !isPlacaValid(formData.placa) &&
              "La placa debe tener tres letras seguidas de cuatro dígitos."
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
              pattern: "^[A-Za-z0-9]{1,10}$",
            }}
            value={formData.marcaModelo || ""}
            onChange={handleChange}
            error={!isMarcaModeloValid(formData.marcaModelo)}
            helperText={
              !isMarcaModeloValid(formData.marcaModelo) &&
              "El campo debe tener hasta 10 caracteres alfanuméricos."
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
              pattern: "^[A-Za-z]{1,10}$",
            }}
            value={formData.color || ""}
            onChange={handleChange}
            error={!isColorValid(formData.color)}
            helperText={
              !isColorValid(formData.color) &&
              "El campo debe tener hasta 10 caracteres alfabéticos."
            }
            disabled={formData.qrGenerated}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="estado"
            label="Estado"
            variant="outlined"
            select
            fullWidth
            required
            value={formData.estado || ""}
            onChange={handleChange}
            error={!isEstadoValid(formData.estado)}
            helperText={
              !isEstadoValid(formData.estado) &&
              "El campo debe tener hasta 10 caracteres alfabéticos."
            }
            disabled={formData.qrGenerated}
          >
            <MenuItem value={"Invitado"}>Invitado</MenuItem>
            <MenuItem value={"Comunidad"}>Comunidad</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateQR}
            disabled={
              !isPlacaValid(formData.placa) ||
              !isMarcaModeloValid(formData.marcaModelo) ||
              !isColorValid(formData.color) ||
              !isEstadoValid(formData.estado) ||
              formData.qrGenerated
            }
          >
            Generar QR
          </Button>
        </Grid>
        {formData.qrGenerated && (
          <Grid item xs={12}>
            <Paper
              elevation={3}
              style={{
                width: "150px",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Wrap the QR code in a div with ref */}
              <div ref={qrRef}>
                <QRCode
                  value={
                    formData.placa?.substring(0, 2) +
                      "/" +
                      formData.placa?.substring(4) || ""
                  }
                />
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
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.qrGenerated}
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/propietarios")}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VehicleForm;
