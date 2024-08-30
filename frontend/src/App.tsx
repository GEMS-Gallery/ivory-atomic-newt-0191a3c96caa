import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Home from './components/Home';
import TaxPayerList from './components/TaxPayerList';
import AddTaxPayer from './components/AddTaxPayer';
import TaxPayerDetails from './components/TaxPayerDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaxPayer Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/taxpayers">TaxPayers</Button>
          <Button color="inherit" component={Link} to="/add-taxpayer">Add TaxPayer</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/taxpayers" element={<TaxPayerList />} />
          <Route path="/add-taxpayer" element={<AddTaxPayer />} />
          <Route path="/taxpayer/:tid" element={<TaxPayerDetails />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
