import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMPTE, GET_ALL_COMPTES } from '../graphql/comptes';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

const AddCompte = () => {
  const [addCompte] = useMutation(ADD_COMPTE, { refetchQueries: [{ query: GET_ALL_COMPTES }] });
  const [formData, setFormData] = useState({ solde: '', dateCreation: '', type: '' });

  const handleAddCompte = () => {
    const parsedSolde = parseFloat(formData.solde);
    if (isNaN(parsedSolde)) {
      alert('Le solde doit être un nombre valide.');
      return;
    }

    const compteData = {
      solde: parsedSolde,
      dateCreation: formData.dateCreation,
      type: formData.type,
    };

    addCompte({ variables: { compte: compteData } });
    setFormData({ solde: '', dateCreation: '', type: '' });
    alert('Compte ajouté avec succès.');
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
        Ajouter un Compte
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
          label="Solde (€)"
          value={formData.solde}
          onChange={(e) => setFormData({ ...formData, solde: e.target.value })}
          fullWidth
        />
        <TextField
          label="Date de Création"
          type="date"
          value={formData.dateCreation}
          onChange={(e) => setFormData({ ...formData, dateCreation: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          select
          label="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          fullWidth
        >
          <MenuItem value="COURANT">COURANT</MenuItem>
          <MenuItem value="EPARGNE">EPARGNE</MenuItem>
        </TextField>
        <Button
          variant="contained"
          onClick={handleAddCompte}
          sx={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#0056b3' },
          }}
        >
          Ajouter Compte
        </Button>
      </Box>
    </Box>
  );
};

export default AddCompte;
