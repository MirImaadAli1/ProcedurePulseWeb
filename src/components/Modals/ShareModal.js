import React, { useState, useEffect } from 'react'; // Importing React, useState for state management, and useEffect for side effects.
import { Box, Modal, Typography, Button, TextField, List, ListItem, ListItemText, Alert, Chip } from '@mui/material'; // Importing Material-UI components for the UI.
import PropTypes from 'prop-types'; // Importing PropTypes for prop validation.
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'; // Importing Firestore functions.
import { db, auth } from '../../Firebase.js'; // Importing Firebase db and authentication (adjust path if necessary).

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: '10px',
};

// List item styling for search results
const listItemStyle = {
  padding: '12px 16px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  marginBottom: '10px',
};

// Styling for selected users in the list
const selectedListItemStyle = {
  ...listItemStyle,
  border: '2px solid #328CED',
};

// Chip styling for selected users
const selectedUserChipStyle = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  margin: '4px',
};

const ShareModal = ({ open, handleClose, auditId }) => {
  const [searchTerm, setSearchTerm] = useState(''); // To hold the search term entered by the user
  const [users, setUsers] = useState([]); // To store the list of users fetched from Firestore
  const [selectedUsers, setSelectedUsers] = useState([]); // To store users selected by the current user for sharing
  const [shareArrayList, setShareArrayList] = useState([]); // Array to track selected users visually
  const [message, setMessage] = useState(''); // State for success message

  // Fetch users from Firestore based on the search term
  useEffect(() => {
    if (searchTerm) {
      const fetchUsers = async () => {
        const q = query(
          collection(db, 'Users'),
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff') // Firestore query for searching user names
        );
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList); // Set the user list based on search results
      };
      fetchUsers(); // Trigger the search query
    } else {
      setUsers([]); // Clear users list if search term is empty
    }
  }, [searchTerm]);

  // Handle user selection and deselection
  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.find((u) => u.id === user.id)) {
        return prevSelectedUsers.filter((u) => u.id !== user.id); // Remove if already selected
      } else {
        return [...prevSelectedUsers, user]; // Add user if not selected
      }
    });

    setShareArrayList((prevShareArrayList) => {
      if (prevShareArrayList.find((u) => u.id === user.id)) {
        return prevShareArrayList.filter((u) => u.id !== user.id); // Remove from visual list
      } else {
        return [...prevShareArrayList, user]; // Add to visual list
      }
    });
  };

  // Handle sharing the audit with selected users
  const handleShare = async () => {
    const currentUser = auth.currentUser; // Get the current authenticated user

    // Loop through selected users and add audit share and notification to Firestore
    for (let user of shareArrayList) {
      await addDoc(collection(db, 'SharedAudits'), {
        sharedBy: currentUser.uid,
        sharedWith: user.id,
        auditId,
        sharedAt: new Date(),
      });
      await addDoc(collection(db, 'Notifications'), {
        senderId: currentUser.uid,
        receiverId: user.id,
        auditId: auditId,
        sharedAt: new Date(),
        notificationType: 'auditShare',
        seen: false,
      });
    }

    setMessage('Audit successfully shared!'); // Display success message
    setTimeout(() => {
      setMessage(''); // Clear message after 2 seconds
      handleClose(); // Close the modal
    }, 2000);
  };

  return (
    <Modal
      open={open} // Modal visibility controlled by the open prop
      onClose={handleClose} // Close the modal
      aria-labelledby="modal-share-title"
      aria-describedby="modal-share-description"
      BackdropProps={{
        style: {
          backdropFilter: 'blur(5px)', // Blurs the background
        },
      }}
    >
      <Box sx={style}>
        {/* Title */}
        <Typography id="modal-share-title" variant="h6" component="h2" sx={{ mt: 2 }}>
          Share Audit
        </Typography>
        {/* Search input */}
        <TextField
          fullWidth
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
          sx={{ mt: 2, mb: 2 }}
        />
        {/* List of users based on search results */}
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleUserSelect(user)} // Handle user selection
              style={
                selectedUsers.some((u) => u.id === user.id) // Apply different styles for selected users
                  ? selectedListItemStyle
                  : listItemStyle
              }
            >
              <ListItemText primary={user.name} /> {/* Display user name */}
            </ListItem>
          ))}
        </List>
        {/* Display selected users as chips */}
        {shareArrayList.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Users:
            </Typography>
            {shareArrayList.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                onDelete={() => handleUserSelect(user)} // Allow deselection of users
                sx={selectedUserChipStyle}
              />
            ))}
          </Box>
        )}
        {/* Success message */}
        {message && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
        {/* Buttons for cancel and share */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleShare} disabled={shareArrayList.length === 0}>
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// PropTypes validation for props
ShareModal.propTypes = {
  open: PropTypes.bool.isRequired, // Modal open state
  handleClose: PropTypes.func.isRequired, // Function to close the modal
  auditId: PropTypes.string.isRequired, // ID of the audit being shared
};

export default ShareModal;
