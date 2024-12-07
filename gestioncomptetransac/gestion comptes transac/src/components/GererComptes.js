import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COMPTES, DELETE_COMPTE } from '../graphql/comptes';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';

const GererComptes = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  const [deleteCompte] = useMutation(DELETE_COMPTE, {
    // Refetch the GET_ALL_COMPTES query after the mutation
    update(cache, { data: { deleteCompte } }) {
      console.log("Mutation response:", deleteCompte); // Log the mutation response

      // If deleteCompte is returned successfully, update the cache
      if (deleteCompte) {
        const existingComptes = cache.readQuery({ query: GET_ALL_COMPTES });
        console.log("Existing comptes in cache:", existingComptes); // Log cache content

        if (existingComptes) {
          // Remove the deleted compte from the list based on its id
          const updatedComptes = existingComptes.allComptes.filter(
            (compte) => compte.id !== deleteCompte.id
          );

          // Write the updated list of comptes back into the cache
          cache.writeQuery({
            query: GET_ALL_COMPTES,
            data: { allComptes: updatedComptes },
          });
        }
      }
    },
    onError(err) {
      console.error("Error during delete mutation:", err);
      alert('Erreur lors de la suppression du compte.');
    },
    onCompleted(data) {
      console.log("Delete completed:", data);
      alert('Compte supprimé avec succès.');
    },
  });

  const [formData, setFormData] = useState({ solde: '', dateCreation: '', type: '' });

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">Erreur : {error.message}</Typography>;

  // Handling case where data might be empty
  if (!data || !data.allComptes || data.allComptes.length === 0) {
    return <Typography color="error">Aucun compte disponible</Typography>;
  }

  // Handle delete function
  const handleDelete = (compte) => {
    console.log("Deleting compte:", compte); // Log compte object to inspect it
    if (compte && compte.id) {
      deleteCompte({ variables: { id: compte.id } }); // Pass the compte id to the mutation
    } else {
      console.error("Invalid compte object, cannot delete.");
    }
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
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Liste des comptes
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
                  transform: 'scale(1.05)',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                },
                maxWidth: '100%',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {compte.type}
                </Typography>
                <Typography sx={{ color: '#555' }}>Solde : {compte.solde} €</Typography>
                <Typography sx={{ color: '#555' }}>Date de création : {compte.dateCreation}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(compte)} // Trigger delete with logging
                >
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GererComptes;
