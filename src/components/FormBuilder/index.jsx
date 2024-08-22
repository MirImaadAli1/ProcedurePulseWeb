import React, { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { TextFieldInput } from './elements';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from '@mui/material';
import Header from './Header';
import { db } from '../../Firebase';
import SuccessModal from 'components/Modals/SuccessModal';

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [createdAuditId, setCreatedAuditId] = useState(''); // State to hold the auditId

  const items = data;

  const handleSubmit = async () => {
    try {
      const auditId = uuid();
      const auditCollectionRef = collection(db, 'Audit');
      const docRef = await addDoc(auditCollectionRef, {
        id: auditId,
        title,
        description,
        questions: data.map((item, index) => ({
          questionNumber: `Question ${index + 1}`,
          value: item.value,
          yesNoChecked: item.yesNoChecked,
          commentsChecked: item.commentsChecked,
          imageChecked: item.imageChecked,
        })),
      });

      console.log('Document written with ID: ', docRef.id);
      setTitle(''); // Clear title
      setDescription(''); // Clear description
      setData([]); // Clear the questions
      setCreatedAuditId(auditId); // Set the created auditId
      setOpenModal(true); // Show the modal on success
      const user = auth.currentUser; // Get the current user
  
      if (user) {
        const auditCollectionRef = collection(db, 'Audit');
  
        // Create a new document in the "Audit" collection with the user ID
        const docRef = await addDoc(auditCollectionRef, {
          title,
          description,
          userId: user.uid, // Store the user ID
          questions: data.map((item, index) => ({
            question: `Question ${index + 1}`,
            ...item,
          })),
        });
  
        console.log('Document written with ID: ', docRef.id);
        setMessageType('success'); // Set message type
        setMessage('Form saved successfully!'); // Set success message
      } else {
        setMessageType('error');
        setMessage('User not logged in.'); // Handle case when user is not logged in
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  
  //Function to add new element
  const addElement = () => {
    const data = {
      id: uuid(),
      value: '',
      yesNoChecked: true,
      commentsChecked: true,
      imageChecked: true,
    };
    setData((prevState) => [...prevState, data]);
  };

  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  const handleValue = (id, e) => {
    setData((prevState) =>
      prevState.map((el) =>
        el.id === id ? { ...el, value: e.target.value } : el
      )
    );
  };

  const handleCheckboxChange = (id, checkboxState) => {
    setData((prevState) =>
      prevState.map((el) =>
        el.id === id ? { ...el, ...checkboxState } : el
      )
    );
  };

  const renderElements = ({ item }) => {
    return (
      <TextFieldInput
        item={item}
        handleValue={handleValue}
        handleCheckboxChange={handleCheckboxChange}
        deleteEl={deleteEl}
      />
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={5}>
          <Header
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          <Nestable
            items={items}
            renderItem={renderElements}
            onChange={handleOnChangeSort}
          />
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              style={{ marginTop: '1rem', float: 'right' }}
            >
              <AddCircleOutlineOutlinedIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: '1rem' }}
            fullWidth
          >
            Save Form
          </Button>
        </Grid>
      </Grid>
      <SuccessModal
        open={openModal}
        handleClose={handleCloseModal}
        auditId={createdAuditId} // Pass the created auditId to the modal
      />
    </Fragment>
  );
};

export default FormBuilder;
