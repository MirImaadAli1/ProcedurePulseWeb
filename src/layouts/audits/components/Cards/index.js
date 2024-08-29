import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Typography, Box, Paper
} from '@mui/material';
import { AddCircleOutlineOutlined, EditOutlined, DeleteOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import MDTypography from 'components/MDTypography';
import { Pie } from 'react-chartjs-2';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../Firebase'; // Adjust the import path as needed
import '../../../../chartSetup'; // Import chart setup file

const AuditsTable = ({ forms, handleEdit, handleDelete }) => {
  const [openRow, setOpenRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [auditData, setAuditData] = useState({});

  // Function to fetch the audit data
  const fetchAuditData = async (auditId) => {
    try {
      console.log("Fetching data for auditId:", auditId);

      // Fetch users who received the audit
      const sharedAuditsRef = collection(db, 'SharedAudits');
      const sharedAuditsQuery = query(sharedAuditsRef, where('auditId', '==', auditId));
      const sharedAuditSnapshot = await getDocs(sharedAuditsQuery);

      // Collect all sharedWith values
      const sharedWith = sharedAuditSnapshot.docs.flatMap(doc => doc.data().sharedWith);

      // Fetch responses
      const responsesRef = collection(db, 'Responses');
      const responsesQuery = query(responsesRef, where('auditId', '==', auditId));
      const responsesSnapshot = await getDocs(responsesQuery);

      const respondedUserIds = responsesSnapshot.docs.map(doc => doc.data().responderId);

      // Fetch user details
      const usersRef = collection(db, 'Users');
      const usersQuery = query(usersRef, where('uid', 'in', [...new Set([...sharedWith, ...respondedUserIds])]));
      const usersSnapshot = await getDocs(usersQuery);

      const users = {};
      usersSnapshot.docs.forEach(doc => {
        const userData = doc.data();
        users[userData.uid] = userData.name;
      });

      // Prepare data for the audit
      const sharedWithUsers = sharedWith.map(uid => ({ uid, name: users[uid] || 'Unknown' }));
      const respondents = respondedUserIds.map(uid => users[uid] || 'Unknown');

      setAuditData({
        sharedWithUsers,
        respondents,
        totalShared: sharedWith.length,
        totalResponded: respondedUserIds.length,
      });

    } catch (error) {
      console.error('Error fetching audit data:', error);
    }
  };

  useEffect(() => {
    if (expandedRow) {
      fetchAuditData(expandedRow);
    }
  }, [expandedRow]);

  const handleToggle = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const handleExpandToggle = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
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
                  <IconButton
                    onClick={() => handleExpandToggle(form.id)}
                    aria-label={expandedRow === form.id ? 'Collapse details' : 'Expand details'}
                  >
                    <ExpandMoreOutlined />
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
              {expandedRow === form.id && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">Shared With ({auditData.totalShared}):</Typography>
                        {auditData.sharedWithUsers && auditData.sharedWithUsers.length > 0 ? (
                          auditData.sharedWithUsers.map((user, index) => (
                            <Box
                              key={index}
                              sx={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '0.5rem',
                                marginBottom: '0.5rem',
                              }}
                            >
                              <Typography variant="body2">{user.name}</Typography>
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                            No users shared with
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ flex: 1 , mt:3.5 }}>
                        <Box>
                          <Pie
                            data={{
                              labels: ['Responded', 'Not Responded'],
                              datasets: [
                                {
                                  data: [auditData.totalResponded, auditData.totalShared - auditData.totalResponded],
                                  backgroundColor: ['#4caf50', '#f44336'],
                                },
                              ],
                            }}
                            options={{ responsive: true, maintainAspectRatio: false }}
                            height={100}
                            width={100}
                          />
                        </Box>
                        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '0.5rem' }}>
                          {auditData.totalResponded} / {auditData.totalShared}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
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
