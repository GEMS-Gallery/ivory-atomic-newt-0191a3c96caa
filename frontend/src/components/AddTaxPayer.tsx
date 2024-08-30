import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
}

const AddTaxPayer: React.FC = () => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await backend.createTaxPayer(data.firstName, data.lastName, data.address ? [data.address] : []);
      if ('ok' in result) {
        alert(`TaxPayer created successfully with TID: ${result.ok}`);
        reset();
      } else {
        alert(`Error creating TaxPayer: ${result.err}`);
      }
    } catch (error) {
      console.error('Error creating tax payer:', error);
      alert('An error occurred while creating the TaxPayer.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New TaxPayer
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              id="address"
              label="Address"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Add TaxPayer'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTaxPayer;
