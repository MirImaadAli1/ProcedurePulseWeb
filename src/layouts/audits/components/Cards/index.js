import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableRow,
  IconButton, Collapse, Typography, Box, Paper, Button
} from '@mui/material';
import { AddCircleOutlineOutlined, EditOutlined, DeleteOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import MDTypography from 'components/MDTypography';
import { Pie } from 'react-chartjs-2';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../Firebase'; // Adjust the import path as needed
import '../../../../chartSetup'; // Import chart setup file
import ViewResponseModal from 'components/Modals/ViewResponse'; // Import the modal

const AuditsTable = ({ forms, handleEdit, handleDelete }) => {
  const [openRow, setOpenRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [auditData, setAuditData] = useState({});
  const [viewToggle, setViewToggle] = useState('responses'); // Default view to responses
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const fetchAuditData = async (auditId) => {
    if (!auditId) {
      console.error('Audit ID is undefined or null');
      return;
    }
  
    try {
      // Check if auditId is a valid string
      console.log('Fetching data for audit ID:', auditId);
  
      const sharedAuditsRef = collection(db, 'SharedAudits');
      const sharedAuditsQuery = query(sharedAuditsRef, where('auditId', '==', auditId));
      const sharedAuditSnapshot = await getDocs(sharedAuditsQuery);
  
      if (sharedAuditSnapshot.empty) {
        console.warn('No shared audits found for this audit ID.');
      }
  
      const sharedWith = sharedAuditSnapshot.docs.flatMap(doc => {
        const data = doc.data();
        console.log('Shared Audits Data:', data);
        return data.sharedWith || [];
      });
  
      // Ensure no undefined values in sharedWith
      const uniqueSharedWith = [...new Set(sharedWith.filter(id => id))];
  
      const responsesRef = collection(db, 'Responses');
      const responsesQuery = query(responsesRef, where('auditId', '==', auditId));
      const responsesSnapshot = await getDocs(responsesQuery);
  
      if (responsesSnapshot.empty) {
        console.warn('No responses found for this audit ID.');
      }
  
      const respondedUserIds = responsesSnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Response Data:', data);
        return data.responderId;
      }).filter(id => id); // Ensure no undefined values
  
      const usersRef = collection(db, 'Users');
      const usersQuery = query(usersRef, where('uid', 'in', [...new Set([...uniqueSharedWith, ...respondedUserIds])]));
      const usersSnapshot = await getDocs(usersQuery);
  
      const users = {};
      usersSnapshot.docs.forEach(doc => {
        const userData = doc.data();
        if (userData.uid) {
          users[userData.uid] = userData.name;
        }
      });
  
      const sharedWithUsers = uniqueSharedWith.map(uid => ({ uid, name: users[uid] || 'Unknown' }));
      const respondents = respondedUserIds.map(uid => ({ uid, name: users[uid] || 'Unknown' }));
  
      setAuditData({
        sharedWithUsers,
        respondents,
        totalShared: uniqueSharedWith.length,
        totalResponded: respondedUserIds.length,
      });
  
    } catch (error) {
      console.error('Error fetching audit data:', error);
    }
  };
  

  const handleViewResponse = async (responderId) => {
    try {
      const responsesRef = collection(db, 'Responses');
      const responseQuery = query(responsesRef, where('auditId', '==', expandedRow), where('responderId', '==', responderId));
      const responseSnapshot = await getDocs(responseQuery);

      if (!responseSnapshot.empty) {
        const responseData = responseSnapshot.docs[0].data();
        const answers = responseData.answers; // Should be an array

        // Add auditId to the response data
        const responseWithAuditId = {
          ...responseData,
          auditId: expandedRow,
        };

        setSelectedResponse(responseWithAuditId); // Set the entire response object with auditId
        setModalOpen(true); // Open the modal when a response is selected
      } else {
        console.log("No response found for this user.");
      }
    } catch (error) {
      console.error("Error fetching the response:", error);
    }
  };
  

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedResponse(null); // Clear selected response
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

  const handleViewToggle = (view) => {
    setViewToggle(view);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {forms.map((form) => (
              <React.Fragment key={form.id}>
                <TableRow>
                  <TableCell>
                    <MDTypography
                      variant="body1"
                      fontWeight="regular"
                      sx={{
                        maxWidth: '500px',
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                      }}
                    >
                      {form.title}
                    </MDTypography>
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
                  <TableCell colSpan={2} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={openRow === form.id} timeout="auto" unmountOnExit>
                      <Box>
                        <Typography sx={{marginBottom: '0.5rem' }}>
                          <strong>Description:</strong> {form.description}
                        </Typography>
                        {form.questions && form.questions.length > 0 ? (
                          form.questions.map((question, index) => (
                            <Typography key={index}>
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
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                          <Button
                            onClick={() => handleViewToggle('responses')}
                            variant={viewToggle === 'responses' ? 'contained' : 'outlined'}
                            sx={{ marginRight: '0.5rem' }}
                          >
                            Total Responses
                          </Button>
                          <Button
                            onClick={() => handleViewToggle('shared')}
                            variant={viewToggle === 'shared' ? 'contained' : 'outlined'}
                          >
                            Shared Users
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                        {viewToggle === 'responses' && (
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">Total Responses ({auditData.totalResponded}):</Typography>
                            {auditData.respondents && auditData.respondents.length > 0 ? (
                              auditData.respondents.map((respondent, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    padding: '0.5rem',
                                    marginBottom: '0.5rem',
                                    display: 'flex', // Added to align items horizontally
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Typography variant="body2">{respondent.name}</Typography>
                                  <Button variant="outlined" size="small" onClick={() => handleViewResponse(respondent.uid)}>
                                    View Response
                                  </Button>
                                </Box>
                              ))
                            ) : (
                              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                No responses available
                              </Typography>
                            )}
                          </Box>
                        )}
                        {viewToggle === 'shared' && (
                          <>
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
                                      display: 'flex', // Added to align items horizontally
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <Typography variant="body2">{user.name}</Typography>
                                  </Box>
                                ))
                              ) : (
                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                  No users available
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Pie
                                data={{
                                  labels: ['Responded', 'Not Responded'],
                                  datasets: [
                                    {
                                      data: [auditData.totalResponded, auditData.totalShared - auditData.totalResponded],
                                      backgroundColor: ['#36a2eb', '#ff6384'],
                                    },
                                  ],
                                }}
                              />
                              <Typography variant="body2">
                                {auditData.totalResponded} out of {auditData.totalShared} responded
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {modalOpen && (
        <ViewResponseModal
          open={modalOpen}
          onClose={handleCloseModal}
          response={selectedResponse}
        
        />
      )}
    </>
  );
};

AuditsTable.propTypes = {
  forms: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AuditsTable;
