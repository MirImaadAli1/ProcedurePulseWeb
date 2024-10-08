import React, { Fragment, useState, Suspense } from 'react';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { collection, doc, setDoc } from 'firebase/firestore';
import Alert from '@mui/material/Alert'; // Specific import for MUI Alert
import { db, auth } from '../../Firebase';
import SuccessModal from 'components/Modals/SuccessModal';
import Header from './Header';
const TextFieldInput = React.lazy(() => import('./elements/TextField'));

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [createdAuditId, setCreatedAuditId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showQuestionAlert, setShowQuestionAlert] = useState(false); // New state for question alert

  const handleSubmit = async () => {
    if (!title || !description) {
      setShowAlert(true);
      return;
    }

    if (data.length === 0) { // Check if there are no questions
      setShowQuestionAlert(true); // Show the error for no questions
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
      const docRef = doc(auditCollectionRef, auditId);

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

      setTitle('');
      setDescription('');
      setData([]);
      setCreatedAuditId(auditId);

    } catch (e) {
      console.error('Error adding document: ', e);
      setShowAlert(true);
    } finally {
      setOpenModal(true);
      setShowAlert(false);
      setShowQuestionAlert(false); // Reset question alert state
    }
  };

  const addElement = () => {
    setData(prevState => [
      ...prevState,
      {
        id: uuid(),
        value: '',
        yesNoChecked: true,
        commentsChecked: true,
        imageChecked: true
      }
    ]);
  };

  const deleteEl = (id) => {
    setData(prevState => prevState.filter(val => val.id !== id));
  };

  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  const handleValue = (id, e) => {
    setData(prevState =>
      prevState.map(el =>
        el.id === id ? { ...el, value: e.target.value } : el
      )
    );
  };

  const handleCheckboxChange = (id, checkboxState) => {
    setData(prevState =>
      prevState.map(el =>
        el.id === id ? { ...el, ...checkboxState } : el
      )
    );
  };

  const renderElements = ({ item }) => (
    <Suspense fallback={<div>Loading Question...</div>}>
      <TextFieldInput
        item={item}
        handleValue={handleValue}
        handleCheckboxChange={handleCheckboxChange}
        deleteEl={deleteEl}
      />
    </Suspense>
  );

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
          {showQuestionAlert && (
            <Alert severity="error" onClose={() => setShowQuestionAlert(false)} style={{ marginBottom: '1rem' }}>
              Please submit at least 1 question.
            </Alert>
          )}

          <Header
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />

          <Nestable
            items={data}
            renderItem={renderElements}
            onChange={handleOnChangeSort}
          />
          <Tooltip title="Click Here to Add Questions" aria-label="add-element">
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              style={{ marginTop: '1rem', float: 'right' }}
            >
              <AddCircleOutlineOutlinedIcon color="primary" />
            </IconButton>
          </Tooltip>
          <button className="bg-blue-600 text-white font-semibold rounded-md whitespace-nowrap mr-2"
            onClick={(handleSubmit)}
            style={{
              width: '100%', // Makes the button full width like `fullWidth` in Material-UI
              padding: '6px 16px', // Matches Material-UI's default padding for contained buttons
              fontSize: '0.875rem', // Default font-size for Material-UI buttons (14px)
              minHeight: '36px', // Default minimum height for Material-UI buttons
              marginTop: '1rem', // To match the `marginTop` of 1rem in your second button
            }}>
            Save Audit
          </button>

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
