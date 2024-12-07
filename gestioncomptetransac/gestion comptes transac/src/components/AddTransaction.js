import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_COMPTES, ADD_TRANSACTION } from '../graphql/transactions';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';

const AddTransaction = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
    onError: (error) => {
      console.error('Error adding transaction:', error);
      alert(`Erreur lors de l'ajout de la transaction. Détails : ${error.message}`);
    },
  });

  const [formData, setFormData] = useState({ compteId: '', type: '', montant: '' });

  if (loading) return <Typography>Chargement des comptes...</Typography>;
  if (error) return <Typography color="error">Erreur : {error.message}</Typography>;

  const handleAddTransaction = () => {
    const parsedMontant = parseFloat(formData.montant);
    if (isNaN(parsedMontant) || parsedMontant <= 0) {
      alert('Le montant doit être un nombre valide et positif.');
      return;
    }
  
    const transactionData = {
      compteId: formData.compteId,
      type: formData.type,
      montant: parsedMontant,
    };
  
    console.log('Transaction data:', transactionData);  // Log the data to check it
  
    addTransaction({
      variables: {
        compteId: transactionData.compteId,
        type: transactionData.type,
        montant: transactionData.montant,
      },
    });
    setFormData({ compteId: '', type: '', montant: '' });
    alert('Transaction ajoutée avec succès.');
  };
  

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        Ajouter une Transaction
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          background: '#fff',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          select
          label="Compte"
          value={formData.compteId}
          onChange={(e) => setFormData({ ...formData, compteId: e.target.value })}
          fullWidth
        >
          {data.allComptes.map((compte) => (
            <MenuItem key={compte.id} value={compte.id}>
              {compte.type} - Solde: {compte.solde} €
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Type de Transaction"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          fullWidth
        >
          <MenuItem value="DEPOT">Dépôt</MenuItem>
          <MenuItem value="RETRAIT">Retrait</MenuItem>
        </TextField>

        <TextField
          label="Montant (€)"
          value={formData.montant}
          onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleAddTransaction}
          sx={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#0056b3' },
          }}
        >
          Ajouter Transaction
        </Button>
      </Box>
    </Box>
  );
};

export default AddTransaction;
