import React from 'react';
import { FaRegHourglass } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            color="black"
            bgcolor="transparent" // Ensure background color is transparent
            textAlign="center" // Center the text
        >
            <FaRegHourglass size={100} />
            <Typography variant="h4" mb={2} mt={2}> {/* Apply margin-bottom directly here */}
                loading
            </Typography>
        </Box>
    );
};

export default Loading;
