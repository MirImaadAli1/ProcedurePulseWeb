import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { collection, query, where, getDocs, addDoc, startAt, endAt } from 'firebase/firestore';
import { db, auth } from '../../Firebase.js'; // Adjust path if necessary

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

const ShareModal = ({ open, handleClose, auditId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  console.log("hai", auditId)

  useEffect(() => {
    if (searchTerm) {
      const fetchUsers = async () => {
        const q = query(
          collection(db, 'Users'),
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff') // Ensure it captures names starting with searchTerm
        );
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      };
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.find((u) => u.id === user.id)) {
        return prevSelectedUsers.filter((u) => u.id !== user.id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleShare = async () => {
    const currentUser = auth.currentUser;

    for (let user of selectedUsers) {
      await addDoc(collection(db, 'SharedAudits'), {
        sharedBy: currentUser.uid,
        sharedWith: user.id,
        auditId,
        sharedAt: new Date(),
      });
    }

    handleClose(); // Close the modal after sharing
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
          sx={{ mt: 2, mb: 2 }}
        />
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleUserSelect(user)}
              selected={selectedUsers.some((u) => u.id === user.id)}
            >
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleShare} disabled={selectedUsers.length === 0}>
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
