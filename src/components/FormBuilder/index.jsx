import React, { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { TextFieldInput } from './elements';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { Button, Alert } from '@mui/material'; // Import Alert from MUI
import Header from './Header';
import { db, auth } from '../../Firebase';
import SuccessModal from 'components/Modals/SuccessModal';

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [createdAuditId, setCreatedAuditId] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

  const items = data;

  const handleSubmit = async () => {
    if (!title || !description) {
      setShowAlert(true); // Show alert if title or description is empty
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const auditId = uuid();
      const creationDate = new Date();
      const auditCollectionRef = collection(db, 'Audit');
      const docRef = doc(auditCollectionRef, auditId); // Specify the document ID as auditId
      await setDoc(docRef, {
        userId: user.uid,
        title,
        description,
        questions: data.map((item, index) => ({
          questionNumber: `Question ${index + 1}`,
          value: item.value,
          yesNoChecked: item.yesNoChecked,
          commentsChecked: item.commentsChecked,
          imageChecked: item.imageChecked,
        })),
        createdAt: creationDate,
      });

      console.log('Document written with ID: ', docRef.id);
      setTitle('');
      setDescription('');
      setData([]);
      setCreatedAuditId(auditId);
      setOpenModal(true);
      setShowAlert(false); // Hide the alert on successful submission
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

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
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={5}>
          {showAlert && (
            <Alert severity="error" onClose={() => setShowAlert(false)} style={{ marginBottom: '1rem' }}>
              Please fill in the title and description.
            </Alert>
          )}
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
        auditId={createdAuditId}
      />
    </Fragment>
  );
};

export default FormBuilder;
