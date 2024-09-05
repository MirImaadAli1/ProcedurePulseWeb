import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Box, Typography } from '@mui/material';

const CaughtUp = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%" // Ensure the Box takes the full height of its parent
    >
      <MdCheckCircle size={48} color="#4CAF50" />
      <Typography variant="h6" mt={2}>
        You're all caught up!
      </Typography>
    </Box>
  );
};

export default CaughtUp;
