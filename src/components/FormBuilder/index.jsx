import React, { Fragment, useState } from 'react'; // Importing React and useState for managing component state. Fragment is used to return multiple elements without adding extra nodes.
import uuid from 'react-uuid'; // Importing uuid for generating unique IDs for audit items.
import Nestable from 'react-nestable'; // Importing Nestable to manage drag-and-drop reordering of items.
import Grid from '@material-ui/core/Grid'; // Importing Grid from Material-UI for layout control.
import IconButton from '@material-ui/core/IconButton'; // Importing IconButton from Material-UI for adding buttons with icons.
import Tooltip from '@material-ui/core/Tooltip'; // Importing Tooltip from Material-UI to display tooltips on hover over elements.
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'; // Importing an "add" icon from Material-UI icons.
import { TextFieldInput } from './elements'; // Importing a custom `TextFieldInput` component from the local `elements` directory.
import { collection, doc, setDoc } from 'firebase/firestore'; // Importing Firestore functions to interact with the Firebase Firestore database.
import { Button, Alert } from '@mui/material'; // Importing Button and Alert components from Material-UI.
import Header from './Header'; // Importing a custom `Header` component from the local directory.
import { db, auth } from '../../Firebase'; // Importing Firebase's database and authentication service.
import SuccessModal from 'components/Modals/SuccessModal'; // Importing a custom `SuccessModal` component.

const FormBuilder = () => {
  // Defining the component state using the useState hook.
  const [title, setTitle] = useState(''); // State for storing the title of the form.
  const [description, setDescription] = useState(''); // State for storing the description of the form.
  const [data, setData] = useState([]); // State for storing form items (questions, etc.).
  const [openModal, setOpenModal] = useState(false); // State for managing the visibility of the success modal.
  const [createdAuditId, setCreatedAuditId] = useState(''); // State for storing the ID of the created audit.
  const [showAlert, setShowAlert] = useState(false); // State for managing the visibility of an error alert.

  // Function to handle form submission.
  const handleSubmit = async () => {
    if (!title || !description) { // If title or description is missing, show the error alert.
      setShowAlert(true);
      return;
    }

    try {
      const user = auth.currentUser; // Getting the current authenticated user from Firebase Auth.
      if (!user) { // If no user is authenticated, throw an error.
        throw new Error('User not authenticated');
      }

      const auditId = uuid(); // Generating a unique ID for the audit.
      const creationDate = new Date(); // Getting the current date and time.
      const auditCollectionRef = collection(db, 'Audit'); // Reference to the 'Audit' collection in Firestore.
      const docRef = doc(auditCollectionRef, auditId); // Creating a reference to the document for the new audit.

      // Writing the audit document to Firestore with userId, title, description, questions, and creation date.
      await setDoc(docRef, {
        userId: user.uid,
        title,
        description,
        questions: data.map((item, index) => ({
          questionNumber: `Question ${index + 1}`, // Creating questions with unique numbers.
          value: item.value,
          yesNoChecked: item.yesNoChecked,
          commentsChecked: item.commentsChecked,
          imageChecked: item.imageChecked,
        })),
        createdAt: creationDate,
      });

      // Resetting the form after a successful submission.
      setTitle('');
      setDescription('');
      setData([]);
      setCreatedAuditId(auditId); // Storing the ID of the newly created audit.
      
    } catch (e) {
      console.error('Error adding document: ', e); // Logging any errors that occur.
      setShowAlert(true); // Show alert if an error occurs.
    } finally {
      setOpenModal(true); // Open the success modal after submission.
      setShowAlert(false); // Hide the alert.
    }
  };

  // Function to add a new element (question) to the form.
  const addElement = () => {
    setData(prevState => [
      ...prevState,
      {
        id: uuid(), // Generating a unique ID for the new element.
        value: '', // Initial value for the new element.
        yesNoChecked: true, // Initial state for yes/no checkbox.
        commentsChecked: true, // Initial state for comments checkbox.
        imageChecked: true // Initial state for image checkbox.
      }
    ]);
  };

  // Function to delete an element from the form.
  const deleteEl = (id) => {
    setData(prevState => prevState.filter(val => val.id !== id)); // Removing the element with the specified ID.
  };

  // Function to handle sorting of elements when dragged and dropped.
  const handleOnChangeSort = ({ items }) => {
    setData(items); // Updating the order of elements.
  };

  // Function to handle changes in the value of form elements.
  const handleValue = (id, e) => {
    setData(prevState =>
      prevState.map(el =>
        el.id === id ? { ...el, value: e.target.value } : el // Updating the value of the element with the specified ID.
      )
    );
  };

  // Function to handle checkbox changes for form elements.
  const handleCheckboxChange = (id, checkboxState) => {
    setData(prevState =>
      prevState.map(el =>
        el.id === id ? { ...el, ...checkboxState } : el // Updating the checkbox state of the element with the specified ID.
      )
    );
  };

  // Function to render each element of the form using the `TextFieldInput` component.
  const renderElements = ({ item }) => (
    <TextFieldInput
      item={item}
      handleValue={handleValue}
      handleCheckboxChange={handleCheckboxChange}
      deleteEl={deleteEl}
    />
  );

  // Function to close the success modal.
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal.
  };

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center"> {/* Material-UI Grid for layout */}
        <Grid item md={5}> {/* Defines the column width (medium size devices and up) */}
          {showAlert && ( // Conditionally render the error alert if `showAlert` is true.
            <Alert severity="error" onClose={() => setShowAlert(false)} style={{ marginBottom: '1rem' }}>
              Please fill in the title and description.
            </Alert>
          )}
          <Header // Rendering the Header component, passing title, description, and their respective setters.
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          <Nestable // Rendering the form elements with drag-and-drop functionality using Nestable.
            items={data}
            renderItem={renderElements}
            onChange={handleOnChangeSort}
          />
          <Tooltip title="Add Element" aria-label="add-element"> {/* Tooltip for add button */}
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              style={{ marginTop: '1rem', float: 'right' }}
            >
              <AddCircleOutlineOutlinedIcon color="primary" /> {/* Add icon */}
            </IconButton>
          </Tooltip>

          {/* Custom styled button for saving the form */}
          <button className="bg-blue-600 text-white font-semibold rounded-md whitespace-nowrap mr-2"
            onClick={handleSubmit}
            style={{
              width: '100%', // Full width button
              padding: '6px 16px', // Padding and font size to match Material-UI's buttons
              fontSize: '0.875rem',
              minHeight: '36px',
              marginTop: '1rem',
            }}>
            Save Audit
          </button>

        </Grid>
      </Grid>
      <SuccessModal // Rendering the SuccessModal to display confirmation on successful submission.
        open={openModal}
        handleClose={handleCloseModal}
        auditId={createdAuditId}
      />
    </Fragment>
  );
};

export default FormBuilder; // Exporting the FormBuilder component to be used elsewhere in the app.
