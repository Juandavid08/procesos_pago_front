import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, Divider, Button, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Payment = () => {
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://api-sandbox.co.uat.wompi.dev/v1/merchants/pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMerchantData(response.data.data);
      } catch (err) {
        setError("Hubo un error al obtener los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>Cargando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  if (!merchantData) {
    return (
      <Container>
        <Typography variant="h6" color="error">No se encontraron datos del merchant.</Typography>
      </Container>
    );
  }

  const columns = [
    { field: 'ID', headerName: 'ID', width: 180 },
    { field: 'Nombre', headerName: 'Nombre', width: 250 },
    { field: 'Email', headerName: 'Email', width: 300 },
    { field: 'Contacto', headerName: 'Contacto', width: 250 },
    { field: 'Teléfono', headerName: 'Teléfono', width: 250 },
    { field: 'Activo', headerName: 'Activo', width: 150 },
    { field: 'Nombre Legal', headerName: 'Nombre Legal', width: 250 },
    { field: 'Tipo de ID Legal', headerName: 'Tipo de ID Legal', width: 200 },
    { field: 'ID Legal', headerName: 'ID Legal', width: 200 },
    { field: 'Monedas Aceptadas', headerName: 'Monedas Aceptadas', width: 250 },
    { field: 'Métodos de Pago Aceptados', headerName: 'Métodos de Pago Aceptados', width: 350 },
  ];

  const rows = [
    {
      id: 1,
      ID: merchantData.id,
      Nombre: merchantData.name,
      Email: merchantData.email,
      Contacto: merchantData.contact_name,
      Teléfono: merchantData.phone_number,
      Activo: merchantData.active ? 'Sí' : 'No',
      'Nombre Legal': merchantData.legal_name,
      'Tipo de ID Legal': merchantData.legal_id_type,
      'ID Legal': merchantData.legal_id,
      'Monedas Aceptadas': merchantData.accepted_currencies.join(', '),
      'Métodos de Pago Aceptados': merchantData.accepted_payment_methods.join(', '),
    },
  ];

  const paymentMethods = merchantData.accepted_payment_methods;

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        {/* Título principal */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Información del Merchant
        </Typography>

        {/* Subtítulo */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Datos del Merchant
        </Typography>

        {/* Paper contenedor para la DataGrid */}
        <Paper sx={{ padding: 2, boxShadow: 3 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={1}
              rowsPerPageOptions={[1]}
              disableSelectionOnClick
              sx={{
                border: 'none',
                '.MuiDataGrid-columnHeader': {
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold',
                },
                '.MuiDataGrid-cell': {
                  padding: '12px',
                },
                '.MuiDataGrid-row': {
                  backgroundColor: '#ffffff',
                },
              }}
            />
          </div>
        </Paper>

        <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

        <Typography variant="h6" gutterBottom>
          Métodos de Pago Aceptados
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {paymentMethods.map((method, index) => (
            <Button
              key={index}
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: '20px',
                padding: '6px 16px',
                textTransform: 'none',
                fontSize: '14px',
              }}
            >
              {method}
            </Button>
          ))}
        </Box>

        <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

        {/* Políticas y autorizaciones */}
        <Typography variant="h6" gutterBottom>
          Políticas y Autorizaciones
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            href={merchantData.presigned_acceptance.permalink}
            target="_blank"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Ver reglamento de usuarios
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href={merchantData.presigned_personal_data_auth.permalink}
            target="_blank"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Ver autorización de administración de datos personales
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
