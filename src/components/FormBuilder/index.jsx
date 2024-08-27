import { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { TextFieldInput } from './elements';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from '@mui/material';
import { Alert } from '@material-ui/lab';
import Header from './Header';
import { db } from '../../Firebase';


const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const items = data;

  const handleSubmit = async () => {
    try {
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
      setMessageType('error');
      setMessage('Error saving form. Please try again.');
    }

    // Display message for 2 seconds
    setTimeout(() => {
      setMessage(null);
      setMessageType('');
    }, 2000);
  };
  
  //Function to add new element
  const addElement = () => {
    const data = {
      id: uuid(),
      value: null,
      required: false,
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
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleRequired = (id) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const renderElements = ({ item }) => {
    return (
      <TextFieldInput
        item={item}
        handleValue={handleValue}
        deleteEl={deleteEl}
        handleRequired={handleRequired}
      />
    );
  };

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        {message && (
          <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Alert severity={messageType}>{message}</Alert>
          </Grid>
        )}
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
            maxDepth={1}
            onChange={handleOnChangeSort}
          />
          <div className="flex justify-end mt-4">
            <Button
              variant='contained'
              onClick={handleSubmit}
              style={{
                backgroundColor: 'white',
                fontSize: '1.5rem',
                color: 'black',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderRadius: '0.5rem',
                // transition: 'background-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#328CED'} // For hover effect
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              Save Form
            </Button>
          </div>
        </Grid>
        <Grid item md={1}>
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton aria-label="add-element" onClick={addElement}>
              <AddCircleOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};``

export default FormBuilder;
