import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Typography, Box, Paper
} from '@mui/material';
import { AddCircleOutlineOutlined, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import MDTypography from 'components/MDTypography';

const AuditsTable = ({ forms, handleEdit, handleDelete }) => {
  const [openRow, setOpenRow] = useState(null);

  // Toggle function to expand/collapse row details
  const handleToggle = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* <TableHead>
          <TableRow>
            <TableCell>
              <MDTypography variant="h6" fontWeight="medium">Title</MDTypography>
            </TableCell>
            <TableCell align="center">
              <MDTypography variant="h6" fontWeight="medium">Actions</MDTypography>
            </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {forms.map((form) => (
            <React.Fragment key={form.id}>
              <TableRow>
                <TableCell>
                  <MDTypography variant="body1" fontWeight="regular">{form.title}</MDTypography>
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => handleToggle(form.id)}
                    aria-label={openRow === form.id ? 'Collapse row' : 'Expand row'}
                  >
                    <AddCircleOutlineOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(form)} aria-label="Edit form">
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(form.id)} aria-label="Delete form">
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={openRow === form.id} timeout="auto" unmountOnExit>
                    <Box sx={dropdownStyle}>
                      <Typography sx={{ ...questionStyle, marginBottom: '0.5rem' }}>
                        <strong>Description:</strong> {form.description}
                      </Typography>
                      {form.questions && form.questions.length > 0 ? (
                        form.questions.map((question, index) => (
                          <Typography key={index} sx={questionStyle}>
                            <strong>Question {index + 1}: </strong>
                            {question.value}
                          </Typography>
                        ))
                      ) : (
                        <Typography sx={{ fontStyle: 'italic', color: '#555' }}>
                          No questions available
                        </Typography>
                      )}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Styles for dropdown and question display
const dropdownStyle = {
  marginTop: '0.5rem',
  paddingLeft: '1rem',
  borderLeft: '2px solid #328CED',
};

const questionStyle = {
  padding: '0.5rem 0',
  fontSize: '0.9rem',
  color: '#333',
};

AuditsTable.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AuditsTable;
