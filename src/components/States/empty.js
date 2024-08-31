import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ReactComponent as RobotEmpty } from '../../assets/images/robot-svgrepo-com.svg'; // Ensure the path is correct

const EmptyState = () => {
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
            <RobotEmpty style={{ width: '150px', height: '150px', marginBottom: '20px' }} />
            <Typography variant="h4" mb={2}> {/* Apply margin-bottom directly here */}
                Nothing to see here!
            </Typography>
        </Box>
    );
};

export default EmptyState;
