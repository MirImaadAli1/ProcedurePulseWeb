import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField
} from '@mui/material';
import { AddCircleOutlineOutlined, EditOutlined } from '@mui/icons-material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const AuditsTable = ({ forms, handleEdit }) => {
  const [openRow, setOpenRow] = useState(null);

  const handleToggle = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <MDTypography variant="h6" fontWeight="medium">Title</MDTypography>
            </TableCell>
            <TableCell>
              <MDTypography variant="h6" fontWeight="medium">Description</MDTypography>
            </TableCell>
            <TableCell align="center">
              <MDTypography variant="h6" fontWeight="medium">Actions</MDTypography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((form) => (
            <React.Fragment key={form.id}>
              <TableRow>
                <TableCell>
                  <MDTypography variant="body1" fontWeight="regular">{form.title}</MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1" fontWeight="regular">{form.description}</MDTypography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleToggle(form.id)}>
                    <AddCircleOutlineOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(form)}>
                    <EditOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={openRow === form.id} timeout="auto" unmountOnExit>
                    <Box sx={dropdownStyle}>
                      {form.questions && form.questions.length > 0 ? (
                        form.questions.map((question, index) => (
                          <Typography key={index} sx={questionStyle}>
                            <strong>Question {index + 1}: </strong>
                            {question.question}
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
          question: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default AuditsTable;
