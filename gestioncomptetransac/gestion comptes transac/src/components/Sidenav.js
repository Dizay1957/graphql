import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Navbar = () => {
  const [anchorElCompte, setAnchorElCompte] = React.useState(null);
  const [anchorElTransaction, setAnchorElTransaction] = React.useState(null);

  const openCompteMenu = (event) => setAnchorElCompte(event.currentTarget);
  const closeCompteMenu = () => setAnchorElCompte(null);

  const openTransactionMenu = (event) => setAnchorElTransaction(event.currentTarget);
  const closeTransactionMenu = () => setAnchorElTransaction(null);

  return (
    <>
      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(145deg, #1c1c2d, #292943)',
          color: 'white',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo or Title */}
          <Typography variant="h6" fontWeight="bold">
            Dashboard
          </Typography>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Gestion de compte */}
            <Box>
              <Button
                onClick={openCompteMenu}
                endIcon={<ExpandMore />}
                sx={{
                  color: 'white',
                  fontSize: 16,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#333' },
                }}
              >
                Gestion de compte
              </Button>
              <Menu
                anchorEl={anchorElCompte}
                open={Boolean(anchorElCompte)}
                onClose={closeCompteMenu}
                sx={{ '& .MuiPaper-root': { backgroundColor: '#292943', color: 'white' } }}
              >
                <MenuItem
                  component={Link}
                  to="/comptes"
                  onClick={closeCompteMenu}
                  sx={{ '&:hover': { backgroundColor: '#444' } }}
                >
                  Liste des comptes
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/ajout-compte"
                  onClick={closeCompteMenu}
                  sx={{ '&:hover': { backgroundColor: '#444' } }}
                >
                  Ajout de compte
                </MenuItem>
              </Menu>
            </Box>

            {/* Gestion de transactions */}
            <Box>
              <Button
                onClick={openTransactionMenu}
                endIcon={<ExpandMore />}
                sx={{
                  color: 'white',
                  fontSize: 16,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#333' },
                }}
              >
                Gestion de transactions
              </Button>
              <Menu
                anchorEl={anchorElTransaction}
                open={Boolean(anchorElTransaction)}
                onClose={closeTransactionMenu}
                sx={{ '& .MuiPaper-root': { backgroundColor: '#292943', color: 'white' } }}
              >
                <MenuItem
                  component={Link}
                  to="/transactions"
                  onClick={closeTransactionMenu}
                  sx={{ '&:hover': { backgroundColor: '#444' } }}
                >
                  Transactions
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/ajout-transaction"
                  onClick={closeTransactionMenu}
                  sx={{ '&:hover': { backgroundColor: '#444' } }}
                >
                  Ajout d'une transaction
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content below the navbar */}
      <Box
        sx={{
          marginTop: '64px', // Adjust to match AppBar height
          padding: 3,
          backgroundColor: '#f9f9f9',
          minHeight: '100vh',
        }}
      >
      </Box>
    </>
  );
};

export default Navbar;
