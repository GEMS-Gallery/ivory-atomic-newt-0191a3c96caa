import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Home: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to TaxPayer Management System
      </Typography>
      <Typography variant="body1" paragraph>
        This application allows you to manage TaxPayer records efficiently.
      </Typography>
      <Box
        component="img"
        sx={{
          width: '100%',
          maxHeight: 400,
          objectFit: 'cover',
          borderRadius: 2,
          mt: 2,
        }}
        alt="Tax office professional"
        src="https://images.unsplash.com/photo-1491947153227-33d59da6c448?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUwMjk4MTd8&ixlib=rb-4.0.3"
      />
      <Typography variant="caption" display="block" textAlign="right" mt={1}>
        Photo by <a href="https://unsplash.com/photos/apple-magic-keyboard-and-mouse-CjS3QsRuxnE" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </Typography>
    </Paper>
  );
};

export default Home;
