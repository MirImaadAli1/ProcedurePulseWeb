import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../../Firebase.js'; // Adjust path if necessary
import Fuse from 'fuse.js';

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

const listItemStyle = {
  padding: '12px 16px',
  border: '1px solid #ccc', // Add border to the ListItem
  borderRadius: '10px', // Rounded corners
  marginBottom: '10px', // Space between search results
};

const selectedListItemStyle = {
  ...listItemStyle,
  border: '2px solid #328CED', // Blue border for selected items
};

const selectedUserChipStyle = {
  border: '1px solid #ccc', // Optional border
  borderRadius: '10px', // Rounded corners
  backgroundColor: '#4CAF50', // Green background color
  color: '#fff', // White text color
  margin: '4px',
  padding: '8px 16px', // Padding inside the Chip
};

const resultContainerStyle = {
  maxHeight: '300px', // Set a maximum height for the results container
  overflowY: 'auto', // Enable vertical scrolling
  marginTop: '16px',
};

const ShareModal = ({ open, handleClose, auditId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [shareArrayList, setShareArrayList] = useState([]); // Array to visually track selected users
  const [message, setMessage] = useState(''); // State to handle the success message
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'Users'));
      const querySnapshot = await getDocs(q);
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);

      const fuseInstance = new Fuse(usersList, {
        keys: ['name'],
        threshold: 0.3,
      });
      setFuse(fuseInstance);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = fuse.search(searchTerm).map(result => result.item);
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, fuse]);

  const handleUserSelect = (user) => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.find(u => u.id === user.id)) {
        return prevSelectedUsers.filter(u => u.id !== user.id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });

    setShareArrayList(prevShareArrayList => {
      if (prevShareArrayList.find(u => u.id === user.id)) {
        return prevShareArrayList.filter(u => u.id !== user.id);
      } else {
        return [...prevShareArrayList, user];
      }
    });
  };

  const handleShare = async () => {
    const currentUser = auth.currentUser;

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

    setMessage('Audit successfully shared!'); // Show success message
    setSelectedUsers([]);
    setShareArrayList([]);
    setSearchTerm('');
    setTimeout(() => {
      setMessage(''); // Clear the message after 2 seconds
      handleClose(); // Close the modal after the message is shown
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-share-title"
      aria-describedby="modal-share-description"
      BackdropProps={{
        style: {
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <Box sx={style}>
        <Typography id="modal-share-title" variant="h6" component="h2" sx={{ mt: 2 }}>
          Share Audit
        </Typography>
        <TextField
          fullWidth
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mt: 2,
            mb: 2,
            '& .MuiInputBase-root': {
              height: '60px', // Increase height of the input field
            },
            '& .MuiInputBase-input': {
              fontSize: '1.5rem', // Increase font size
            }
          }}
        />
        {searchTerm === "" && !filteredUsers.length && (
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            No results found
          </Typography>
        )}
        {filteredUsers.length > 0 && (
          <Box sx={resultContainerStyle}>
            <List>
              {filteredUsers.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  onClick={() => handleUserSelect(user)}
                  style={
                    selectedUsers.some((u) => u.id === user.id)
                      ? selectedListItemStyle
                      : listItemStyle
                  }
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {shareArrayList.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Users:
            </Typography>
            {shareArrayList.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                onDelete={() => handleUserSelect(user)} // Allow removal of users from the list
                style={selectedUserChipStyle}
              />
            ))}
          </Box>
        )}
        {message && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{
              color: '#000000',
              borderRadius: '10px',
              backgroundColor: '#f0f0f0',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShare}
            disabled={shareArrayList.length === 0}
            style={{ color: 'white', backgroundColor: '#2563eb', borderRadius: '10px', padding: '10px 20px' }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ShareModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  auditId: PropTypes.string.isRequired,
};

export default ShareModal;
