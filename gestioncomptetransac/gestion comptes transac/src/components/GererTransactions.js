import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COMPTES} from '../graphql/transactions';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

const GererTransactions = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  const [formData, setFormData] = useState({
    compteId: '',
    type: '',
    montant: ''
  });

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">Erreur : {error.message}</Typography>;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Les transactions
      </Typography>

      {/* Liste des comptes */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {data.allComptes.map((compte) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={compte.id}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)', // Slightly larger on hover
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                },
                maxWidth: '100%', // Allow the card to grow fully within the Grid container
                marginBottom: '16px', // Space between cards
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center content horizontally inside the card
                justifyContent: 'center', // Center content vertically inside the card
                textAlign: 'center', // Center the text inside the card
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {compte.type}
                </Typography>
                <Typography sx={{ color: '#555' }}>Solde : {compte.solde} €</Typography>
                <Typography sx={{ color: '#555' }}>Date de création : {compte.dateCreation}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GererTransactions;
