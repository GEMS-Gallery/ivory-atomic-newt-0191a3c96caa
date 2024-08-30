import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backend } from '../../declarations/backend';
import DataTable from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface TaxPayer {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string | null;
}

const TaxPayerList: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result.map(tp => ({
        ...tp,
        tid: BigInt(tp.tid)
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'TID',
      selector: (row: TaxPayer) => Number(row.tid),
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row: TaxPayer) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row: TaxPayer) => row.lastName,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row: TaxPayer) => row.address || 'N/A',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: TaxPayer) => (
        <Link to={`/taxpayer/${row.tid}`}>View Details</Link>
      ),
    },
  ];

  const filteredItems = taxPayers.filter(
    item => item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
           item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
           (item.address && item.address.toLowerCase().includes(filterText.toLowerCase()))
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Filter by name or address"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ mb: 2, mt: 2 }}
      />
      <DataTable
        title="TaxPayer Records"
        columns={columns}
        data={filteredItems}
        pagination
        responsive
        highlightOnHover
      />
    </>
  );
};

export default TaxPayerList;
