import { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
//Material UI Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//Form Elements
import { TextFieldInput } from './elements';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../Firebase';

import Layout from './elements/layout';
import { formEl } from './constants.js'; //Components
import Header from './Header';

const FormBuilder = () => {
  //State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null); // State for messages
  const [messageType, setMessageType] = useState(''); // State for message type

  const items = data;

  // Function to handle form submission
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
      setMessageType('error'); // Set message type
      setMessage('Error saving form. Please try again.'); // Set error message
    }
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

  //Function to delete element
  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  //Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  //Function to duplicate element
  const duplicateElement = (elId) => {
    let elIdx = data.findIndex((el) => el.id === elId);
    let newEl = {
      id: uuid(),
      value: null,
      required: false,
    };
    let newArr = addAfter(data, elIdx, newEl);
    setData(newArr);
  };

  //Function to handle sorting of elements
  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  //Function to Handle Input Values
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

  //Function to Handle Required
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

  // //Function to Handle Options
  // const addOption = (id, newOption) => {
  //   let newArr = data.map((el) => {
  //     if (el.id === id) {
  //       const objVal = "options" in el ? el?.options : [];
  //       return { ...el, options: [...objVal, newOption] };
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };

  // //Function to Handle Date
  // const handleDate = (id, dateVal) => {
  //   let newArr = data.map((el) => {
  //     if (el.id === id) {
  //       return { ...el, date: dateVal };
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };

  // //Function to Handle Time
  // const handleTime = (id, dateVal) => {
  //   let newArr = data.map((el) => {
  //     if (el.id === id) {
  //       return { ...el, time: dateVal };
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };

  // //Function to Change Option Values
  // const handleOptionValues = (elId, optionId, optionVal) => {
  //   let newArr = data.map((el) => {
  //     if (el.id === elId) {
  //       el?.options &&
  //         el?.options.map((opt) => {
  //           if (opt.id === optionId) {
  //             opt.value = optionVal;
  //           }
  //         });
  //       return el;
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };

  // //Function to Delete Option
  // const deleteOption = (elId, optionId) => {
  //   let newArr = data.map((el) => {
  //     if (el.id === elId) {
  //       let newOptions =
  //         el?.options && el?.options.filter((opt) => opt.id !== optionId);
  //       return { ...el, options: newOptions };
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };

  //Render items
  const renderElements = ({ item }) => {
    return (
      <TextFieldInput
        item={item}
        handleValue={handleValue}
        deleteEl={deleteEl}
        handleRequired={handleRequired}
        duplicateElement={duplicateElement}
      />
    );
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
            maxDepth={1}
            onChange={handleOnChangeSort}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-white text-2xl text-black py-2 px-4 rounded-lg hover:bg-green-500"
            >
              Save Form
            </button>
            {message && (
              <div
                className={`mt-4 p-2 rounded-lg ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message}
              </div>
            )}
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
};
export default FormBuilder;
