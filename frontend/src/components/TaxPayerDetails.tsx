import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backend } from '../../declarations/backend';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

interface TaxPayer {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string | null;
}

const TaxPayerDetails: React.FC = () => {
  const { tid } = useParams<{ tid: string }>();
  const navigate = useNavigate();
  const [taxPayer, setTaxPayer] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<TaxPayer | null>(null);

  useEffect(() => {
    fetchTaxPayer();
  }, [tid]);

  const fetchTaxPayer = async () => {
    if (!tid) return;
    try {
      const result = await backend.getTaxPayerByTID(BigInt(tid));
      if ('ok' in result) {
        setTaxPayer(result.ok);
        setFormData(result.ok);
      } else {
        alert(`Error fetching TaxPayer: ${result.err}`);
      }
    } catch (error) {
      console.error('Error fetching tax payer:', error);
      alert('An error occurred while fetching the TaxPayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      const result = await backend.updateTaxPayer(
        formData.tid,
        formData.firstName,
        formData.lastName,
        formData.address ? [formData.address] : []
      );
      if ('ok' in result) {
        alert('TaxPayer updated successfully');
        setTaxPayer(formData);
        setEditing(false);
      } else {
        alert(`Error updating TaxPayer: ${result.err}`);
      }
    } catch (error) {
      console.error('Error updating tax payer:', error);
      alert('An error occurred while updating the TaxPayer.');
    }
  };

  const handleDelete = async () => {
    if (!taxPayer) return;
    if (window.confirm('Are you sure you want to delete this TaxPayer?')) {
      try {
        const result = await backend.deleteTaxPayer(taxPayer.tid);
        if ('ok' in result) {
          alert('TaxPayer deleted successfully');
          navigate('/taxpayers');
        } else {
          alert(`Error deleting TaxPayer: ${result.err}`);
        }
      } catch (error) {
        console.error('Error deleting tax payer:', error);
        alert('An error occurred while deleting the TaxPayer.');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (!taxPayer) {
    return <Typography>TaxPayer not found</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        TaxPayer Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="tid"
          label="TID"
          value={taxPayer.tid.toString()}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData?.firstName || ''}
          onChange={handleInputChange}
          disabled={!editing}
        />
        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData?.lastName || ''}
          onChange={handleInputChange}
          disabled={!editing}
        />
        <TextField
          margin="normal"
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formData?.address || ''}
          onChange={handleInputChange}
          disabled={!editing}
        />
        {editing ? (
          <>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>
              Save
            </Button>
            <Button onClick={() => setEditing(false)} variant="outlined" sx={{ mt: 2 }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditing(true)} variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>
              Edit
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" sx={{ mt: 2 }}>
              Delete
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default TaxPayerDetails;
